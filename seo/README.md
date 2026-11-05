# Kit SEO d'opusadvisor.fr

Six agents spécialisés et trois commandes pour tenir une méthode SEO complète dans la durée : trouver des requêtes réelles qu'on peut gagner, écrire mieux que ce qui classe, ne publier que ce qui passe un contrôle indépendant, relier les pages entre elles, puis améliorer ce qui existe à partir de la Search Console.

Documentation complète, en français et en anglais : ouvrir `seo/docs/index.html` dans un navigateur.

## Démarrage

Depuis la racine du dépôt, dans Claude Code :

```
/seo-plan formation          construit le backlog d'un secteur et te fait valider les sujets
/seo-article                 écrit le meilleur sujet validé, jusqu'à la pull request
/seo-optimize                retouches mensuelles : Search Console, maillage, contenus vieillis
```

Rien n'est publié sans toi : chaque article ou retouche arrive en pull request, et le merge sur `main` met le site en ligne.

## Ce qui se passe

| Étape | Agent | Sortie |
| :- | :- | :- |
| Mots-clés | `seo-strategist` | entrées `idea` dans `seo/backlog.json` |
| Analyse de la SERP | `seo-serp-analyst` | `seo/briefs/<id>.md` |
| Rédaction | `seo-writer` | `public/articles/<slug>.md` + entrée `lib/articles.json` |
| Contrôle qualité | `seo-editor` | verdict PASS ou FAIL, note sur 20 |
| Maillage | `seo-linker` | liens depuis et vers les articles existants |
| Amélioration | `seo-optimizer` | `seo/briefs/optimisation-<date>.md` |

## Fichiers à tenir à jour toi-même

- `site-profile.md` : offre, secteurs, preuves publiables, interdits. Tout le reste en découle.
- `style-guide.md` : format des articles et règles d'écriture.
- `quality-gate.md` : grille de l'éditeur et seuil de publication (15/20).

## Scripts

Node, sans dépendance au-delà de celles du site (`npm install` suffit).

```
node seo/scripts/inventory.mjs              pages, mots-clés et liens internes de tout le site
node seo/scripts/check-article.mjs <slug>   contrôle mécanique d'un article (--all pour tout le blog)
node seo/scripts/suggest.mjs "<sujet>"      autocomplétion Google, requêtes réellement tapées
node seo/scripts/gsc.mjs                    rapport sur le dernier export Search Console
```

## Search Console

Export manuel une fois par mois : Performances → Résultats de recherche → 3 derniers mois → Exporter → CSV. Décompresser dans `seo/data/gsc/<AAAA-MM-JJ>/`. Ce dossier et `seo/.cache/` sont ignorés par git, parce que le dépôt est public. Le backlog et les briefs, eux, sont versionnés : ils restent lisibles par n'importe qui.
