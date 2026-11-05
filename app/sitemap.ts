import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getBt } from '@/lib/indices-bt';
import { tools } from '@/lib/tools';

const SITE_URL = 'https://opusadvisor.fr';

export const dynamic = 'force-static';

// Date de la dernière modification réelle du contenu de chaque page. À mettre à jour quand on
// modifie une page : une date qui change à chaque mise en ligne finit ignorée par Google.
const PAGES: { path: string; updated: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', updated: '2026-10-31', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/secteurs/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/secteurs/formation/', updated: '2026-11-05', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/secteurs/immobilier/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/secteurs/btp/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cas-clients/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/equipe/', updated: '2026-10-31', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact/', updated: '2026-10-31', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/outils/', updated: '2026-10-31', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consultant-rennes/', updated: '2026-10-23', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/diagnostic-facture-electronique/', updated: '2026-10-31', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/mentions-legales/', updated: '2026-10-31', changeFrequency: 'yearly', priority: 0.1 },
];
const TOOLS_UPDATED = '2026-10-23';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const articleDate = (a: (typeof articles)[number]) => a.updatedAt ?? a.publishedAt ?? '2026-10-23';
  const latestArticle = articles.map(articleDate).sort().at(-1) ?? '2026-10-23';

  const staticPages: MetadataRoute.Sitemap = [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: new Date(p.updated),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    { url: `${SITE_URL}/articles/`, lastModified: new Date(latestArticle), changeFrequency: 'weekly', priority: 0.9 },
    ...tools.map((t) => ({
      url: `${SITE_URL}/outils/${t.slug}/`,
      // La page de l'indice BT01 change à chaque publication de l'INSEE au Journal officiel.
      lastModified: new Date(t.slug === 'indice-bt01' ? (getBt('BT01').last.jo ?? TOOLS_UPDATED) : TOOLS_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}/`,
    lastModified: new Date(articleDate(article)),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
