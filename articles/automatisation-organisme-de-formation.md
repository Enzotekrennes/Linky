---
title: "Automatisation d'un organisme de formation : par où commencer"
metaDescription: "Automatisation d'un organisme de formation : ce que fait déjà votre logiciel, ce qui reste à la main et par quoi commencer, session par session."
date: "2026-11-05"
keywords: ["automatisation organisme de formation", "gestion administrative organisme de formation", "gestion administrative centre de formation", "logiciel gestion administrative organisme de formation"]
essentiel:
  - "Commencez par les envois datés (convocations, rappels), puis par les documents pré-remplis en brouillon, puis par les alertes de délais et de pièces manquantes, car une erreur s'y rattrape plus facilement."
  - "Gardez à une personne ce qui engage votre responsabilité, comme le traitement des réclamations, le certificat de réalisation, le service fait et la relecture des déclarations sur les portails."
  - "Un logiciel de gestion couvre déjà une partie du travail, et ce qu'il laisse à la main décide du niveau à retenir : des automatisations autour de lui, une application centrale ou un système complet."
faq:
  - q: "Peut-on automatiser les rappels de sessions de formation ?"
    a: "Oui, c'est l'un des premiers envois à automatiser. Testez deux cas dans votre outil, la session déplacée et le stagiaire inscrit après l'envoi. Dans les documentations de Digiforma et de Dendreo, ce stagiaire ne reçoit pas le message dont la date d'envoi est passée, et une convocation déjà envoyée se renvoie à la main après un changement."
  - q: "Peut-on automatiser le suivi des financements CPF et OPCO ?"
    a: "En partie, et la réponse dépend du dispositif. Sur le CPF, Dendreo documente une synchronisation avec EDOF par un abonnement Wedof, alors que l'aide de Digiforma décrit un suivi par numéro de dossier. En apprentissage, la connexion Wedof et l'API Convergence visent les CFA. Hors apprentissage, nous n'avons pas trouvé d'API de dépôt documentée pour un organisme de formation au 5 novembre 2026, mais la préparation du dossier et les alertes s'automatisent, et le reste se vérifie auprès de chaque OPCO."
  - q: "Un logiciel de gestion de formation suffit-il ?"
    a: "Il suffit s'il sert à toutes vos sessions, si ses données sont fiables et s'il traite les cas de votre activité. Testez-le sur une session fictive en la déplaçant et en ajoutant un stagiaire après l'envoi. Ce qui reste à la main vous dira s'il faut ajouter quelque chose autour de lui."
  - q: "Le BPF peut-il se déclarer automatiquement ?"
    a: "Un logiciel peut préparer les chiffres. Digiforma écrit qu'il faut copier les valeurs sur le CERFA en ligne, et Dendreo qu'il ne télédéclare pas le bilan et qu'aucun logiciel extérieur ne peut se connecter directement au site gouvernemental. C'est la position écrite de ces éditeurs, sans confirmation officielle trouvée. Comptez donc sur une saisie et une relecture dans Mon Activité Formation."
  - q: "Par quoi commencer quand on est déjà débordé ?"
    a: "Par une seule session. Notez chaque ressaisie de l'inscription à la facture, puis automatisez l'envoi le plus fréquent dont l'erreur se répare d'un message. Les convocations et les rappels s'y prêtent bien."
---

*Catégorie : Méthode — Lecture : 10 minutes — Auteur : Enzo Monnier, Opus Advisor*

