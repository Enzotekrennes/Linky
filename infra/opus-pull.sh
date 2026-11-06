#!/usr/bin/env bash
# Met à jour opusadvisor.fr depuis la branche "deploy" (site déjà compilé par GitHub Actions).
# Lancé toutes les 2 minutes par opus-pull.timer, en tant qu'utilisateur ubuntu.
# Installé sur le serveur dans /usr/local/bin/opus-pull.
set -euo pipefail

WEBROOT="/var/www/opusadvisor"
SRC="$WEBROOT/src"
REPO_URL="https://github.com/Enzotekrennes/Linky.git"

if [ ! -d "$SRC/.git" ]; then
  git clone -q --depth 1 --branch deploy "$REPO_URL" "$SRC"
fi

git -C "$SRC" fetch -q --depth 1 origin deploy
NEW=$(git -C "$SRC" rev-parse FETCH_HEAD)
CUR=$(cat "$WEBROOT/.deployed" 2>/dev/null || true)
[ "$NEW" = "$CUR" ] && exit 0

git -C "$SRC" reset -q --hard FETCH_HEAD

TS=$(date +%Y%m%d%H%M%S)
D="$WEBROOT/releases/$TS"
mkdir -p "$D"
git -C "$SRC" archive HEAD | tar -x -C "$D"

# Garde-fou : on ne bascule que si la release contient bien le site.
if [ ! -f "$D/index.html" ]; then
  echo "release incomplète ($NEW), abandon : le site en ligne n'est pas modifié" >&2
  rm -rf "$D"
  exit 1
fi

ln -sfn "$D" "$WEBROOT/current.tmp"
mv -Tf "$WEBROOT/current.tmp" "$WEBROOT/current"
echo "$NEW" > "$WEBROOT/.deployed"
ls -1dt "$WEBROOT"/releases/*/ | tail -n +4 | xargs -r rm -rf

echo "déployé : $(git -C "$SRC" log -1 --format=%s)"
