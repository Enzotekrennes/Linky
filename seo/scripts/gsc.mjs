/**
 * Search Console report from a standard performance export.
 *
 * Export from Search Console: Performance → Search results → last 3 months → Export →
 * CSV (or "Download ZIP" and unzip). Drop the folder in seo/data/gsc/<date>/. The
 * folder is git-ignored: query data stays on the machine.
 *
 * The script reads the "Queries" and "Pages" files (French or English headers) and
 * reports three lists:
 *   - striking distance: queries ranked 5 to 20 with enough impressions, the cheapest
 *     wins (improve the page that already ranks instead of writing a new one);
 *   - low CTR pages: pages on page 1 that get shown but rarely clicked (title/meta);
 *   - unanswered queries: queries with impressions but no page clearly targeting them.
 *
 * Usage:
 *   node seo/scripts/gsc.mjs                         latest folder in seo/data/gsc/
 *   node seo/scripts/gsc.mjs seo/data/gsc/2026-11-05 a given export folder
 *   options: --min-impressions 20  --json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fromRoot, loadArticleIndex, loadToolSlugs, parseArgs, readArticle, writeCache } from './lib.mjs';

/**
 * Parse a CSV text (comma separated, double-quoted fields, BOM tolerant).
 * @param {string} text file content
 * @returns {string[][]} rows of cells
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const s = text.replace(/^﻿/, '');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some((v) => v !== '')) rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  row.push(cell);
  if (row.some((v) => v !== '')) rows.push(row);
  return rows;
}

/**
 * Convert a Search Console number ("1 234", "2,4 %", "14.8") to a JS number.
 * @param {string} v raw cell
 * @returns {number} parsed value (NaN when unparseable)
 */
function toNumber(v) {
  return Number(String(v).replace(/[\s  %]/g, '').replace(',', '.'));
}

/**
 * Load one export table, mapping French or English headers to stable keys.
 * @param {string} file CSV path
 * @returns {Array<{key: string, clicks: number, impressions: number, ctr: number, position: number}>}
 */
function loadTable(file) {
  const [header, ...rows] = parseCsv(fs.readFileSync(file, 'utf8'));
  const idx = (re) => header.findIndex((h) => re.test(h.trim()));
  const col = {
    key: 0,
    clicks: idx(/^(clics|clicks)$/i),
    impressions: idx(/^impressions$/i),
    ctr: idx(/^ctr$/i),
    position: idx(/^position$/i),
  };
  if ([col.clicks, col.impressions, col.ctr, col.position].some((i) => i < 0)) {
    throw new Error(`En-têtes inattendus dans ${path.basename(file)} : ${header.join(', ')}`);
  }
  return rows.map((r) => ({
    key: r[col.key],
    clicks: toNumber(r[col.clicks]),
    impressions: toNumber(r[col.impressions]),
    ctr: toNumber(r[col.ctr]),
    position: toNumber(r[col.position]),
  }));
}

/**
 * Find the export folder to read: the given one, or the most recent in seo/data/gsc.
 * @param {string | undefined} given folder passed on the command line
 * @returns {string} absolute folder path
 */
function resolveFolder(given) {
  if (given) return path.resolve(given);
  const base = fromRoot('seo', 'data', 'gsc');
  if (!fs.existsSync(base)) throw new Error('Aucun export : déposer le dossier décompressé dans seo/data/gsc/<date>/');
  const dirs = fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  if (!dirs.length) throw new Error('seo/data/gsc/ est vide');
  return path.join(base, dirs.at(-1));
}

/**
 * Locate a file in the export folder by name pattern.
 * @param {string} folder export folder
 * @param {RegExp} re file name pattern
 * @returns {string | null} absolute file path
 */
function findFile(folder, re) {
  const f = fs.readdirSync(folder).find((n) => re.test(n));
  return f ? path.join(folder, f) : null;
}

/**
 * Guess which article targets a query, from its keywords and title.
 * @param {string} query search query
 * @param {Array<{slug: string, terms: string[]}>} targets article keyword sets
 * @returns {string | null} best matching article slug
 */