Une session passe du mardi au jeudi, trois semaines avant son début. Digiforma [recalcule les prochains e-mails automatiques](https://help.digiforma.com/fr/articles/3000597-comment-automatiser-ou-planifier-l-envoi-d-un-e-mail-avec-digiforma), et Dendreo [met à jour ses e-mails programmés](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails). Chez Dendreo, [le changement lui-même ne déclenche aucun e-mail](https://doc.dendreo.com/article/560-questions-frequentes-automatisme), et dans les deux logiciels, [une convocation déjà partie ne repart pas seule](https://help.digiforma.com/fr/articles/3653735-comment-envoyer-les-convocations-par-e-mail-a-mes-apprenants). Pour automatiser un organisme de formation, ce sont ces cas qu'il faut tester en premier.

Commencez par les envois datés, puis par les documents pré-remplis en brouillon, puis par les alertes de délais. Gardez à une personne ce qui engage votre responsabilité. Si vous avez déjà un logiciel de gestion, il couvre une partie de ce travail, et ce qu'il laisse à la main décide du niveau à retenir.

## Ce qui peut partir seul, étape par étape

Ce tableau suit une session jusqu'au bilan annuel. Un outil peut faire ce qui y figure sans vous, à condition que la donnée existe et qu'elle soit juste.

| Étape | Ce qui peut partir seul |
| :- | :- |
| Inscription | Accusé de réception, fiche stagiaire, demande de pièces |
| Financement | Alerte sur un dossier sans réponse |
| Convention | Brouillon pré-rempli, envoi pour signature |
| Convocation et rappels | Envoi à date fixe, rappel avant le début |
| Émargement | Lien de signature, relance des oublis |
| Fin de session | Questionnaire, certificat en brouillon |
| Facture et paiement | Facture en brouillon, rappel d'échéance |
| BPF | Compteurs à jour, chiffres prêts à relire |

Les rappels se programment sans peine, et le stagiaire ajouté après l'envoi les met à l'épreuve. Décidez à l'avance qui est prévenu quand une date bouge, et qui renvoie quoi.

La convention dépend du financeur. Sur le CPF, les conditions générales de Mon Compte Formation en tiennent lieu. Pour certaines actions et certains financeurs, un devis ou un bon de commande approuvé peut la remplacer, sous conditions, d'après [l'article D. 6353-1 du Code du travail](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018499074/). Et [depuis le 1er octobre 2026, le destinataire de la facture dépend de l'OPCO et du dossier](/articles/fin-subrogation-opco-organisme-formation/). Une même pile de documents pour tous sera fausse sur une partie de vos dossiers.

Pour une formation en ligne, laissez l'entrée hors de tout réglage automatique. Les [conditions particulières de Mon Compte Formation (V16)](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-particulieres-of_V16.pdf) précisent que l'envoi des modalités de connexion et les tests de connexion « ne constituent pas une entrée effective en formation ». Un outil réglé pour déclarer l'entrée à la date de début se tromperait pour chaque stagiaire qui n'a pas démarré.

Sur l'émargement électronique, nous n'avons pas trouvé de règle générale officielle. Interrogez chaque financeur avant de changer de méthode.

## Commencer par les envois, les brouillons, puis les alertes

Chronométrez d'abord une session réelle, en notant le temps passé, les ressaisies et les outils ouverts. Plusieurs pages lues pour ce guide promettent des gains sans citer de source. Nous n'en donnons aucun, et votre relevé servira mieux.

Ensuite, une information ne doit se saisir qu'une fois. Si le nom d'un stagiaire vit dans un formulaire, un tableur et une convention, vous automatiserez la copie de la mauvaise version.

Nous proposons de classer les tâches selon leur fréquence, le coût d'une erreur et la possibilité de revenir en arrière. Un rappel de trop s'excuse, un service fait validé à tort beaucoup moins. Cet ordre est notre proposition, et nous ne l'avons pas mesuré.

1. Les envois datés, comme les convocations, les rappels et les questionnaires. Une erreur se répare d'un message.
2. Les documents en brouillon. Conventions, certificats et factures se remplissent seuls, puis une personne les relit avant l'envoi.
3. Les alertes de délais et de pièces manquantes, qui préviennent la bonne personne avant l'échéance.
4. Les relances de paiement, avec un rappel avant l'échéance et, en cas de retard, notre [calculateur de pénalités de retard](/outils/calcul-penalites-de-retard/).
5. Les preuves, rangées au moment où elles sont produites.

Si le CPF pèse lourd dans vos dossiers, placez les alertes de délais en tête, car ils sont courts. Les [conditions générales](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-generales-d%27utilisation_V16.pdf) fixent le premier, les [conditions particulières](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-particulieres-of_V16.pdf) les suivants.

- 2 jours ouvrés pour répondre à une demande d'inscription (pour une formation à prérequis, un accusé de réception sous 2 jours ouvrés et 30 jours ouvrés pour instruire)
- 3 jours ouvrés pour déclarer l'entrée à compter du début de la formation
- 3 jours ouvrés à l'issue de la formation pour la sortie et le service fait
- 5 jours ouvrés pour transmettre les pièces que la Caisse des Dépôts réclame

Elle peut les demander pendant 5 ans à compter de l'exécution de la formation. Des preuves perdues dans une boîte mail ne se retrouvent pas en 5 jours ouvrés, quatre ans plus tard. La version 16 ajoute [des notifications pour ces déclarations](https://of.moncompteformation.gouv.fr/espace-public/version-16-des-conditions-dutilisation-ce-qui-change), à faire arriver chez la personne qui déclare.

Un rappel peut aussi servir de preuve. Les conditions particulières citent, parmi les justificatifs d'accompagnement à distance, les « relances pour inciter le stagiaire à se connecter ». Nous en déduisons qu'une relance automatique n'a cette valeur que si vous la conservez dans le dossier du stagiaire.

## Ce qui reste à une personne, et pourquoi

### Les décisions que demande le référentiel

Le [référentiel qualité en vigueur depuis le 1er novembre 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054608509) attend du prestataire qu'il analyse le besoin du bénéficiaire (indicateur 4), qu'il adapte la prestation aux publics (10) et qu'il vérifie « l'effectivité » du suivi des modules à distance (19). Il vise aussi le traitement des difficultés et des réclamations (31), puis une démarche d'amélioration continue à partir de l'analyse des appréciations et des réclamations (32). Un formulaire recueille la réclamation d'une stagiaire mécontente de la salle. Il faut quelqu'un pour lui répondre et décider de ce qui change à la session suivante.

### Les déclarations sur les portails

Pour le BPF, Dendreo [écrit en avril 2026](https://doc.dendreo.com/article/415-questions-frequentes) qu'« il n'existe pas de possibilité de connecter des logiciels extérieurs directement au site gouvernemental », et [Digiforma](https://help.digiforma.com/fr/articles/3000584-comment-digiforma-vous-aide-a-remplir-votre-bilan-pedagogique-et-financier) qu'il faut « copier les valeurs correspondantes sur le CERFA en ligne ». Ces positions sont celles des éditeurs, sans confirmation officielle trouvée. Relisez les chiffres préparés, car Dendreo donne l'encadré D « à titre indicatif » et le calcul de Digiforma part des produits de la session, sans lien avec les factures. [Sans transmission, la déclaration d'activité devient caduque](https://info.monactiviteformation.emploi.gouv.fr/actualit%C3%A9s/campagne-bpf-2025/).

Sur EDOF, Dendreo [synchronise les dossiers](https://doc.dendreo.com/article/448-synchronisation-edof-dossiers-cpf) à condition de souscrire un abonnement Wedof, [habilité dans EFP Connect](https://doc.wedof.fr/article/18-deleguer-a-wedof-habilitation-acces-edof) par le responsable des accès de l'organisme. [L'article d'aide de Digiforma du 30 mars 2026](https://help.digiforma.com/fr/articles/6495189-comment-gerer-une-nouvelle-inscription-cpf) décrit un suivi par numéro de dossier et une mise à jour à la main. Dans tous les cas, relisez avant de déclarer, car [la Caisse des Dépôts valide automatiquement le service fait sous cinq jours ouvrés, sauf contrôle](https://of.moncompteformation.gouv.fr/espace-public/aide/comment-declarer-la-sortie-de-formation-et-le-service-fait), et vous ne pouvez plus le modifier ensuite. Avant cela, la correction reste possible, sauf si un gestionnaire a déjà modifié la déclaration. Pour un demandeur d'emploi qui a obtenu un abondement de France Travail, [les conditions particulières](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-particulieres-of_V16.pdf) ajoutent une déclaration d'assiduité dans KAIROS.

Côté OPCO, [la connexion Wedof](https://doc.wedof.fr/article/21-connexion-opco-cfa) et [l'API Convergence qu'utilise OPCO 2i](https://www.opco2i.fr/vos-projets/facturer-opco2i/) visent les contrats d'apprentissage, et l'extension de la première figure parmi les fonctionnalités « à l'étude ». Hors apprentissage, nos recherches au 5 novembre 2026 n'ont pas fait apparaître d'API de dépôt documentée pour un organisme de formation. Ce résultat ne prouve pas qu'il n'en existe aucune, et [la fiche « Gestion de plan » d'OPCO 2i](https://www.opco2i.fr/wp-content/uploads/2023/04/opco2i-fiche-produit-gestion-de-plan-2026.pdf), un service pour les entreprises, mentionne un dépôt « via Mon Compte 2i ou API », sans détail. Posez la question à vos OPCO. La préparation du dossier et l'alerte sur ce qui manque s'automatisent dans tous les cas.

### Les signatures et les validations

L'outil envoie le lien d'émargement, et c'est le stagiaire qui signe. Pour le contrôle de service fait d'un OPCO, le [certificat de réalisation](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037880305) est « établi par le dispensateur de l'action », donc par vous. Quand un stagiaire manque une demi-journée, une personne décide de ce que le document indique.

## Ce que votre logiciel de gestion fait déjà, et où il s'arrête

Nous vendons de la mise en place, pas de logiciel, et nous ne touchons rien de ces éditeurs. Digiforma et Dendreo servent d'exemples, sans classement, parce que leur documentation publique est précise. Ce tableau résume leurs pages au 5 novembre 2026. Les fonctions varient selon l'abonnement, notamment [chez Digiforma depuis mai 2025](https://help.digiforma.com/fr/articles/6231904-decouvrez-les-fonctionnalites-disponibles-en-supplement-de-vos-abonnements).

| Cas | Digiforma | Dendreo |
| :- | :- | :- |
| Date modifiée | [Prochains e-mails recalculés](https://help.digiforma.com/fr/articles/3000597-comment-automatiser-ou-planifier-l-envoi-d-un-e-mail-avec-digiforma) | [E-mails à venir mis à jour](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails) |
| Déjà convoqué | [Renvoi manuel](https://help.digiforma.com/fr/articles/3653735-comment-envoyer-les-convocations-par-e-mail-a-mes-apprenants) | [Renvoi manuel](https://doc.dendreo.com/article/560-questions-frequentes-automatisme) |
| Inscrit après l'envoi | [Ne le reçoit pas](https://help.digiforma.com/fr/articles/3000597-comment-automatiser-ou-planifier-l-envoi-d-un-e-mail-avec-digiforma) | [Ne le reçoit pas](https://doc.dendreo.com/article/560-questions-frequentes-automatisme) |
| E-mail à la signature | [Oui](https://help.digiforma.com/fr/articles/3000597-comment-automatiser-ou-planifier-l-envoi-d-un-e-mail-avec-digiforma) | [Pas pour le moment](https://doc.dendreo.com/article/560-questions-frequentes-automatisme) |
| Webhooks | [Pas pour le moment](https://help.digiforma.com/fr/articles/11439399-graphql-l-api-digiforma) | [Oui](https://doc.dendreo.com/article/545-presentation-webhooks) |
| API | [En option](https://help.digiforma.com/fr/articles/6231904-decouvrez-les-fonctionnalites-disponibles-en-supplement-de-vos-abonnements) | [Sur demande](https://developers.dendreo.com/) |

Chez Digiforma, [une règle d'e-mail automatique définie par défaut](https://help.digiforma.com/fr/articles/3000597-comment-automatiser-ou-planifier-l-envoi-d-un-e-mail-avec-digiforma) ne s'applique ni aux sessions déjà créées ni aux sessions clonées, et un envoi qu'une date modifiée place dans le passé ne part jamais. Chez Dendreo, [un e-mail automatique (Automatisme)](https://doc.dendreo.com/article/560-questions-frequentes-automatisme) ne se conditionne pas, pour le moment, au statut du stagiaire.

Un webhook prévient un autre outil dès qu'un événement survient, comme [la modification d'un créneau (date, lieu, intitulé), une présence ou une facture](https://doc.dendreo.com/article/545-presentation-webhooks) chez Dendreo. Sans lui, votre automatisation doit interroger le logiciel à intervalles réguliers.

Sur votre propre compte, faites trois tests avec une session fictive.

1. Déplacez la session et regardez ce qui repart.
2. Ajoutez un stagiaire après l'envoi.
3. Vérifiez si votre abonnement ouvre une API, avec quel quota, et si le logiciel prévient quand une donnée change.

## Automatisations, application centrale ou système complet

Ces tests orientent le choix. Nous ne donnons aucun seuil en nombre de sessions, faute de donnée sérieuse. Si votre logiciel fait l'affaire, il reste, et [ce que nous construisons pour un organisme de formation](/secteurs/formation/) part de ce diagnostic.

Dans [le cas que nous avons publié](/cas-clients/), chaque dossier de financement se montait à la main, des documents de chaque stagiaire à l'envoi aux financeurs. La génération et l'envoi sont automatisés, et le système tourne au quotidien.

### Automatisations seules

Un logiciel sert à toutes vos sessions, ses données sont fiables et votre abonnement l'ouvre par une API, des webhooks ou un connecteur. Il reste des trous précis, comme les sessions déplacées, les relances ou les dossiers. On automatise ce qui se fait encore à la main, avec Make ou n8n.

### Application centrale

Les logiciels restent, mais vos données sont éparpillées et vous ne savez pas dire quel dossier attend quoi. Une application plus simple les réunit (base Airtable ou outil développé pour vous), et les automatisations partent de là.

### Système complet, de A à Z

Vous travaillez avec des tableurs et des mails, ou avec trop d'outils qui ne se parlent pas. On commence par choisir les outils, puis on construit l'application et les automatisations, et on forme l'équipe. La réponse peut être un logiciel de gestion du marché.

## Les chiffres à suivre sans recompter

Un tableau de suivi utile tient en quelques lignes, lues le lundi matin sans ouvrir un autre outil.

- Les sessions à venir
- Les dossiers sans mode de paiement renseigné
- Les pièces manquantes, par financeur
- Les certificats non envoyés
- Les factures échues, par payeur
- Les déclarations EDOF ouvertes

Une session commence jeudi, une convention n'est pas signée, deux certificats de la semaine passée ne sont pas partis, et ces lignes le montrent sans recherche. Si vous devez recompter à la main pour les remplir, vos outils ne se parlent pas assez.

## Un circuit automatisé se surveille

Entre le 1er septembre et le 1er novembre 2026, quatre règles ont bougé. [La réception de la facture électronique](https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique) est obligatoire depuis le 1er septembre pour les entreprises assujetties à la TVA. La subrogation a changé le 1er octobre chez plusieurs OPCO, [dont Atlas](https://www.opco-atlas.fr/faq/reforme-de-la-tva.html). [Les conditions de Mon Compte Formation](https://of.moncompteformation.gouv.fr/espace-public/version-16-des-conditions-dutilisation-ce-qui-change) ont changé le 22 octobre, et [le référentiel qualité](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054608509) le 1er novembre. Notre article sur [la facture électronique pour un organisme exonéré ou mixte](/articles/facturation-electronique-organisme-formation/) donne les dates qui vous concernent, et le [diagnostic facture électronique gratuit](/diagnostic-facture-electronique/) situe votre organisme.

Les logiciels bougent aussi. [Le journal de l'API Digiforma](https://help.digiforma.com/fr/articles/8683705-api-interconnexions-les-evolutions-au-fil-du-temps) signale qu'en juillet 2026, la mise à jour d'un programme par ses anciens champs n'est plus autorisée, et qu'en septembre, créer une session avec à la fois un programme et des modules renvoie une erreur. Une automatisation écrite avant ces dates peut échouer alors que vous n'avez rien modifié.

Nommez une personne responsable du circuit. Elle regarde les envois en échec chaque semaine et teste le parcours à chaque changement de règle. Prévoyez une alerte quand un envoi attendu ne part pas.

Vos données de stagiaires passent aussi par ces outils. La [CNIL](https://www.cnil.fr/fr/securite-gerer-la-sous-traitance) range parmi ce qu'il ne faut pas faire le démarrage d'une sous-traitance sans contrat reprenant l'article 28 du RGPD. Pour la clause, voyez un professionnel du droit.

Cette semaine, suivez une session de l'inscription à la facture et notez chaque ressaisie. Cette liste vous dira par où commencer.

---

**Votre relevé est fait et vous hésitez sur la première automatisation ?** Pré-audit gratuit en visio, 30 minutes, sans engagement. On regarde vos outils et on identifie trois points de friction.

[Réserver un créneau](/contact/)

---

*Sources : [conditions particulières V16](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-particulieres-of_V16.pdf), [conditions générales V16](https://of.moncompteformation.gouv.fr/espace-public/sites/of/files/2026-10/Conditions-generales-d%27utilisation_V16.pdf), [changements de la version 16](https://of.moncompteformation.gouv.fr/espace-public/version-16-des-conditions-dutilisation-ce-qui-change), [décret n° 2026-728 du 1er août 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054608509), [arrêté du 21 décembre 2018](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037880305), [article D. 6353-1](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018499074/), [campagne BPF 2026](https://info.monactiviteformation.emploi.gouv.fr/actualit%C3%A9s/campagne-bpf-2025/), [service fait](https://of.moncompteformation.gouv.fr/espace-public/aide/comment-declarer-la-sortie-de-formation-et-le-service-fait), [FAQ Atlas](https://www.opco-atlas.fr/faq/reforme-de-la-tva.html), [impots.gouv.fr, facturation électronique](https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique), [évolutions de l'API Digiforma](https://help.digiforma.com/fr/articles/8683705-api-interconnexions-les-evolutions-au-fil-du-temps), [webhooks Dendreo](https://doc.dendreo.com/article/545-presentation-webhooks), [e-mails Dendreo](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails), [options Digiforma](https://help.digiforma.com/fr/articles/6231904-decouvrez-les-fonctionnalites-disponibles-en-supplement-de-vos-abonnements).*
