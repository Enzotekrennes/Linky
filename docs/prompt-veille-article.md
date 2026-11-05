# Prompt réutilisable — Veille + nouvel article (Opus Advisor)

> Remplacé par le kit SEO (`seo/README.md`, commande `/seo-article`), qui part de requêtes réelles plutôt que de l'actualité et couvre les trois secteurs. Ce prompt reste utilisable pour un article d'actualité ponctuel.

Coller le bloc ci-dessous dans une session Claude Code ouverte sur le repo, environ une fois par semaine.
Tout est volontairement auto-suffisant : un agent neuf démarre sans mémoire de l'historique.

Règle d'or : **si aucun angle frais ET non-doublon ET aligné Opus ne ressort, NE PAS publier.** Mieux vaut zéro article qu'un article de remplissage (ça nuit au SEO). Dans ce cas, l'agent s'arrête et le signale.

---

```
Tu es éditeur du blog Opus Advisor (opusadvisor.fr), conseil ops pour les patrons du BTP second œuvre. Repo local : C:\Users\enzoa\Desktop\Work\Linky (Next.js 15, export statique). Le merge sur main met le site à jour automatiquement en 2 à 3 minutes. Objectif de cette session : produire UN nouvel article de blog, sourcé et humain, et ouvrir une PR (NE PAS merger — l'humain valide).

ÉTAPE 1 — Veille (actualité récente)
- Récupère la date du jour : `date "+%Y-%m-%d"`.
- Fais 3-4 recherches web sur l'actualité FR du BTP second œuvre du mois en cours (réglementaire, trésorerie/défaillances, MaPrimeRénov'/CEE, facturation électronique, recrutement/main-d'œuvre, outils/numérique, RE2020…).
- Retiens 2-3 angles candidats avec des chiffres/faits datés et sourcés (sources réelles : FFB, CAPEB, France Num, economie.gouv.fr, Batiweb, presse pro…).

ÉTAPE 2 — Anti-doublon (obligatoire)
- Lis lib/articles.json (tous les slugs + titres + descriptions) et la liste des fichiers public/articles/*.md.
- Élimine tout angle qui recoupe un article existant. En cas de doute, considère que c'est un doublon.
- S'il ne reste AUCUN angle vraiment neuf, non-doublon et pertinent pour un patron BTP : ARRÊTE-TOI, n'écris rien, et explique "rien de neuf à publier cette semaine" avec les angles écartés et pourquoi. Ne force jamais un article.

ÉTAPE 3 — Rédaction (si un bon angle existe)
Format du fichier public/articles/<slug>.md (slug en kebab-case, sans accent) :
---
title: "Titre concret, sans 'Opus Advisor' (le template ajoute déjà | Opus Advisor), ~45-60 caractères, construit sur les mots que les patrons tapent sur Google (vérifier avec les suggestions : https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&q=<sujet>) : modèle, exemple, calcul, obligation…"
metaDescription: "150-160 caractères max, mot-clé inclus, sans parallélisme négatif"
date: "AAAA-MM-JJ"   # la date du jour récupérée à l'étape 1
keywords: ["3 à 5 mots-clés BTP pertinents"]
---

*Catégorie : <thème> BTP — Lecture : X minutes — Auteur : Enzo Monnier, Opus Advisor*

<intro qui entre DIRECT dans le sujet par un fait/chiffre, sans méta-discours>

## <sous-titre concret, pas scolaire>
<corps>

... (4 à 6 sections)

---

**Vous voulez voir ce que ça donne pour votre boîte ?** Pré-audit gratuit en visio, 30 minutes, sans engagement. <1 phrase adaptée au sujet>

[Réserver un créneau](/contact)

---

*Sources : [libellé](url réelle), [libellé](url réelle), …*

CHARTE & TON (à respecter strictement) :
- Cible : entreprises du second œuvre "de 8 à 60+ collaborateurs" (JAMAIS "8-25" ni "dirigeant" → dis "patron").
- Vocabulaire : système, chantier, situation, orchestrer, mise en œuvre, Gardien du système, patron. Vouvoiement. Phrases courtes, première personne "on/nous", promesses chiffrées.
- INTERDITS : emoji, hashtag, ton publicitaire ("véritable", "incontournable", "atout majeur", "solution clé en main").
- Anti-IA (FR) : pas de méta-discours d'intro ("Dans cet article…"), pas de "il convient de / il est important de souligner / force est de constater", pas de parallélisme négatif ("ce n'est pas X, c'est Y" — 1 max sur tout l'article), pas de règle de trois mécanique, tirets cadratins (—) seulement dans la ligne Catégorie et les Sources, rythme de phrases varié, sous-titres non scolaires.
- ANTI-HALLUCINATION : n'invente AUCUN chiffre, montant, date, client, témoignage ni statistique. Tout chiffre doit venir d'une source réelle citée en bas.

ÉTAPE 4 — Intégration
- Ajoute l'entrée en TÊTE de lib/articles.json :
  { "id": <max des id existants + 1>, "slug": "<slug>", "title": "<même titre que le frontmatter>", "description": "<150-160 car.>", "imageSrc": "/images/Logo_1200x630.png", "icon": "file-text", "publishedAt": "<date du jour>", "category": "<une des catégories ci-dessous>" }
- "category" DOIT valoir exactement l'une de : "Réglementation", "Outils & systèmes", "Organisation", "Méthode" (ce sont les filtres de la page /articles). Choisis la plus juste. N'invente pas de nouvelle catégorie sans raison.
- Respecte l'indentation 4 espaces du JSON.

ÉTAPE 5 — Vérification
- `npm run build` doit passer (exit 0) et générer la page /articles/<slug>.
- Vérifie : article en tête de /articles, présent dans le sitemap, liens et sources valides, aucune occurrence "8-25".

ÉTAPE 6 — Git (PR, sans merge)
- git checkout -b content/article-<slug>
- git add public/articles/<slug>.md lib/articles.json
- git commit -m "content: <titre court>" (message simple, sans trailer)
- git push -u origin content/article-<slug>
  (si le push renvoie une erreur 403 : `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -u origin content/article-<slug>`)
- gh pr create --base main --head content/article-<slug> --title "content: <titre court>" --body "<résumé + angle + sources>"
- NE PAS merger. Donne-moi le lien de la PR et un résumé (angle retenu, doublons écartés, sources).
```

---

## Notes
- Le merge de la PR déclenche la mise en ligne : GitHub compile le site (onglet Actions, workflow « Build & publish »), puis le serveur le récupère dans les 2 minutes. Si la compilation échoue, rien n'est publié et le site reste sur la version précédente. En secours : `bash scripts/deploy-vps.sh` dans Git Bash.
- Rythme conseillé : 1×/semaine **au plus**, et seulement s'il y a de la vraie actu. Pas d'article = un choix valide.
- Si tu veux changer la charte ou la cible, modifie ce fichier : le prompt vit avec le code.
