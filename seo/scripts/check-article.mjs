/**
 * Mechanical quality check for articles (stage 1 of seo/quality-gate.md).
 *
 * Checks the front-matter, title and meta lengths, the banned patterns of the style
 * guide, internal links (count and validity), the sources line and the matching entry
 * in lib/articles.json. Errors block publication; warnings are for the editor.
 *
 * Usage:
 *   node seo/scripts/check-article.mjs <slug> [<slug>...]   check given articles
 *   node seo/scripts/check-article.mjs --all                audit every article
 * Exit code 1 when at least one error is found.
 */
import {
  CATEGORIES,
  countWords,
  extractLinks,
  listArticleFiles,
  loadAllRoutes,
  loadArticleIndex,
  loadToolSlugs,
  parseArgs,
  readArticle,
  toRoute,
} from './lib.mjs';

/** Phrases banned by seo/style-guide.md (matched case-insensitively, apostrophes normalised). */
const BANNED = [
  'dans cet article',
  'nous allons voir',
  'découvrez',
  'il convient de',
  'il est important de souligner',
  'force est de constater',
  "à l'ère du numérique",
  'dans un monde où',
  'véritable',
  'incontournable',
  'atout majeur',
  'clé en main',
  'révolutionn',
  'booster',
];

/** Patterns that are always errors, with the message shown to the writer. */
const BANNED_PATTERNS = [
  { re: /\b8\s*(?:-|à)\s*25\b/i, msg: 'tranche « 8-25 » interdite (écrire « de 8 à 60 collaborateurs et plus »)' },
  { re: /\p{Extended_Pictographic}/u, msg: 'emoji interdit' },
  { re: /(?:^|\s)#[\p{L}\d_]{2,}/u, msg: 'hashtag interdit' },
  { re: /\b(?:rédigé|écrit|généré|produit)e?s?\s+(?:par|avec)\s+(?:une\s+|l')?(?:ia|intelligence artificielle|chatgpt|claude)\b/i, msg: "mention d'un texte produit par une IA" },
];

/**
 * Normalise typographic apostrophes and non-breaking spaces before matching.
 * @param {string} s text to normalise
 * @returns {string} normalised lower-case text
 */
function normalise(s) {
  return s.replace(/[’‘]/g, "'").replace(/[  ]/g, ' ').toLowerCase();
}

/**
 * Check one article and return its errors and warnings.
 * @param {string} slug article slug
 * @param {{routes: Map<string, any>, index: any[], tools: string[]}} ctx shared site data
 * @returns {{slug: string, errors: string[], warnings: string[], stats: Record<string, number>}}
 */
export function checkArticle(slug, ctx) {
  const errors = [];
  const warnings = [];
  const article = readArticle(slug);
  if (!article) return { slug, errors: [`fichier public/articles/${slug}.md introuvable`], warnings, stats: {} };
  const { data, body } = article;

  // Front-matter
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push('slug : kebab-case sans accent attendu');
  if (!data.title) errors.push('front-matter : title manquant');
  else if (data.title.length < 30 || data.title.length > 70) warnings.push(`title : ${data.title.length} caractères (repère 45 à 65)`);
  if (!data.metaDescription) warnings.push('front-matter : metaDescription manquante (garder la même que la description de lib/articles.json)');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date ?? ''))) errors.push('front-matter : date au format AAAA-MM-JJ manquante');
  if (!Array.isArray(data.keywords) || data.keywords.length < 2) errors.push('front-matter : keywords (3 à 5) manquants');
  if (!Array.isArray(data.essentiel) || data.essentiel.length !== 3) warnings.push('front-matter : essentiel devrait contenir 3 phrases');
  if (!Array.isArray(data.faq) || data.faq.length < 3) warnings.push('front-matter : faq devrait contenir 3 à 5 questions');
  if (data.ctaMid && !ctx.routes.has(toRoute(String(data.ctaMid.href)) ?? '')) errors.push(`ctaMid : lien ${data.ctaMid.href} inexistant`);

  // Body structure
  const lines = body.split('\n');
  if (!/^\*Catégorie :/.test(lines.find((l) => l.trim()) ?? '')) errors.push('ligne « *Catégorie : … — Lecture : … — Auteur : …* » absente en tête');
  const h2 = lines.filter((l) => /^## /.test(l));
  if (h2.length < 3) warnings.push(`${h2.length} intertitre(s) H2, 4 à 6 attendus`);
  if (lines.some((l) => /^# /.test(l))) errors.push('un H1 dans le corps : le titre est déjà rendu par le gabarit');
  const scholarly = h2.filter((l) => /^## (introduction|conclusion|les avantages|en résumé|pour conclure)\b/i.test(l));
  if (scholarly.length) warnings.push(`intertitres scolaires : ${scholarly.map((l) => l.slice(3)).join(' | ')}`);

  // Banned wording
  const text = normalise(body);
  for (const b of BANNED) if (text.includes(b)) errors.push(`formule interdite : « ${b} »`);
  for (const { re, msg } of BANNED_PATTERNS) if (re.test(body)) errors.push(msg);
  const dashLines = lines.filter((l) => l.includes('—') && !/^\*Catégorie :/.test(l) && !/^\*Sources :/.test(l));
  if (dashLines.length) errors.push(`tiret cadratin hors lignes Catégorie et Sources (${dashLines.length} ligne(s)) : « ${dashLines[0].trim().slice(0, 70)}… »`);
  const negParallels = (text.match(/\bce n'est pas [^.!?]{1,80}?, c'est\b/g) ?? []).length + (text.match(/\bpas seulement [^.!?]{1,60}?, mais\b/g) ?? []).length;
  if (negParallels > 1) warnings.push(`${negParallels} parallélismes négatifs (1 au maximum)`);
  const bullets = lines.filter((l) => /^\s*[-*] /.test(l)).length;
  if (bullets > 18) warnings.push(`${bullets} lignes de liste : vérifier que l'article ne repose pas sur des puces`);

  // Links
  const { internal, external } = extractLinks(body);
  const bodyLinks = internal.filter((l) => l.route !== '/contact/');
  const distinct = new Set(bodyLinks.map((l) => l.route));
  for (const l of internal) if (!ctx.routes.has(l.route)) errors.push(`lien interne cassé : ${l.href}`);
  if (distinct.size < 3) errors.push(`${distinct.size} lien(s) interne(s) contextuel(s) hors /contact/, 3 minimum`);
  if (distinct.size < bodyLinks.length) warnings.push('plusieurs liens vers la même page interne');
  for (const l of internal) if (/^(ici|cliquez ici|ce lien|en savoir plus|lire)$/i.test(l.anchor.trim())) errors.push(`ancre non descriptive : « ${l.anchor} »`);
  if (!internal.some((l) => l.route.startsWith('/secteurs/'))) warnings.push('aucun lien vers une page secteur');
  const sourcesLine = lines.find((l) => /^\*Sources :/.test(l));
  if (!sourcesLine) errors.push('ligne « *Sources : …* » absente');
  else if (extractLinks(sourcesLine).external.length < 2) errors.push('moins de 2 sources externes dans la ligne Sources');
  if (/\]\(\/contact\)/.test(body)) warnings.push('lien /contact sans barre finale (préférer /contact/)');

  // Index entry
  const entry = ctx.index.find((e) => e.slug === slug);
  if (!entry) errors.push('aucune entrée dans lib/articles.json');
  else {
    if (entry.title !== data.title) errors.push('lib/articles.json : title différent du front-matter');
    // The page template uses lib/articles.json "description" as the meta description.
    const d = entry.description ?? '';
    if (d.length < 110 || d.length > 165) errors.push(`meta description (lib/articles.json) : ${d.length} caractères, 120 à 160 attendus`);
    if (data.metaDescription && entry.description !== data.metaDescription) warnings.push('metaDescription du front-matter différente de la description de lib/articles.json (seule celle de lib/articles.json est utilisée)');
    if (!CATEGORIES.includes(entry.category)) errors.push(`lib/articles.json : catégorie « ${entry.category} » non autorisée`);
    if (entry.seoTitle && entry.seoTitle.length > 60) errors.push(`lib/articles.json : seoTitle de ${entry.seoTitle.length} caractères (60 maximum)`);
    // Without seoTitle the template appends " | Opus Advisor" (15 characters) to the title.
    if (!entry.seoTitle && data.title && data.title.length > 45) warnings.push(`balise title : ${data.title.length + 15} caractères avec le suffixe de marque, ajouter un seoTitle de 60 caractères au plus`);
    for (const r of entry.related ?? []) if (!ctx.index.some((e) => e.slug === r)) errors.push(`related : article « ${r} » inexistant`);
    for (const t of entry.tools ?? []) if (!ctx.tools.includes(t)) errors.push(`tools : outil « ${t} » inexistant`);
    if ((entry.related ?? []).length < 3) warnings.push('related : 3 articles attendus');
    if ((entry.related ?? []).includes(slug)) errors.push('related : l\'article pointe vers lui-même');
  }

  return {
    slug,
    errors,
    warnings,
    stats: { words: countWords(body), internalLinks: distinct.size, externalLinks: external.length, h2: h2.length },
  };
}

/**
 * Print one result in a compact form.
 * @param {ReturnType<typeof checkArticle>} r check result
 */
function printResult(r) {
  const head = r.errors.length ? 'ÉCHEC' : 'OK';
  const s = r.stats;
  console.log(`\n${head}  ${r.slug}${s.words ? `  (${s.words} mots, ${s.internalLinks} liens internes, ${s.externalLinks} externes, ${s.h2} H2)` : ''}`);
  for (const e of r.errors) console.log(`  ✗ ${e}`);
  for (const w of r.warnings) console.log(`  ! ${w}`);
}

const { args, flags } = parseArgs(process.argv.slice(2));
const slugs = flags.all ? listArticleFiles() : args;
if (!slugs.length) {
  console.error('Usage : node seo/scripts/check-article.mjs <slug> | --all');
  process.exit(2);
}
const ctx = { routes: loadAllRoutes(), index: loadArticleIndex(), tools: loadToolSlugs() };
const results = slugs.map((s) => checkArticle(s, ctx));
results.forEach(printResult);
const failed = results.filter((r) => r.errors.length).length;
console.log(`\n${results.length - failed}/${results.length} article(s) sans erreur bloquante.`);
if (failed) process.exitCode = 1;
