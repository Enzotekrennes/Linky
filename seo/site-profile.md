# Profil du site : opusadvisor.fr

Ce fichier est la source de vérité de tous les agents SEO. Un agent qui produit du contenu le lit en entier avant de commencer. Quand l'offre, la cible ou le ton changent, on modifie ce fichier, et uniquement lui.

## Qui parle

Opus Advisor, micro-entreprise basée à Rennes, tenue par Enzo Monnier (signature des articles) et Gwendoline. On organise et on automatise la gestion des petites entreprises avec les outils qu'elles ont déjà. Positionnement : ni agence de dev, ni cabinet de conseil. On fait le diagnostic, la mise en œuvre et la maintenance du système dans la durée.

Promesse : rendre environ 10 heures par semaine au patron en centralisant ses outils.

Zone : déplacements dans un rayon d'environ deux heures autour de Rennes (Bretagne, Pays-de-la-Loire), visio partout ailleurs en France.

## Les trois secteurs

Chaque article cible un seul secteur, ou un sujet transverse explicitement utile aux trois. Le secteur de l'article décide du vocabulaire, des exemples et de la page secteur vers laquelle il renvoie.

### Organismes de formation (`/secteurs/formation/`)
Lecteur : dirigeant ou responsable administratif d'un organisme de formation, souvent de 2 à 30 personnes.
Ce qui lui coûte du temps : inscriptions, conventions, convocations, émargements, dossiers de financement (OPCO, CPF, France Travail), preuves Qualiopi, bilan pédagogique et financier, facturation des sessions.
Preuve réelle publiée : un organisme dont les dossiers de financement se préparent et partent sans ressaisie (cas « organisme-de-formation », sans nom ni chiffre).

### Immobilier et conciergerie (`/secteurs/immobilier/`)
Lecteur : gérant de conciergerie de location courte durée, ou responsable d'une petite équipe d'agents immobiliers.
Ce qui lui coûte du temps : synchronisation des réservations, planning des ménages, documents voyageurs, facturation et relevés des propriétaires, taxe de séjour, suivi des mandats, pilotage des agents.
Preuves réelles publiées : une conciergerie qui facture tous ses propriétaires avec une seule automatisation, une équipe d'agents suivie depuis un seul outil (sans nom ni chiffre).

### BTP second œuvre (`/secteurs/btp/`)
Lecteur : patron d'une entreprise d'électricité, plomberie, CVC, menuiserie, peinture, de 8 à 60 collaborateurs et plus (jamais « 8-25 »).
Ce qui lui coûte du temps : devis, situations de travaux, retenue de garantie, révision de prix (index BT), relances d'impayés, suivi de chantier, marge réelle, sous-traitance.
Actifs existants : 6 calculateurs gratuits sous `/outils/` et 12 articles.

## L'offre (prix publics du site)

- Pré-audit gratuit : 30 minutes en visio, le prospect montre ses outils, on identifie 3 points de friction. C'est le CTA par défaut (`/contact/`).
- Audit Stack : 990 €, 10 jours.
- Diagnostic opérationnel : 2 500 €.
- Mise en œuvre système : à partir de 5 500 €.
- Gardien du système : de 400 à 1 500 € par mois.
- Diagnostic facture électronique gratuit en ligne : `/diagnostic-facture-electronique/` (sujet réforme 2026-2027).

Un article ne vend pas. Il règle un problème concret, puis propose le pré-audit, un outil ou le diagnostic en une phrase.

## Outils et technologies

On travaille avec les outils que le client a déjà, et on automatise avec Make, n8n ou du code sur mesure selon les cas. Airtable, Softr, Google Workspace reviennent souvent.

Ne pas mettre Glide en avant dans les nouveaux contenus. L'article `applications-glide` existe mais ne sert pas de modèle et ne reçoit pas de nouveaux liens.

Ne jamais présenter l'intelligence artificielle comme le cœur de l'offre, et ne jamais écrire qu'un contenu a été produit par une IA.

## Ce qu'on ne fait jamais

- Inventer un chiffre, un client, un témoignage, une étude ou une citation. Tout chiffre a une source réelle citée en bas d'article.
- Nommer un client.
- Promettre un résultat chiffré pour le lecteur (« vous gagnerez 12 h ») sans le présenter comme un ordre de grandeur sourcé.
- Donner un avis juridique ou fiscal tranché : on explique la règle, on cite le texte officiel, on renvoie au professionnel compétent quand il y a un enjeu.

## Où vit le contenu

- Articles : `public/articles/<slug>.md` (front-matter YAML + markdown).
- Index des articles : `lib/articles.json` (ordre antéchronologique, indentation 4 espaces). Les champs `related` (3 slugs) et `tools` (slugs d'outils) alimentent les blocs « À lire aussi » et « Outils ».
- Outils : `lib/tools.ts`. Secteurs : `lib/sectors.ts`. Pages fixes : `app/**/page.tsx`.
- Catégories autorisées : `Réglementation`, `Outils & systèmes`, `Organisation`, `Méthode`.
- URLs internes : toujours avec la barre finale (`/articles/<slug>/`, `/outils/<slug>/`, `/secteurs/<slug>/`, `/contact/`). Le site est exporté en statique avec `trailingSlash: true`.
- Mise en ligne : un merge sur `main` déclenche la compilation GitHub Actions puis la récupération par le VPS en 2 à 3 minutes.
