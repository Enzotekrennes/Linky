import type { Metadata } from 'next';
import { SectorPage } from '@/components/pages/SectorPage';
import { casesFor } from '@/lib/cases';

const PAGE_URL = 'https://opusadvisor.fr/secteurs/formation/';
const PAGE_TITLE = 'Automatisation pour organisme de formation';
const PAGE_DESCRIPTION =
  'Conventions, convocations, émargements et dossiers pour les financeurs générés et envoyés automatiquement, à partir de vos outils actuels. Pré-audit gratuit.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

export default function FormationPage() {
  return (
    <SectorPage
      url={PAGE_URL}
      breadcrumbName="Organismes de formation"
      kicker="Organismes de formation"
      title="Automatiser la gestion d'un organisme de formation"
      intro="Inscriptions, conventions, convocations, émargements, dossiers pour les financeurs : chaque session produit une pile de documents. On réunit les stagiaires et les sessions dans une base centrale, reliée à vos outils, pour que ces documents se préparent et partent tout seuls. Si votre logiciel de gestion de formation fait l'affaire, il reste en place."
      painsTitle="Ce qui prend le plus de temps"
      pains={[
        {
          title: 'Les mêmes informations saisies trois fois',
          desc: "Le stagiaire s'inscrit par formulaire, on recopie ses coordonnées dans le tableau des sessions, puis dans la convention et l'attestation.",
        },
        {
          title: 'Des dossiers de financement montés à la main',
          desc: 'Convention, programme, émargements, certificat de réalisation : à rassembler puis à envoyer au financeur, stagiaire par stagiaire.',
        },
        {
          title: 'Des convocations et des rappels envoyés un par un',
          desc: 'Chaque session demande ses mails : la convocation, le rappel la veille, le questionnaire de satisfaction après.',
        },
        {
          title: 'Des paiements difficiles à suivre',
          desc: 'Qui a payé, quel financeur attend encore une pièce, quelle facture relancer : la réponse est quelque part dans les mails.',
        },
        {
          title: 'Des preuves Qualiopi éparpillées',
          desc: "Avant l'audit, il faut retrouver la preuve de chaque indicateur : évaluations, émargements, réclamations, veille.",
        },
        {
          title: 'Le bilan pédagogique et financier à reconstituer',
          desc: 'Chaque année, le BPF oblige à recompter heures, stagiaires et produits par type de financement, à partir de fichiers dispersés.',
        },
      ]}
      setupTitle="Ce qu'on met en place"
      setup={[
        {
          what: 'Une base centrale des stagiaires et des sessions',
          tools: 'Votre logiciel de gestion de formation (Digiforma, Dendreo…), Airtable ou Google Sheets',
          desc: 'Chaque information est saisie une fois, au bon endroit, et sert à tous les documents.',
        },
        {
          what: 'Les documents générés automatiquement',
          desc: "Conventions, convocations, attestations et dossiers de financement se remplissent avec les informations déjà saisies.",
        },
        {
          what: 'Les envois et les relances programmés',
          tools: 'Make ou n8n',
          desc: 'Convocations, rappels, questionnaires, relances des pièces manquantes et des paiements partent à la bonne date.',
        },
        {
          what: 'Les preuves classées au fil de l’eau',
          desc: "Chaque document est rangé au moment où il est produit, prêt pour l'audit Qualiopi et pour le BPF.",
        },
      ]}
      demo={['formation']}
      cases={casesFor('formation')}
      reading={{ title: 'À lire pour les organismes de formation', slugs: ['fin-subrogation-opco-organisme-formation'] }}
      ctaTitle="Combien d'heures par session passent dans les dossiers ?"
      ctaText="Pendant le pré-audit, on suit le parcours d'un stagiaire dans vos outils, de l'inscription à la facturation, et on repère ce qui peut partir tout seul. 30 minutes en visio, gratuites."
    />
  );
}
