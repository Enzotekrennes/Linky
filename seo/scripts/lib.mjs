/**
 * Shared helpers for the SEO scripts.
 *
 * Everything here reads the repository as the source of truth: the article index
 * (lib/articles.json), the markdown files (public/articles), the tools and sectors
 * declared in lib/*.ts and the static routes found under app/. No network access.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

/** Absolute path of the repository root (two levels above this file). */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Public origin of the site, used to recognise absolute internal links. */
export const SITE_URL = 'https://opusadvisor.fr';

/** Categories accepted by the /articles page filters. */
export const CATEGORIES = ['Réglementation', 'Outils & systèmes', 'Organisation', 'Méthode'];

/**
 * Resolve a path relative to the repository root.
 * @param {...string} parts path segments
 * @returns {string} absolute path
 */
export function fromRoot(...parts) {
  return path.join(ROOT, ...parts);
}

/**
 * Load the article index in its published order.
 * @returns {Array<Record<string, any>>} entries of lib/articles.json
 */
export function loadArticleIndex() {
  return JSON.parse(fs.readFileSync(fromRoot('lib', 'articles.json'), 'utf8'));
}

/**
 * Read one markdown article and split its front-matter from its body.
 * @param {string} slug article slug (file name without .md)
 * @returns {{slug: string, file: string, data: Record<string, any>, body: string, raw: string} | null}
 */
export function readArticle(slug) {
  const file = fromRoot('public', 'articles', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { slug, file, data, body: content, raw };
}

/**
 * List the slugs of every markdown article on disk.
 * @returns {string[]} slugs sorted alphabetically
 */
export function listArticleFiles() {
  return fs
    .readdirSync(fromRoot('public', 'articles'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3))
    .sort();
}

/**
 * Extract the tool slugs declared in lib/tools.ts.
 * @returns {string[]} tool slugs
 */
export function loadToolSlugs() {
  const src = fs.readFileSync(fromRoot('lib', 'tools.ts'), 'utf8');
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

/**
 * Extract the sector pages declared in lib/sectors.ts.
 * @returns {Array<{slug: string, href: string}>} sector slugs with their route
 */
export function loadSectors() {
  const src = fs.readFileSync(fromRoot('lib', 'sectors.ts'), 'utf8');
  const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  const hrefs = [...src.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
  return slugs.map((slug, i) => ({ slug, href: hrefs[i] }));
}

/**
 * Walk app/ and return every static route that has a page.tsx (dynamic segments skipped).
 * @returns {string[]} routes with a trailing slash, e.g. "/secteurs/btp/"
 */
export function loadStaticRoutes() {
  const routes = [];
  /** Recursive walker collecting page.tsx locations. */
  const walk = (dir, segments) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('[') || entry.name.startsWith('(') || entry.name.startsWith('_')) continue;
        walk(path.join(dir, entry.name), [...segments, entry.name]);
      } else if (entry.name === 'page.tsx') {
        routes.push(segments.length ? `/${segments.join('/')}/` : '/');
      }
    }
  };
  walk(fromRoot('app'), []);
  return routes.sort();
}

/**
 * Build the set of every route the site serves, mapped to its type.
 * @returns {Map<string, {type: string, slug: string}>} route → descriptor
 */
export function loadAllRoutes() {
  const routes = new Map();
  for (const r of loadStaticRoutes()) routes.set(r, { type: 'page', slug: r });
  for (const a of loadArticleIndex()) routes.set(`/articles/${a.slug}/`, { type: 'article', slug: a.slug });
  for (const t of loadToolSlugs()) routes.set(`/outils/${t}/`, { type: 'tool', slug: t });
  return routes;
}

/**
 * Normalise an internal href to the canonical route form used by the site.
 * Strips the origin, the query string and the fragment, and adds the trailing slash.
 * @param {string} href link target as written in markdown
 * @returns {string | null} canonical route, or null when the link is external
 */
export function toRoute(href) {
  let h = href.trim();
  if (h.startsWith(SITE_URL)) h = h.slice(SITE_URL.length) || '/';
  if (!h.startsWith('/') || h.startsWith('//')) return null;
  h = h.split('#')[0].split('?')[0];
  if (!h.endsWith('/') && !path.extname(h)) h += '/';
  return h;
}

/**
 * Extract markdown links from a text, separated into internal and external.
 * @param {string} text markdown body
 * @returns {{internal: Array<{anchor: string, href: string, route: string}>, external: Array<{anchor: string, href: string}>}}
 */
export function extractLinks(text) {
  const internal = [];
  const external = [];
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const [, anchor, href] = m;
    const route = toRoute(href);
    if (route) internal.push({ anchor, href, route });
    else if (/^https?:\/\//.test(href)) external.push({ anchor, href });
  }
  return { internal, external };
}

/**
 * Count the words of a markdown text, ignoring link targets and markup.
 * @param {string} text markdown body
 * @returns {number} word count
 */
export function countWords(text) {
  return text
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/[#*_>`|-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Parse simple "--flag value" / "--flag" command-line options.
 * @param {string[]} argv process.argv.slice(2)
 * @returns {{args: string[], flags: Record<string, string | boolean>}}
 */
export function parseArgs(argv) {
  const args = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else flags[key] = true;
    } else args.push(a);
  }
  return { args, flags };
}

/**
 * Write a JSON file under seo/.cache, creating the folder when needed.
 * @param {string} name file name inside seo/.cache
 * @param {unknown} value data to serialise
 * @returns {string} path relative to the repository root
 */
export function writeCache(name, value) {
  const dir = fromRoot('seo', '.cache');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), `${JSON.stringify(value, null, 2)}\n`);
  return path.join('seo', '.cache', name);
}
