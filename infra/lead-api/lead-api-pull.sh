#!/usr/bin/env bash
# Met à jour le service des leads depuis main (dossiers services/lead-api et lib/einvoice seulement),
# puis le redémarre s'il a changé. Lancé après opus-pull par opus-pull.service, en tant qu'utilisateur ubuntu.
# Installé sur le serveur dans /usr/local/bin/opus-lead-api-pull.
set -euo pipefail

DIR="/opt/opus-lead-api"
REPO_URL="https://github.com/Enzotekrennes/Linky.git"
PATHS=(services/lead-api lib/einvoice)

if [ ! -d "$DIR/.git" ]; then
  git clone -q --depth 1 --filter=blob:none --sparse --branch main "$REPO_URL" "$DIR"
  git -C "$DIR" sparse-checkout set "${PATHS[@]}"
  FIRST=1
fi

git -C "$DIR" fetch -q --depth 1 origin main
NEW=$(git -C "$DIR" rev-parse FETCH_HEAD)
CUR=$(git -C "$DIR" rev-parse HEAD)
if [ "$NEW" = "$CUR" ] && [ -z "${FIRST:-}" ]; then exit 0; fi

CHANGED=$(git -C "$DIR" diff --name-only "$CUR" "$NEW" -- "${PATHS[@]}" | wc -l)
git -C "$DIR" reset -q --hard FETCH_HEAD
if [ "$CHANGED" -eq 0 ] && [ -z "${FIRST:-}" ]; then exit 0; fi

# Le Node d'Ubuntu n'exécute pas le TypeScript : on compile (TypeScript est une dépendance de développement du service).
(cd "$DIR/services/lead-api" && npm ci --no-audit --no-fund --silent && npm run build --silent)
if systemctl is-enabled -q opus-lead-api 2>/dev/null; then
  sudo systemctl restart opus-lead-api
fi
echo "lead-api mis à jour : $(git -C "$DIR" log -1 --format=%s)"
