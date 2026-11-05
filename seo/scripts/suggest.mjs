/**
 * Google autocomplete expansion for French keyword discovery.
 *
 * Queries the public suggestion endpoint for a seed and for the seed combined with
 * question words, intent modifiers and the alphabet, then ranks suggestions by how
 * many expansions returned them. Autocomplete reflects what people actually type; it
 * gives no search volume, and none should be inferred from it.
 *
 * Usage:
 *   node seo/scripts/suggest.mjs "convention de formation"
 *   node seo/scripts/suggest.mjs "taxe de séjour conciergerie" --quick   (no alphabet pass)
 *   node seo/scripts/suggest.mjs "<seed>" --json
 * Results are also cached in seo/.cache/suggest-<seed>.json.
 */
import { parseArgs, writeCache } from './lib.mjs';

/** Prefix modifiers: question words people put before a topic. */
const PREFIXES = ['comment', 'pourquoi', 'quel', 'quelle', 'combien', 'qui', 'quand', 'faut-il'];

/** Suffix modifiers: intents that matter for a small-business audience. */
const SUFFIXES = [
  'modèle', 'exemple', 'obligatoire', 'obligation', 'calcul', 'logiciel', 'gratuit', 'excel',
  'automatiser', 'automatisation', 'délai', 'prix', 'mentions obligatoires', '2026', '2027',
];

/** Delay between two requests, to stay polite with the endpoint. */
const DELAY_MS = 250;

/**
 * Sleep for a number of milliseconds.
 * @param {number} ms duration
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch the autocomplete suggestions for one query.
 * @param {string} q query typed in the search box
 * @returns {Promise<string[]>} suggestions, possibly empty
 */
async function fetchSuggestions(q) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&ie=utf-8&oe=utf-8&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, { headers: { 'Accept-Language': 'fr-FR,fr;q=0.9' } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.[1]) ? json[1] : [];
  } catch {
    return [];
  }
}

/**
 * Build the list of expansion queries for a seed.
 * @param {string} seed base topic
 * @param {boolean} quick skip the alphabet pass when true
 * @returns {string[]} queries to send
 */
function expansions(seed, quick) {
  const qs = [seed, ...PREFIXES.map((p) => `${p} ${seed}`), ...SUFFIXES.map((s) => `${seed} ${s}`)];
  if (!quick) for (const c of 'abcdefghijklmnopqrstuvwxyz') qs.push(`${seed} ${c}`);
  return qs;
}

/**
 * Run the expansion and rank suggestions by number of expansions that returned them.
 * @param {string} seed base topic
 * @param {boolean} quick skip the alphabet pass when true
 * @returns {Promise<{seed: string, queries: number, suggestions: Array<{text: string, hits: number, isQuestion: boolean}>}>}
 */
export async function expand(seed, quick = false) {
  const counts = new Map();
  const queries = expansions(seed.toLowerCase().trim(), quick);
  for (const q of queries) {
    for (const s of await fetchSuggestions(q)) {
      const key = s.toLowerCase().trim();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    await sleep(DELAY_MS);
  }
  const questionRe = new RegExp(`^(${PREFIXES.join('|')}|est-ce|peut-on|doit-on)\\b`);
  const suggestions = [...counts.entries()]
    .map(([text, hits]) => ({ text, hits, isQuestion: questionRe.test(text) }))
    .sort((a, b) => b.hits - a.hits || a.text.localeCompare(b.text, 'fr'));
  return { seed, queries: queries.length, suggestions };
}

const { args, flags } = parseArgs(process.argv.slice(2));
const seed = args.join(' ').trim();
if (!seed) {
  console.error('Usage : node seo/scripts/suggest.mjs "<sujet>" [--quick] [--json]');
  process.exit(2);
}
const result = await expand(seed, Boolean(flags.quick));
if (!result.suggestions.length) {
  console.error("Aucune suggestion reçue : réseau indisponible ou point d'accès bloqué. Rien n'est inventé à la place.");
  process.exit(1);
}
const cacheFile = writeCache(`suggest-${seed.replace(/[^\p{L}\d]+/gu, '-').toLowerCase()}.json`, result);
if (flags.json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`${result.suggestions.length} suggestions pour « ${seed} » (${result.queries} requêtes). hits = nombre d'expansions qui la renvoient, pas un volume.\n`);
  for (const s of result.suggestions.slice(0, 80)) console.log(`${String(s.hits).padStart(3)}  ${s.isQuestion ? '?' : ' '}  ${s.text}`);
  console.log(`\nListe complète : ${cacheFile}`);
}
