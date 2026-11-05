# Contrôle qualité avant publication

Deux étages. Le premier est mécanique : `node seo/scripts/check-article.mjs <slug>` doit sortir sans erreur. Le second est une relecture par l'agent `seo-editor`, qui n'a pas écrit l'article et part de cette grille.

Un article qui échoue repart chez le rédacteur avec la liste précise des corrections. Deux allers-retours au maximum. Au troisième échec, l'article est abandonné et le sujet repasse en `rejected` dans le backlog avec la raison. Ne pas publier est un résultat valide.

## Étage 1 : contrôle mécanique (bloquant)

Vérifié par le script : front-matter complet, longueurs du titre et de la meta, interdits du guide de rédaction, au moins 3 liens internes valides, ligne Sources présente avec au moins 2 liens externes, entrée cohérente dans `lib/articles.json`.

## Étage 2 : relecture éditoriale

### Critères bloquants

Un seul suffit à refuser l'article.

1. **Chiffre ou fait non vérifiable.** L'éditeur ouvre chaque source citée et vérifie que le chiffre ou l'affirmation y figure. Une source morte ou qui ne dit pas ce qu'on lui fait dire = refus.
2. **Intention de recherche ratée.** L'article ne répond pas, dans les 150 premiers mots ou dans `essentiel`, à la question que pose le mot-clé principal.
3. **Doublon.** L'article recoupe un article existant au point de se concurrencer sur la même requête.
4. **Contenu interchangeable.** Rien dans l'article ne pourrait pas être écrit par n'importe quel site du même sujet : aucun exemple de terrain, aucun angle propre, aucune prise de position.
5. **Erreur juridique ou fiscale**, ou règle présentée comme certaine alors qu'elle dépend des cas.

### Critères notés (sur 20)

| Critère | Points | Ce qu'on regarde |
| :- | :-: | :- |
| Réponse à l'intention | 4 | Réponse directe, complète, au bon niveau pour le lecteur du secteur |
| Gain d'information | 4 | Ce que l'article apporte que les 5 premiers résultats Google n'ont pas (brief SERP à l'appui) |
| Ancrage terrain | 3 | Exemples concrets du secteur, vocabulaire juste |
| Structure | 3 | Intertitres utiles, `essentiel` et `faq` qui tiennent seuls, scannable |
| Écriture | 3 | Ton du guide, aucun marqueur d'écriture automatique, rythme |
| Maillage et CTA | 3 | Liens internes pertinents, CTA en lien avec le sujet, sans forcer la vente |

**Seuil de publication : 15/20 et aucun critère bloquant.**

### Format du verdict

```
VERDICT: PASS | FAIL
SCORE: x/20 (intention a/4, gain b/4, terrain c/3, structure d/3, écriture e/3, maillage f/3)
BLOQUANTS: <liste ou "aucun">
CORRECTIONS:
- <ligne ou passage> : <problème> → <correction attendue>
SOURCES VÉRIFIÉES:
- <url> : OK | KO (<raison>)
```
