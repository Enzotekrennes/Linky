---
name: seo-plan
description: Construit ou complète le backlog de mots-clés de opusadvisor.fr pour un secteur ou un thème, puis fait valider les sujets par Enzo.
argument-hint: "[formation | immobilier | btp | thème libre]"
disable-model-invocation: true
---

Objectif : ajouter au backlog des sujets d'articles appuyés sur des requêtes réelles, et faire valider ceux qu'on écrira.

Périmètre demandé : $ARGUMENTS (si vide : les trois secteurs, en commençant par celui qui a le moins d'articles).

1. Si un export Search Console est présent dans `seo/data/gsc/`, lance `node seo/scripts/gsc.mjs` d'abord.
2. Délègue la recherche à l'agent `seo-strategist` en lui passant le périmètre ci-dessus.
3. Présente son tableau à Enzo tel quel, puis pose une seule question avec AskUserQuestion (choix multiple) : quels ids passent en `validated`. Ajoute en recommandation les 2 ou 3 meilleurs selon l'intérêt business et la difficulté.
4. Mets à jour `status` et `updatedAt` des entrées choisies dans `seo/backlog.json`. Les autres restent en `idea`.
5. Termine par une ligne : nombre d'entrées validées et la commande pour écrire la première (`/seo-article <id>`).

**Exécution planifiée** : remplace l'étape 3 par une question en texte (le tableau, puis « quels ids valides-tu ? ») et arrête-toi là. Les nouvelles entrées restent en `idea` : tu ne valides jamais un sujet à la place d'Enzo. Quand il répond dans la session, reprends à l'étape 4, puis commit `seo: backlog <mois>` sur une branche `seo/backlog-<AAAA-MM-JJ>` et ouvre une pull request (même identité git et mêmes règles de message que `/seo-article`). En session interactive, aucune opération git.
