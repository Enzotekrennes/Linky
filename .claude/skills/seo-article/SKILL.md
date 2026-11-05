---
name: seo-article
description: Produit un article de opusadvisor.fr de bout en bout, d'un sujet validé du backlog jusqu'à une pull request prête à relire, en passant par le brief, la rédaction, le contrôle qualité indépendant et le maillage.
argument-hint: "[id du backlog]"
disable-model-invocation: true
---

Objectif : un article publié seulement s'il passe le contrôle qualité. Ne rien publier est un résultat valide.

Sujet : $ARGUMENTS (si vide : l'entrée `validated` de `seo/backlog.json` au plus fort `businessFit`, puis à la difficulté la plus faible). S'il n'y a aucune entrée `validated`, arrête-toi et propose `/seo-plan`.

Si l'entrée a une `target` qui n'est pas `new`, il s'agit d'enrichir un article existant : saute la création de fichier, le rédacteur travaille sur l'article cible et met `updatedAt` à jour.

**Exécution planifiée** (session lancée par une tâche planifiée, ou personne pour répondre) : aucune question. La pull request tient lieu de validation, elle n'est jamais mergée. Tu ne valides jamais un sujet à la place d'Enzo : sans entrée `validated`, tu t'arrêtes et tu le signales.

Crée une liste de tâches avec les étapes ci-dessous et coche-les au fil de l'eau.

1. **Brief.** Délègue à `seo-serp-analyst` avec l'id. S'il recommande de ne pas écrire l'article, arrête-toi et transmets sa raison.
2. **Rédaction.** Délègue à `seo-writer` avec le chemin du brief.
3. **Contrôle.** Délègue à `seo-editor` avec le slug et l'id. L'éditeur ne doit pas avoir vu la rédaction : ne lui transmets que le slug, l'id et la consigne.
4. **Corrections.** Si FAIL, renvoie le verdict complet à `seo-writer`, puis relance `seo-editor`. Deux allers-retours au maximum. Au troisième FAIL : supprime le fichier de l'article et son entrée dans `lib/articles.json`, passe l'entrée du backlog en `rejected` avec la raison, et arrête-toi en donnant le dernier verdict.
5. **Maillage.** Délègue à `seo-linker` en mode article avec le slug.
6. **Vérification.** `npm run build` doit réussir et produire `out/articles/<slug>/index.html`. Relance `node seo/scripts/check-article.mjs` sur l'article et sur chaque article modifié par le maillage.
7. **Validation par Enzo.** Montre-lui : titre, seoTitle, description, nombre de mots, score de l'éditeur, liens ajoutés dans les autres articles. Demande-lui avec AskUserQuestion s'il veut ouvrir la pull request, relire d'abord, ou abandonner. En exécution planifiée, passe directement à l'étape 8.
8. **Pull request**, après son accord ou en exécution planifiée :
   - si git n'a pas d'identité configurée, reprends celle du dernier commit (`git log -1 --format='%an'` et `'%ae'`) ;
   - `git checkout -b content/<slug>`
   - `git add public/articles lib/articles.json seo/backlog.json seo/briefs/<id>.md`
   - `git commit -m "content: <titre court>"`. Message simple, sans aucune ligne de trailer ni mention de l'outil qui a produit l'article.
   - `git push -u origin content/<slug>`, puis `gh pr create --base main --title "content: <titre court>" --body "<requête visée, angle, score éditeur, sources>"`. Corps sans mention de l'outil non plus.
   - Ne merge jamais.
   - Passe l'entrée du backlog en `published` une fois la PR ouverte.
9. **Après le merge** (à rappeler à Enzo dans le message final, pas à faire) : `node scripts/indexnow.mjs /articles/<slug>/` pour Bing, et inspection de l'URL dans la Search Console pour demander l'indexation Google.

Message final : lien de la PR, score de l'éditeur, et les deux actions d'après-merge.
