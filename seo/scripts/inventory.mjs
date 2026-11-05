/**
 * Site inventory and internal link graph.
 *
 * Lists every page the site serves, the keywords each article targets, and how pages
 * link to each other (links written in article bodies plus the "related" and "tools"
 * fields of lib/articles.json). Used by the strategist to avoid duplicates and by the
 * linker to find pages that need more internal links.
 *
 * Usage:
 *   node seo/scripts/inventory.mjs           summary table + seo/.cache/inventory.json
 *   node seo/scripts/inventory.mjs --json    full JSON on stdout
 */
import {
  countWords,
  extractLinks,
  loadAllRoutes,
  loadArticleIndex,
  loadSectors,
  parseArgs,
  readArticle,
  writeCache,
} from './lib.mjs';

/**
 * Build the inventory: one node per route with its inbound and outbound links.
 * @returns {{generatedAt: string, pages: Array<Record<string, any>>, brokenLinks: Array<Record<string, string>>}}
 */
export function buildInventory() {
  const routes = loadAllRoutes();
  const index = loadArticleIndex();
  const sectors = loadSectors();
  const nodes = new Map();

  for (const [route, info] of routes) {
    nodes.set(route, { route, type: info.type, slug: info.slug, inbound: [], outbound: [] });
  }
  for (const s of sectors) {
    const node = nodes.get(s.href);
    if (node) node.type = 'sector';
  }

  const brokenLinks = [];

  /** Record a link between two routes, or a broken link when the target does not exist. */
  const link = (from, to, kind, anchor = '') => {
    const target = nodes.get(to);
    if (!target) {
      brokenLinks.push({ from, to, kind, anchor });
      return;
    }
    nodes.get(from).outbound.push({ to, kind, anchor });
    target.inbound.push({ from, kind, anchor });
  };

  for (const entry of index) {
    const route = `/articles/${entry.slug}/`;
    const node = nodes.get(route);
    const article = readArticle(entry.slug);
    Object.assign(node, {
      title: entry.title,
      category: entry.category,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt ?? null,
      keywords: article?.data.keywords ?? [],
      words: article ? countWords(article.body) : 0,
      hasFaq: Array.isArray(article?.data.faq) && article.data.faq.length > 0,
      missingFile: !article,
    });
    if (article) {
      for (const l of extractLinks(article.body).internal) link(route, l.route, 'body', l.anchor);
    }
    for (const r of entry.related ?? []) link(route, `/articles/${r}/`, 'related');
    for (const t of entry.tools ?? []) link(route, `/outils/${t}/`, 'tools');
  }

  const pages = [...nodes.values()].map((n) => ({
    ...n,
    inboundBody: n.inbound.filter((l) => l.kind === 'body').length,
    inboundTotal: n.inbound.length,
    outboundBody: n.outbound.filter((l) => l.kind === 'body').length,
  }));

  return { generatedAt: new Date().toISOString(), pages, brokenLinks };
}

/**
 * Print a compact, human-readable summary of the inventory.
 * @param {ReturnType<typeof buildInventory>} inv inventory to summarise
 */
function printSummary(inv) {
  const articles = inv.pages.filter((p) => p.type === 'article');
  const others = inv.pages.filter((p) => p.type !== 'article');
  console.log(`Articles (${articles.length})  in=liens reçus depuis le corps d'autres articles, out=liens internes dans son corps\n`);
  console.log('in  out  mots  faq  catégorie           slug');
  for (const a of articles) {
    console.log(
      `${String(a.inboundBody).padStart(2)}  ${String(a.outboundBody).padStart(3)}  ${String(a.words).padStart(4)}  ${a.hasFaq ? 'oui' : ' - '}  ${(a.category ?? '').padEnd(18)}  ${a.slug}`,
    );
  }
  console.log(`\nPages, outils et secteurs : liens reçus depuis les articles (corps / total)\n`);
  for (const p of others) {
    if (p.route === '/mentions-legales/') continue;
    console.log(`${String(p.inboundBody).padStart(2)} / ${String(p.inboundTotal).padStart(2)}  ${p.type.padEnd(7)}  ${p.route}`);
  }
  const orphans = articles.filter((a) => a.inboundTotal === 0);
  if (orphans.length) console.log(`\nArticles qui ne reçoivent aucun lien : ${orphans.map((o) => o.slug).join(', ')}`);
  if (inv.brokenLinks.length) {
    console.log('\nLiens cassés :');
    for (const b of inv.brokenLinks) console.log(`  ${b.from} → ${b.to} (${b.kind})`);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('inventory.mjs')) {
  const { flags } = parseArgs(process.argv.slice(2));
  const inv = buildInventory();
  if (flags.json) {
    console.log(JSON.stringify(inv, null, 2));
  } else {
    printSummary(inv);
    console.log(`\nDétail complet : ${writeCache('inventory.json', inv)}`);
  }
}
