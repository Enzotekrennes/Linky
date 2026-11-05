# Guide de rédaction et format des articles

À lire avec `seo/site-profile.md`. Les règles marquées **bloquant** font échouer le contrôle qualité, sans discussion.

## Format du fichier `public/articles/<slug>.md`

Slug en kebab-case, sans accent, 3 à 6 mots, construit sur le mot-clé principal.

```yaml
---
title: "Titre H1, 45 à 65 caractères, sans « Opus Advisor »"
metaDescription: "120 à 160 caractères, mot-clé principal inclus, une promesse concrète"
date: "AAAA-MM-JJ"
keywords: ["mot-clé principal", "3 à 4 variantes réelles issues de l'autocomplétion ou de la Search Console"]
essentiel:
  - "Trois phrases qui répondent à la question du lecteur, chacune autonome."
  - "Ce sont elles qu'on retrouve dans les réponses des moteurs et des assistants."
  - "Pas de teasing : la réponse, directement."
faq:
  - q: "Question telle qu'un patron la taperait"
    a: "Réponse en 2 à 4 phrases, factuelle."
ctaMid:
  text: "Une phrase qui relie le sujet à un outil, au diagnostic ou au pré-audit."
  label: "Libellé court du bouton"
  href: "/outils/<slug>/"
---

*Catégorie : <thème> — Lecture : X minutes — Auteur : Enzo Monnier, Opus Advisor*

<intro de 2 à 4 phrases qui entre dans le sujet par un fait, une situation de terrain ou un chiffre sourcé>

## <intertitre concret>
...

---

**<accroche adaptée au sujet>** Pré-audit gratuit en visio, 30 minutes, sans engagement. <une phrase>

[Réserver un créneau](/contact/)

---

*Sources : [libellé](url), [libellé](url)*
```

`faq` : 3 à 5 questions, reprises en données structurées FAQPage. Utiliser les questions réelles trouvées dans « Autres questions posées » ou l'autocomplétion.

`ctaMid` : facultatif. À défaut, le gabarit affiche un renvoi vers le pré-audit.

## Entrée dans `lib/articles.json`

Ajoutée en tête du tableau :

```json
{
    "id": <max des id + 1>,
    "slug": "<slug>",
    "title": "<même titre que le front-matter>",
    "description": "<même texte que metaDescription>",
    "imageSrc": "/images/Logo_1200x630.png",
    "icon": "file-text",
    "publishedAt": "<AAAA-MM-JJ>",
    "category": "<Réglementation | Outils & systèmes | Organisation | Méthode>",
    "seoTitle": "<60 caractères au plus, sans suffixe de marque>",
    "related": ["<slug>", "<slug>", "<slug>"],
    "tools": ["<slug d'outil>"]
}
```

Ce sont ces champs que le gabarit utilise pour les balises : `description` devient la meta description (120 à 160 caractères), `seoTitle` devient la balise title telle quelle. Sans `seoTitle`, le gabarit ajoute « | Opus Advisor » au `title`, donc un `seoTitle` est obligatoire dès que le titre dépasse 45 caractères. Le `metaDescription` du front-matter reste identique à `description`.

`tools` seulement si un outil sert vraiment le lecteur. Quand on modifie un article existant de façon substantielle, on met `updatedAt` à la date du jour. Une simple correction de lien ne change pas `updatedAt`.

## Ton

- Vouvoiement. « On » ou « nous » pour Opus Advisor. Phrases courtes, rythme varié.
- BTP : on dit « patron », pas « dirigeant ». Formation et conciergerie : « dirigeant », « gérant » ou « responsable » selon le cas.
- Du concret : un exemple de terrain par section au minimum (une convention qui part sans signature, un ménage oublié entre deux réservations, une situation de travaux refaite à la main).
- Les chiffres servent à décider, pas à impressionner. Chacun a sa source.

## Interdits (bloquant)

- Emoji, hashtag.
- Méta-discours d'intro : « Dans cet article », « Nous allons voir », « Découvrez ».
- Formules creuses : « il convient de », « il est important de souligner », « force est de constater », « à l'ère du numérique », « dans un monde où ».
- Ton publicitaire : « véritable », « incontournable », « atout majeur », « solution clé en main », « révolutionner », « booster ».
- Tiret cadratin (—) hors de la ligne Catégorie et de la ligne Sources.
- La tranche « 8-25 » ou « 8 à 25 » salariés.
- Toute mention d'IA ayant rédigé le texte.
- Un chiffre, une date, une étude ou un client sans source réelle.

## À limiter (signalé au contrôle)

- Parallélisme négatif (« ce n'est pas X, c'est Y ») : 1 au maximum par article.
- Énumérations par trois mécaniques, intertitres scolaires (« Introduction », « Conclusion », « Les avantages »).
- Listes à puces : seulement pour des étapes ou des éléments vraiment parallèles, jamais pour tout un article.
- Conclusion optimiste vague. On finit sur une action concrète.

Si le skill `humanizer-articles-fr` est disponible, il s'applique en plus de ces règles.

## Maillage interne

- 3 liens internes minimum dans le corps du texte, contextuels, sur une ancre descriptive (jamais « cliquez ici »).
- Au moins un lien vers la page secteur de l'article, et vers un outil quand il y en a un qui sert le lecteur.
- Pas plus d'un lien vers la même page dans un article.
- 2 à 4 sources externes officielles ou professionnelles (service-public.fr, economie.gouv.fr, legifrance, URSSAF, INSEE, France Compétences, OPCO, FFB, CAPEB, presse pro), toutes vérifiées.

## Longueur

Pas de cible fixe. La longueur suit ce que couvrent les pages déjà classées pour le mot-clé, plus ce qu'on apporte en plus. Repère : 900 à 1 800 mots. Un article plus court qui répond mieux bat un article plus long.