function matchArticle(query, targets) {
  const words = new Set(query.toLowerCase().split(/[^\p{L}\d]+/u).filter((w) => w.length > 3));
  let best = null;
  let bestScore = 0;
  for (const t of targets) {
    const score = t.terms.filter((w) => words.has(w)).length;
    if (score > bestScore) {
      best = t.slug;
      bestScore = score;
    }
  }
  return bestScore >= 2 ? best : null;
}

/**
 * Build the report from an export folder.
 * @param {string} folder export folder
 * @param {number} minImpressions impression threshold for a row to count
 */
export function buildReport(folder, minImpressions) {
  const qFile = findFile(folder, /^(requêtes|requetes|queries)\.csv$/i);
  const pFile = findFile(folder, /^pages\.csv$/i);
  if (!qFile && !pFile) throw new Error(`Ni Requêtes.csv ni Pages.csv dans ${folder}`);

  const targets = loadArticleIndex().map((a) => {
    const art = readArticle(a.slug);
    const text = [a.title, ...(art?.data.keywords ?? [])].join(' ').toLowerCase();
    return { slug: a.slug, terms: [...new Set(text.split(/[^\p{L}\d]+/u).filter((w) => w.length > 3))] };
  });
  // Free tools target queries too: match on the words of their slug.
  for (const t of loadToolSlugs()) targets.push({ slug: `outil:${t}`, terms: t.split('-').filter((w) => w.length > 3) });

  const queries = qFile ? loadTable(qFile) : [];
  const pages = pFile ? loadTable(pFile) : [];

  const striking = queries
    .filter((q) => q.position >= 5 && q.position <= 20 && q.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .map((q) => ({ ...q, article: matchArticle(q.key, targets) }));

  const lowCtr = pages
    .filter((p) => p.position <= 10 && p.impressions >= minImpressions * 5 && p.ctr < 2)
    .sort((a, b) => b.impressions - a.impressions);

  const unanswered = striking.filter((q) => !q.article).concat(
    queries.filter((q) => q.position > 20 && q.impressions >= minImpressions && !matchArticle(q.key, targets)),
  );

  return {
    folder: path.relative(fromRoot(), folder),
    totals: {
      clicks: queries.reduce((s, q) => s + q.clicks, 0),
      impressions: queries.reduce((s, q) => s + q.impressions, 0),
      queries: queries.length,
      pages: pages.length,
    },
    striking,
    lowCtr,
    unanswered,
  };
}

const { args, flags } = parseArgs(process.argv.slice(2));
const minImpressions = Number(flags['min-impressions'] ?? 20);
try {
  const report = buildReport(resolveFolder(args[0]), minImpressions);
  const out = writeCache('gsc-report.json', report);
  if (flags.json) console.log(JSON.stringify(report, null, 2));
  else {
    const t = report.totals;
    console.log(`Export ${report.folder} : ${t.clicks} clics, ${t.impressions} impressions, ${t.queries} requêtes, ${t.pages} pages\n`);
    console.log(`Requêtes à portée (position 5 à 20, ≥ ${minImpressions} impressions) :`);
    for (const q of report.striking.slice(0, 30))
      console.log(`  pos ${q.position.toFixed(1).padStart(4)}  ${String(q.impressions).padStart(5)} impr.  ${q.key}  →  ${q.article ?? 'aucun article ciblé'}`);
    console.log(`\nPages en première page avec un CTR sous 2 % :`);
    for (const p of report.lowCtr) console.log(`  pos ${p.position.toFixed(1).padStart(4)}  CTR ${p.ctr.toFixed(1)} %  ${String(p.impressions).padStart(5)} impr.  ${p.key}`);
    console.log(`\nRequêtes sans article qui les cible : ${report.unanswered.length}`);
    for (const q of report.unanswered.slice(0, 20)) console.log(`  pos ${q.position.toFixed(1).padStart(4)}  ${String(q.impressions).padStart(5)} impr.  ${q.key}`);
    console.log(`\nDétail : ${out}`);
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
