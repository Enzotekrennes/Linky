import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CasesSection } from '@/components/home/CasesSection';
import { MethodSection } from '@/components/home/MethodSection';
import { SectionKicker } from '@/components/ui/SectionKicker';
import { AutomationDemo } from '@/components/motion/AutomationDemo';
import { getAllArticles } from '@/lib/articles';
import type { ClientCase } from '@/lib/cases';
import type { DemoKey } from '@/lib/demoFlows';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

export interface SectorPageProps {
  url: string;
  breadcrumbName: string;
  kicker: string;
  title: string;
  intro: string;
  painsTitle: string;
  pains: { title: string; desc: string }[];
  setupTitle: string;
  setup: { what: string; tools?: string; desc: string }[];
  cases: ClientCase[];
  demo: DemoKey[];
  ctaTitle: string;
  ctaText: string;
  /** Articles mis en avant, dans l'ordre d'affichage. Sans article, la section n'apparaît pas. */
  reading?: { title: string; slugs: string[] };
}

/** Gabarit des pages /secteurs/* (hors BTP, qui garde ses sections historiques). */
export const SectorPage: React.FC<SectorPageProps> = (p) => {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Secteurs', item: 'https://opusadvisor.fr/secteurs/' },
      { '@type': 'ListItem', position: 3, name: p.breadcrumbName, item: p.url },
    ],
  };

  const readingArticles = (p.reading?.slugs ?? [])
    .map((slug) => getAllArticles().find((a) => a.slug === slug))
    .filter((a) => a !== undefined);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="flex-grow">
        <section className="pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <Link href="/secteurs/" className="inline-block mb-6 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: GOLD_INK }}>
                ← Tous les secteurs
              </Link>
              <SectionKicker label={p.kicker} className="mb-6" />
              <h1 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl" style={{ color: NAVY }}>
                {p.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">{p.intro}</p>
              <Link
                href="/contact"
                className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base text-white"
                style={{ background: NAVY }}
              >
                Réserver le pré-audit gratuit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <AutomationDemo keys={p.demo} />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white" aria-labelledby="pains-title">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 data-reveal id="pains-title" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
              {p.painsTitle}
            </h2>
            <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-14">
              {p.pains.map((pain, i) => (
                <li key={pain.title} data-reveal data-reveal-delay={String((i % 2) + 1)} className="py-7 border-t" style={{ borderColor: RULE }}>
                  <h3 className="font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-700 leading-relaxed">{pain.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-28" style={{ background: PAPER }} aria-labelledby="setup-title">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 data-reveal id="setup-title" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
              {p.setupTitle}
            </h2>
            <dl className="mt-12">
              {p.setup.map((s, i) => (
                <div key={s.what} data-reveal data-reveal-delay={String((i % 3) + 1)} className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t" style={{ borderColor: RULE }}>
                  <dt className="md:col-span-5">
                    <span className="block font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                      {s.what}
                    </span>
                    {s.tools && <span className="block mt-1 text-sm text-gray-600">{s.tools}</span>}
                  </dt>
                  <dd className="md:col-span-7 text-base md:text-lg text-gray-700 leading-relaxed">{s.desc}</dd>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: RULE }} />
            </dl>
          </div>
        </section>

        {p.cases.length > 0 && (
          <CasesSection
            cases={p.cases}
            title={p.cases.length > 1 ? 'Ce qu’on a déjà mis en place dans ce secteur' : 'Une mission dans ce secteur'}
            link={{ href: '/cas-clients', label: 'Tous les cas clients' }}
            showVisuals
          />
        )}

        <MethodSection background={PAPER} />

        {readingArticles.length > 0 && (
          <section className="py-20 md:py-28 bg-white" aria-labelledby="reading-title">
            <div className="container mx-auto px-6 max-w-6xl">
              <h2 data-reveal id="reading-title" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
                {p.reading?.title}
              </h2>
              <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-14">
                {readingArticles.map((a) => (
                  <li key={a.slug} data-reveal className="border-t" style={{ borderColor: RULE }}>
                    <Link href={`/articles/${a.slug}/`} className="group block py-7">
                      <span className="block font-semibold text-lg md:text-xl leading-snug group-hover:underline underline-offset-4" style={{ color: NAVY }}>
                        {a.title}
                      </span>
                      <span className="block mt-2 text-base text-gray-700 leading-relaxed">{a.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="py-20 md:py-28" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Pré-audit gratuit" tone="dark" className="mb-8" />
            <h2 data-reveal className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">{p.ctaTitle}</h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">{p.ctaText}</p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base"
              style={{ background: GOLD, color: NAVY }}
            >
              Réserver le pré-audit gratuit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
