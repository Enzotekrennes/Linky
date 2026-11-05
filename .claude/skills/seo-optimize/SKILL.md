---
name: seo-optimize
description: Boucle d'amélioration mensuelle de opusadvisor.fr. Analyse le dernier export Search Console, l'état du maillage et les contenus vieillis, propose les retouches les plus rentables et applique celles qu'Enzo valide.
argument-hint: "[maillage | gsc | tout]"
disable-model-invocation: true
---

Objectif : faire monter les pages qui existent avant d'en écrire de nouvelles.

Mode : $ARGUMENTS (si vide : `tout`). `maillage` = seulement les liens internes. `gsc` = seulement les données Search Console.

1. Vérifie s'il y a un export dans `seo/data/gsc/`. S'il n'y en a pas, ou s'il date de plus de 6 semaines, rappelle à Enzo comment l'obtenir (Search Console → Performances → 3 derniers mois → Exporter → CSV, puis décompresser dans `seo/data/gsc/<date>/`) et continue sans.
2. Mode `tout` ou `gsc` : délègue à `seo-optimizer`. Mode `tout` ou `maillage` : délègue à `seo-linker` en mode audit. Les deux peuvent tourner en parallèle.
3. Présente les propositions fusionnées, classées par gain attendu, puis demande avec AskUserQuestion (choix multiple) lesquelles appliquer.
4. Applique les actions validées :
   - titres et descriptions : modifie `seoTitle` et `description` dans `lib/articles.json` (et `metaDescription` du front-matter pour rester identique) ;
   - ajouts de contenu : délègue à `seo-writer` avec l'action exacte, puis à `seo-editor` sur l'article modifié ;
   - liens : délègue à `seo-linker` avec le plan validé ;
   - requêtes sans page : ajoute-les au backlog en `idea` avec leur preuve Search Console.
   Mets `updatedAt` à jour seulement quand le contenu a changé de façon substantielle.
5. Vérifie : `node seo/scripts/check-article.mjs` sur chaque article touché, puis `npm run build`.
6. Une pull request par passage, après accord d'Enzo : branche `seo/optimisation-<AAAA-MM-JJ>`, commit `seo: optimisation <mois>` sans trailer ni mention de l'outil, `gh pr create` avec la liste des actions et les constats chiffrés dans le corps. Ne merge jamais.

**Exécution planifiée** : pas de question. Applique seulement les liens internes et les nouveaux `seoTitle` / `description`, tous visibles dans le diff. Les ajouts de contenu et les nouvelles requêtes vont dans le corps de la PR comme propositions, sans être appliqués. Si git n'a pas d'identité configurée, reprends celle du dernier commit.

Message final : lien de la PR, actions appliquées, actions reportées.
