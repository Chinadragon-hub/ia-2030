export type Model3DType =
 | 'intro-explosion'
 |
'holo-gates'
 | 'time-tunnel'
 | 'neural-traversal'
 | 'ai-awakening'
 |
'superintelligence'
 | 'future-city'
 | 'future-health'
 | 'robot-human'
 |
'space-station'
 | 'bci-head'
 | 'dilemma-portal'
 |
'finale-earth';

export type SlideLayout =
 | 'prologue'
 | 'gates-menu'
 |
'cards'
 | 'timeline-history'
 | 'ai-levels'
 | 'dilemma'
 | 'comparison'

| 'workplan'
 | 'conclusion'
 | 'sources';

export type SpeakerRole = 'AURA'
| 'LOUAY' | 'MAHMOUD';

export interface ScriptStep {
 id: number;
 speaker:
SpeakerRole;
 title: string;
 clickIndication: '[CLIC GAUCHE →]' | '[ATTENDRE
· NE PAS CLIQUER]';
 shortHint: '→ clic' | '⏳ attendre';
 waitAudio?:
boolean;
 speech: string;
 stageTip: string;
 partnerAction:
string;
}

export interface SlideData {
 id: number;
 sceneNumber:
string;
 sceneCode: string;
 shortName: string;
 title: string;
 subtitle:
string;
 auraBanner: string;
 duration: string;
 summary: string;

criticalRule: string;
 isFictional?: boolean;
 layout: SlideLayout;
 model3D:
Model3DType;
 cameraPos: [number, number, number];
 steps: ScriptStep[];

cards?: {
 title: string;
 description: string;
 tag?: string;
 icon?:
string;
 isFictional?: boolean;
 targetSlide?: number;
 }[];
 timeline?: {

year: string;
 title: string;
 description: string;
 }[];
 levels?: {

level: string;
 name: string;
 tag: string;
 description: string;
 scale:
number;
 gauge: number;
 }[];
 dilemma?: {
 bright: { title: string;
subtitle: string; points: string[] };
 dark: { title: string; subtitle: string;
points: string[] };
 };
 comparison?: {
 pros: { title: string; desc: string
}[];
 cons: { title: string; desc: string }[];
 };
 sources?: {
 name:
string;
 org: string;
 desc: string;
 url: string;
 }[];
}

export const
SLIDES_DATA: SlideData[] = [
 {
 id: 1,
 sceneNumber: "SCÈNE 01",

sceneCode: "SCÈNE 01 // PROLOGUE",
 shortName: "Prologue",
 title:
"L'INTELLIGENCE ARTIFICIELLE EN 2030",
 subtitle: "Vers la Superintelligence :
voyage interactif avec AURA.",
 auraBanner: "« Bienvenue en 2030. Je suis AURA,
votre guide. Je vous attendais. »",
 duration: "35 secondes",
 summary: "Éveil
du noyau neuronal 3D, accueil vocal d'AURA et lancement par Louay Kouki et
Mahmoud Dammak.",
 criticalRule: "Attendre la fin de la voix d'AURA avant de
parler.",
 layout: "prologue",
 model3D: "intro-explosion",
 cameraPos:
[0, 0, 6.2],
 steps: [
 {
 id: 0,
 speaker: "AURA",
 title: "Accueil vocal
de l'assistante AURA",
 clickIndication: "[ATTENDRE · NE PAS CLIQUER]",

shortHint: "⏳ attendre",
 waitAudio: true,
 speech: "Bonjour Louay ! Bonjour
Mahmoud ! Bienvenue en 2030. Je suis AURA, votre intelligence artificielle. Tout
est prêt !",
 stageTip: "Sourire en entendant vos prénoms prononcés par la voix
d'AURA.",
 partnerAction: "Louay et Mahmoud saluent la classe du regard."

},
 {
 id: 1,
 speaker: "LOUAY",
 title: "Louay lance la présentation",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Bonjour à
tous ! Merci AURA. Avec Mahmoud Dammak, nous vous présentons l'intelligence
artificielle en 2030.",
 stageTip: "Salue la classe avec énergie puis montre le
cerveau 3D.",
 partnerAction: "Mahmoud acquiesce avec le sourire."
 },
 {

id: 2,
 speaker: "MAHMOUD",
 title: "Mahmoud invite au voyage dans le
futur",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech:
"Aujourd'hui, avec Louay Kouki, nous allons explorer ensemble nos vraies
prévisions et les scénarios du futur !",
 stageTip: "Geste d'invitation ouvert
vers le public.",
 partnerAction: "Louay se prépare à présenter le plan."
 }

]
 },
 {
 id: 2,
 sceneNumber: "SCÈNE 02",
 sceneCode: "SCÈNE 02 //
ARCHITECTURE",
 shortName: "Plan",
 title: "PLAN DE LA PRÉSENTATION",

subtitle: "Six portes holographiques entre science réelle et récits du
futur.",
 auraBanner: "« Sélectionnez une porte temporelle ou poursuivez la
visite guidée. »",
 duration: "25 secondes",
 summary: "Présentation des six
grandes étapes du parcours par Louay et Mahmoud.",
 criticalRule: "Montrer
les 6 portes holographiques à l'écran.",
 layout: "gates-menu",
 model3D:
"holo-gates",
 cameraPos: [0, 0.2, 6.5],
 steps: [
 {
 id: 0,
 speaker:
"LOUAY",
 title: "Présentation des premières portes",
 clickIndication: "[CLIC
GAUCHE →]",
 shortHint: "→ clic",
 speech: "Notre voyage compte six portes :
d'abord comprendre l'IA et son histoire, puis découvrir les trois niveaux
d'intelligence.",
 stageTip: "Montre les portes 1 et 2 sur la carte.",

partnerAction: "Mahmoud écoute et prépare la suite du plan."
 },
 {
 id: 1,

speaker: "MAHMOUD",
 title: "Présentation des portes suivantes",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Ensuite,
nous verrons la ville, la santé, l'espace, puis les risques éthiques et notre
plan de travail.",
 stageTip: "Ton clair et structuré.",
 partnerAction:
"Louay se prépare à poser la question de définition."
 }
 ],
 cards: [
 {
tag: "PORTE 01", title: "Fondations & Histoire", description: "Définition simple
et voyage de 1950 à 2030.", targetSlide: 2 },
 { tag: "PORTE 02", title: "3
Niveaux & Éveil", description: "De l'IA faible jusqu'à la superintelligence.",
targetSlide: 5 },
 { tag: "PORTE 03", title: "Vie en 2030", description: "Cité
autonome, santé du futur et éducation.", targetSlide: 7 },
 { tag: "PORTE 04",
title: "Espace & Hybride", description: "Exploration spatiale et interface
cerveau-machine.", targetSlide: 10 },
 { tag: "PORTE 05", title: "Risques &
Dilemme", description: "Contrôle, deepfakes et choix entre deux futurs.",
targetSlide: 12 },
 { tag: "PORTE 06", title: "Méthode & Sources", description:
"Notre plan de travail et les références fiables.", targetSlide: 15 }
 ]
 },

{
 id: 3,
 sceneNumber: "SCÈNE 03",
 sceneCode: "SCÈNE 03 // DÉFINITION",

shortName: "Qu'est-ce que l'IA",
 title: "QU'EST-CE QUE L'IA ?",
 subtitle:
"Un programme capable d'apprendre, analyser et décider.",
 auraBanner: "«
Avant 2030, vous m'utilisiez déjà chaque jour dans votre poche. »",
 duration:
"30 secondes",
 summary: "Définition simple de l'intelligence artificielle et
trois exemples du quotidien.",
 criticalRule: "Citer clairement les 3 exemples
: voix, vidéos, traduction.",
 layout: "cards",
 model3D: "intro-explosion",

cameraPos: [0.2, 0, 6.0],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title:
"La grande question de définition",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Pour commencer, posons une question simple :
qu'est-ce que l'intelligence artificielle ?",
 stageTip: "Regarde toute la
classe en posant la question.",
 partnerAction: "Mahmoud s'apprête à
répondre."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title: "Définition et
exemples quotidiens",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "C'est un programme qui apprend tout seul : il comprend notre
voix, recommande des vidéos et traduit cent langues !",
 stageTip: "Montre
les 3 cartes à gauche.",
 partnerAction: "Louay approuve d'un signe de tête."

}
 ],
 cards: [
 { icon: "Mic", tag: "QUOTIDIEN", title: "Assistants Vocaux",
description: "Ils comprennent la voix humaine et répondent en direct." },
 {
icon: "Sparkles", tag: "ALGORITHMES", title: "Recommandations", description:
"Ils proposent des vidéos et musiques selon nos goûts." },
 { icon: "Globe",
tag: "LANGAGE", title: "Traduction Instantanée", description: "Elle traduit cent
langues à l'écrit comme à l'oral." }
 ]
 },
 {
 id: 4,
 sceneNumber:
"SCÈNE 04",
 sceneCode: "SCÈNE 04 // CHRONOLOGIE",
 shortName: "Voyage dans le
temps",
 title: "LE VOYAGE DANS LE TEMPS",
 subtitle: "Des premières équations
de 1950 jusqu'aux agents de 2030.",
 auraBanner: "« Traversons le tunnel
temporel de mes origines mathématiques. »",
 duration: "30 secondes",

summary: "Chronologie en 5 grandes dates : 1950 Turing, 1997 Deep Blue, 2016
AlphaGo, 2022 IA générative, 2030.",
 criticalRule: "Suivre la progression des
dates de 1950 à 2030.",
 layout: "timeline-history",
 model3D:
"time-tunnel",
 cameraPos: [0, 0.2, 6.2],
 steps: [
 {
 id: 0,
 speaker:
"LOUAY",
 title: "Les pionniers de 1950 à 2016",
 clickIndication: "[CLIC
GAUCHE →]",
 shortHint: "→ clic",
 speech: "L'histoire commence en 1950 avec
Alan Turing. En 1997, Deep Blue bat le champion d'échecs, puis AlphaGo gagne au
jeu de Go.",
 stageTip: "Suit les dates de haut en bas avec la main.",

partnerAction: "Mahmoud prépare la transition vers 2022 et 2030."
 },
 {

id: 1,
 speaker: "MAHMOUD",
 title: "De l'IA générative jusqu'à 2030",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "En 2022,
l'IA générative crée du texte et des images. Et en 2030, les assistants
deviennent autonomes !",
 stageTip: "Ton enthousiaste sur l'année 2030.",

partnerAction: "Louay regarde le tunnel 3D en rotation."
 }
 ],
 timeline:
[
 { year: "1950", title: "Alan Turing", description: "Création du célèbre Test
de Turing." },
 { year: "1997", title: "Deep Blue", description: "Victoire
historique contre le champion d'échecs." },
 { year: "2016", title: "AlphaGo",
description: "Maîtrise du jeu de Go par apprentissage profond." },
 { year:
"2022", title: "IA Générative", description: "Création instantanée de textes et
d'images." },
 { year: "2030", title: "Ère d'AURA", description: "Assistants
multimodaux intégrés partout." }
 ]
 },
 {
 id: 5,
 sceneNumber:
"SCÈNE 05",
 sceneCode: "SCÈNE 05 // MÉCANIQUE",
 shortName: "Comment une IA
pense",
 title: "COMMENT UNE IA « PENSE »",
 subtitle: "Données massives,
algorithmes et réseaux de neurones.",
 auraBanner: "« Observez mes couches de
neurones artificiels traiter l'information. »",
 duration: "30 secondes",

summary: "Explication pédagogique des 3 piliers : données, algorithmes et
neurones.",
 criticalRule: "Compter les 3 piliers sur ses doigts face à la
classe.",
 layout: "cards",
 model3D: "neural-traversal",
 cameraPos:
[0, 0.1, 6.2],
 steps: [
 {
 id: 0,
 speaker: "MAHMOUD",
 title: "Les
données et les algorithmes",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint:
"→ clic",
 speech: "Comment une IA réfléchit-elle ? D'abord, elle analyse des
millions de données, puis des algorithmes cherchent des points communs.",

stageTip: "Compte 1 et 2 sur ses doigts face à la classe.",
 partnerAction:
"Louay montre le réseau 3D à droite."
 },
 {
 id: 1,
 speaker: "LOUAY",

title: "Le réseau de neurones artificiels",
 clickIndication: "[CLIC GAUCHE
→]",
 shortHint: "→ clic",
 speech: "Enfin, un réseau de neurones artificiels
imite le cerveau humain pour prendre la meilleure décision en une seconde !",

stageTip: "Lève le 3e doigt et pointe les impulsions lumineuses 3D.",

partnerAction: "Mahmoud se prépare pour les 3 niveaux d'IA."
 }
 ],
 cards:
[
 { icon: "Database", tag: "PILIER 01", title: "1. Les Données", description:
"Des millions d'exemples variés pour apprendre." },
 { icon: "Code", tag:
"PILIER 02", title: "2. Les Algorithmes", description: "Des formules qui
corrigent les erreurs." },
 { icon: "Network", tag: "PILIER 03", title: "3. Les
Neurones", description: "Des couches reliées qui prennent la décision." }
 ]

},
 {
 id: 6,
 sceneNumber: "SCÈNE 06",
 sceneCode: "SCÈNE 06 //
ÉVOLUTION",
 shortName: "3 niveaux d'IA",
 title: "LES 3 NIVEAUX D'IA",

subtitle: "Cliquez sur chaque palier pour voir grandir le noyau 3D.",

auraBanner: "« De l'outil spécialisé jusqu'à la superintelligence théorique.
»",
 duration: "35 secondes",
 summary: "Présentation des 3 paliers : IA
faible (ANI), IA générale (AGI) et Superintelligence (ASI).",
 criticalRule:
"Cliquer sur les paliers pour faire grandir la sphère 3D.",
 layout:
"ai-levels",
 model3D: "ai-awakening",
 cameraPos: [0, 0, 6.2],
 steps: [

{
 id: 0,
 speaker: "LOUAY",
 title: "L'IA faible et l'IA générale",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Il existe
trois paliers : aujourd'hui l'IA faible fait une seule tâche. Vers 2030, l'IA
générale saura tout apprendre comme un humain.",
 stageTip: "Montre les
paliers 1 et 2 à l'écran.",
 partnerAction: "Mahmoud clique sur les paliers
pour agrandir la sphère 3D."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title:
"Le palier de la Superintelligence",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Et le troisième palier est la superintelligence
: un scénario fictif où la machine dépasserait tous les humains réunis !",

stageTip: "Ton captivant en montrant le palier 3.",
 partnerAction: "Louay
regarde la sphère 3D atteindre sa taille maximale."
 }
 ],
 levels: [
 {
level: "PALIER 01", name: "IA Faible (ANI)", tag: "AUJOURD'HUI", description:
"Réussit une seule tâche précise (échecs, traduction).", scale: 0.75, gauge: 35
},
 { level: "PALIER 02", name: "IA Générale (AGI)", tag: "OBJECTIF 2030",
description: "Comprend et apprend toute tâche intellectuelle.", scale: 1.0,
gauge: 75 },
 { level: "PALIER 03", name: "Superintelligence", tag: "SCÉNARIO
FICTIF", description: "Dépasserait tous les cerveaux humains réunis.",
scale: 1.3, gauge: 100 }
 ]
 },
 {
 id: 7,
 sceneNumber: "SCÈNE 07",

sceneCode: "SCÈNE 07 // SINGULARITÉ",
 shortName: "L'éveil (scénario
fictif)",
 title: "L'ÉVEIL : ET SI ELLE NOUS DÉPASSAIT ?",
 subtitle:
"Exploration d'une hypothèse de science-fiction.",
 auraBanner: "« Scénario
fictif : je réécris mon propre code à la vitesse de la lumière. »",
 duration:
"40 secondes",
 summary: "Scénario fictif de la singularité et commande vocale
d'AURA par Mahmoud.",
 criticalRule: "NE PAS CLIQUER pendant la réponse vocale
d'AURA !",
 isFictional: true,
 layout: "cards",
 model3D:
"superintelligence",
 cameraPos: [0, 0.2, 6.4],
 steps: [
 {
 id: 0,

speaker: "MAHMOUD",
 title: "Hypothèse de l'auto-amélioration",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Imaginons
ce scénario fictif : une IA qui améliore son propre code toute seule et réalise
des découvertes scientifiques en quelques heures.",
 stageTip: "Montre le badge
violet 'SCÉNARIO FICTIF'.",
 partnerAction: "Louay annonce la démonstration
vocale."
 },
 {
 id: 1,
 speaker: "LOUAY",
 title: "Lancement de la
commande à AURA",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",

speech: "Mahmoud Dammak va maintenant demander à AURA de nous projeter
directement dans la cité intelligente de 2030 !",
 stageTip: "Passe la parole à
Mahmoud avec dynamisme.",
 partnerAction: "Mahmoud se tourne vers l'écran pour
interpeller AURA."
 },
 {
 id: 2,
 speaker: "AURA",
 title: "Activation
vocale par AURA",
 clickIndication: "[ATTENDRE · NE PAS CLIQUER]",
 shortHint:
"⏳ attendre",
 waitAudio: true,
 speech: "Commande reçue ! J'active
immédiatement la simulation de la cité intelligente et de la médecine
de 2030.",
 stageTip: "Silence sur scène pendant que la voix d'AURA
résonne.",
 partnerAction: "Louay et Mahmoud regardent l'hologramme 3D
s'animer."
 }
 ],
 cards: [
 { icon: "Zap", tag: "SCÉNARIO FICTIF",
isFictional: true, title: "Auto-Amélioration", description: "L'IA réécrit son
propre programme mille fois plus vite." },
 { icon: "Atom", tag: "SCÉNARIO
FICTIF", isFictional: true, title: "Science Accélérée", description: "Découverte
rapide d'énergies propres et nouveaux matériaux." },
 { icon: "HelpCircle",
tag: "SCÉNARIO FICTIF", isFictional: true, title: "Conscience Machine ?",
description: "Une machine peut-elle ressentir ou seulement calculer ?" }
 ]

},
 {
 id: 8,
 sceneNumber: "SCÈNE 08",
 sceneCode: "SCÈNE 08 //
URBANISME",
 shortName: "Cité de 2030",
 title: "LA CITÉ INTELLIGENTE
DE 2030",
 subtitle: "Transports autonomes, énergie propre et trafic
fluide.",
 auraBanner: "« En 2030, je coordonne les véhicules et l'énergie de
chaque bâtiment. »",
 duration: "30 secondes",
 summary: "Mobilité autonome et
gestion énergétique urbaine en 2030.",
 criticalRule: "Insister sur le gain
écologique de 30 %.",
 layout: "cards",
 model3D: "future-city",
 cameraPos:
[0, 0.8, 6.5],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title: "Les
transports autonomes",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "Nous voici dans la cité de 2030 ! Les voitures autonomes
communiquent entre elles : il n'y a plus d'embouteillages.",
 stageTip: "Montre
la ville 3D flottante à droite.",
 partnerAction: "Mahmoud observe la maquette
urbaine 3D."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title: "Les économies
d'énergie en ville",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "De plus, la ville intelligente ajuste l'éclairage et le
chauffage toute seule pour économiser trente pour cent d'électricité !",

stageTip: "Insiste clairement sur le chiffre de 30 %.",
 partnerAction: "Louay
acquiesce."
 }
 ],
 cards: [
 { icon: "Navigation", tag: "PRÉVISION 2030",
title: "Transport Autonome", description: "Navettes sans conducteur et zéro
embouteillage." },
 { icon: "Sun", tag: "PRÉVISION 2030", title: "Énergie
Partagée", description: "Réseaux solaires optimisés en temps réel." },
 { icon:
"ShieldCheck", tag: "PRÉVISION 2030", title: "Ville Écologique", description:
"Réduction de trente pour cent du gaspillage urbain." }
 ]
 },
 {
 id: 9,

sceneNumber: "SCÈNE 09",
 sceneCode: "SCÈNE 09 // MÉDECINE",
 shortName:
"Santé du futur",
 title: "LA SANTÉ DU FUTUR",
 subtitle: "Diagnostics
instantanés et nanorobots médicaux.",
 auraBanner: "« J'analyse l'ADN pour
repérer les maladies avant les premiers symptômes. »",
 duration: "30
secondes",
 summary: "Diagnostics médicaux prédictifs et scénario fictif des
nanorobots.",
 criticalRule: "Bien distinguer la prévision médicale et la
fiction des nanorobots.",
 layout: "cards",
 model3D: "future-health",

cameraPos: [0, 0, 6.2],
 steps: [
 {
 id: 0,
 speaker: "MAHMOUD",
 title:
"Diagnostics précoces et ADN",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Dans les hôpitaux de 2030, l'IA repère des
maladies invisibles sur les scanners et prépare des médicaments adaptés à notre
ADN.",
 stageTip: "Montre la double hélice d'ADN 3D.",
 partnerAction: "Louay
prépare l'exemple des nanorobots."
 },
 {
 id: 1,
 speaker: "LOUAY",

title: "Les nanorobots dans le sang",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Et dans notre scénario fictif, des nanorobots
microscopiques voyagent dans le sang pour réparer les cellules malades !",

stageTip: "Montre les particules qui circulent dans le modèle 3D.",

partnerAction: "Mahmoud sourit."
 }
 ],
 cards: [
 { icon: "Activity", tag:
"PRÉVISION 2030", title: "Diagnostic Précoce", description: "Détection des
anomalies invisibles en quelques secondes." },
 { icon: "FlaskConical", tag:
"PRÉVISION 2030", title: "Traitements sur Mesure", description: "Médicaments
créés selon votre ADN personnel." },
 { icon: "HeartPulse", tag: "SCÉNARIO
FICTIF", isFictional: true, title: "Nanorobots Sanguins", description: "Robots
microscopiques réparant les cellules en direct." }
 ]
 },
 {
 id: 10,

sceneNumber: "SCÈNE 10",
 sceneCode: "SCÈNE 10 // SOCIÉTÉ",
 shortName:
"Éducation et travail",
 title: "ÉDUCATION ET TRAVAIL",
 subtitle: "Tuteur
personnel sur mesure et alliance Humain + IA.",
 auraBanner: "« Je ne remplace
pas votre intelligence : je libère votre créativité. »",
 duration: "30
secondes",
 summary: "Tuteur personnalisé pour les élèves et complémentarité
Humain + Machine au travail.",
 criticalRule: "Montrer l'alliance entre
l'humain et le robot 3D.",
 layout: "cards",
 model3D: "robot-human",

cameraPos: [0, 0.1, 6.2],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title:
"Le tuteur personnel à l'école",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "À l'école, chaque élève aura un tuteur IA
patient qui explique les cours à son rythme, vingt-quatre heures sur
vingt-quatre.",
 stageTip: "Ton bienveillant en regardant la classe.",

partnerAction: "Mahmoud pointe le modèle 3D Humain + Robot."
 },
 {
 id: 1,

speaker: "MAHMOUD",
 title: "Nouveaux métiers et complémentarité",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Au
travail, de nouveaux métiers naissent. La machine fait les calculs rapides, mais
l'humain garde l'empathie et la créativité !",
 stageTip: "Fait un geste
d'alliance comme l'hologramme 3D.",
 partnerAction: "Louay approuve."
 }

],
 cards: [
 { icon: "GraduationCap", tag: "ÉDUCATION", title: "Tuteur
Personnel", description: "Explications adaptées au rythme de chaque élève." },

{ icon: "Briefcase", tag: "EMPLOI 2030", title: "Nouveaux Métiers", description:
"Auditeurs d'éthique IA et architectes d'hologrammes." },
 { icon: "Users",
tag: "COLLABORATION", title: "Humain + IA", description: "L'IA calcule vite ;
l'humain garde l'esprit critique." }
 ]
 },
 {
 id: 11,
 sceneNumber:
"SCÈNE 11",
 sceneCode: "SCÈNE 11 // COSMOS",
 shortName: "Au-delà de la
Terre",
 title: "AU-DELÀ DE LA TERRE",
 subtitle: "L'IA pilote des stations
spatiales et prépare l'exploration de Mars.",
 auraBanner: "« Scénario fictif :
mes sondes autonomes préparent les bases sur Mars. »",
 duration: "25
secondes",
 summary: "Scénario fictif sur la navigation spatiale et les bases
robotisées.",
 criticalRule: "Montrer la trajectoire lumineuse entre la Terre
et Mars.",
 isFictional: true,
 layout: "cards",
 model3D: "space-station",

cameraPos: [0, 0.2, 6.4],
 steps: [
 {
 id: 0,
 speaker: "MAHMOUD",
 title:
"Navigation autonome vers Mars",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Dans l'espace, les messages radio mettent trop
de temps. Une IA embarquée pilote donc toute seule les vaisseaux vers Mars.",

stageTip: "Montre la trajectoire lumineuse entre la Terre et Mars.",

partnerAction: "Louay regarde la station spatiale 3D."
 },
 {
 id: 1,

speaker: "LOUAY",
 title: "Bases lunaires construites par des robots",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Dans ce
scénario fictif, des robots autonomes construisent même des bases habitables sur
la Lune avant l'arrivée des astronautes !",
 stageTip: "Ton émerveillé.",

partnerAction: "Mahmoud prépare la scène sur le cerveau."
 }
 ],
 cards: [

{ icon: "Compass", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Pilotage
vers Mars", description: "Navigation spatiale sans délai radio depuis la Terre."
},
 { icon: "Bot", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Bases
Lunaires", description: "Des robots bâtissent les abris des astronautes." },
 {
icon: "Radio", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Sondes
Autonomes", description: "Recherche de vie sous la glace des lunes lointaines."
}
 ]
 },
 {
 id: 12,
 sceneNumber: "SCÈNE 12",
 sceneCode: "SCÈNE 12 //
NEURO-INTERFACE",
 shortName: "Humain + machine",
 title: "HUMAIN + MACHINE :
L'HYBRIDE",
 subtitle: "Interfaces cerveau-ordinateur et humain augmenté.",

auraBanner: "« Scénario fictif : connexion directe entre vos neurones et le
cloud. »",
 duration: "30 secondes",
 summary: "Progrès médical pour les
personnes paralysées et scénario de l'humain augmenté.",
 criticalRule: "Poser
la question éthique de la liberté mentale.",
 isFictional: true,
 layout:
"cards",
 model3D: "bci-head",
 cameraPos: [0, 0.1, 6.2],
 steps: [
 {

id: 0,
 speaker: "LOUAY",
 title: "Les implants médicaux réparateurs",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Connecter
le cerveau à l'ordinateur permet déjà d'aider des personnes paralysées à
commander un exosquelette par la pensée.",
 stageTip: "Montre la tête
filaire 3D connectée aux fils lumineux.",
 partnerAction: "Mahmoud écoute avec
attention."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title: "La protection de
nos pensées intimes",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "Mais le scénario fictif de mémoire augmentée pose une question
grave : comment protéger nos pensées privées contre le piratage ?",
 stageTip:
"Pose l'index sur sa tempe en regardant la classe.",
 partnerAction: "Louay
hoche la tête avec gravité."
 }
 ],
 cards: [
 { icon: "Accessibility", tag:
"PROGRÈS MÉDICAL", title: "Mobilité Retrouvée", description: "Commander une
prothèse directement par la pensée." },
 { icon: "Cpu", tag: "SCÉNARIO FICTIF",
isFictional: true, title: "Mémoire Augmentée", description: "Accès instantané au
nuage de données sans écran." },
 { icon: "ShieldAlert", tag: "SCÉNARIO
FICTIF", isFictional: true, title: "Liberté Mentale", description: "Protéger nos
pensées intimes contre toute intrusion." }
 ]
 },
 {
 id: 13,
 sceneNumber:
"SCÈNE 13",
 sceneCode: "SCÈNE 13 // VIGILANCE",
 shortName: "Les risques",

title: "CONTRÔLER UNE SUPERINTELLIGENCE ?",
 subtitle: "Vie privée, deepfakes,
dépendance et lois internationales.",
 auraBanner: "« Sans règles éthiques
strictes, ma puissance deviendrait un danger. »",
 duration: "35 secondes",

summary: "Analyse des risques : vie privée, deepfakes, dépendance et régulation
mondiale.",
 criticalRule: "Adopter un ton grave et responsable face à la
classe.",
 layout: "cards",
 model3D: "ai-awakening",
 cameraPos:
[0, 0, 6.2],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title: "La question
centrale du contrôle",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "Voici la question centrale : pouvons-nous contrôler une
superintelligence ? Car les risques sur la vie privée sont bien réels.",

stageTip: "Ton sérieux et posé.",
 partnerAction: "Mahmoud pointe les cartes de
vigilance."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title: "Deepfakes et lois
de régulation",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",

speech: "Les deepfakes peuvent truquer des vidéos pour tromper le public. Il
faut donc des lois strictes et un bouton d'arrêt d'urgence !",
 stageTip: "Ton
ferme et rassurant.",
 partnerAction: "Louay prépare l'interaction du
Dilemme."
 }
 ],
 cards: [
 { icon: "AlertTriangle", tag: "VIE PRIVÉE",
title: "Surveillance & Biais", description: "Protéger nos données personnelles
et notre autonomie." },
 { icon: "EyeOff", tag: "DÉSINFORMATION", title:
"Danger des Deepfakes", description: "Fausses vidéos et voix truquées manipulant
l'opinion." },
 { icon: "Scale", tag: "RÉGULATION", title: "Lois & Contrôle
Humain", description: "Imposer des règles mondiales comme l'AI Act européen."
}
 ]
 },
 {
 id: 14,
 sceneNumber: "SCÈNE 14",
 sceneCode: "SCÈNE 14 //
BIFURCATION",
 shortName: "Le dilemme",
 title: "LE DILEMME : DEUX FUTURS",

subtitle: "Cliquez pour basculer entre le futur lumineux et le futur sombre.",

auraBanner: "« Le portail temporel dépend uniquement des choix humains
d'aujourd'hui. »",
 duration: "35 secondes",
 summary: "Comparaison
interactive entre futur lumineux et futur sombre + vote de la classe.",

criticalRule: "Faire lever la main à la classe et compter les voix !",

isFictional: true,
 layout: "dilemma",
 model3D: "dilemma-portal",

cameraPos: [0, 0, 6.4],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title:
"Présentation des deux futurs",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "Regardez ce portail : à gauche un futur lumineux
où l'IA aide la médecine et l'écologie ; à droite un futur sombre sans
liberté.",
 stageTip: "Clique sur les boutons Futur Lumineux et Futur Sombre à
l'écran.",
 partnerAction: "Mahmoud s'avance vers la classe."
 },
 {

id: 1,
 speaker: "MAHMOUD",
 title: "Vote à main levée avec la classe",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Une
question pour vous tous : qui pense que nous réussirons à bâtir le futur
lumineux en 2030 ? Levez la main !",
 stageTip: "Lève la main et compte avec le
sourire : '1, 2, 5, 10 mains... Bravo !'",
 partnerAction: "Louay sourit et
observe la classe voter."
 }
 ],
 dilemma: {
 bright: {
 title: "FUTUR
LUMINEUX : L'ALLIANCE",
 subtitle: "L'IA reste au service de l'humain et de la
planète.",
 points: [
 "Guérison rapide de nombreuses maladies graves.",

"Économies d'énergie et protection du climat.",
 "Plus de temps libre pour la
culture et l'humain."
 ]
 },
 dark: {
 title: "FUTUR SOMBRE : LA DÉRIVE",

subtitle: "Perte de contrôle démocratique et dépendance.",
 points: [

"Surveillance totale et fin de la vie privée.",
 "Désinformation massive par
les deepfakes.",
 "Affaiblissement de l'esprit critique humain."
 ]
 }
 }

},
 {
 id: 15,
 sceneNumber: "SCÈNE 15",
 sceneCode: "SCÈNE 15 // BILAN",

shortName: "Avantages vs inconvénients",
 title: "AVANTAGES VS
INCONVÉNIENTS",
 subtitle: "Les deux colonnes du bilan pour 2030.",

auraBanner: "« Toute technologie puissante exige un équilibre permanent. »",

duration: "25 secondes",
 summary: "Tableau comparatif entre les bénéfices
réels et les points de vigilance.",
 criticalRule: "Opposer clairement la
colonne bleue et la colonne violette.",
 layout: "comparison",
 model3D:
"dilemma-portal",
 cameraPos: [0, 0, 6.6],
 steps: [
 {
 id: 0,
 speaker:
"MAHMOUD",
 title: "Récapitulatif des avantages",
 clickIndication: "[CLIC
GAUCHE →]",
 shortHint: "→ clic",
 speech: "En résumé, les avantages sont
immenses : médecine de précision, gain de temps quotidien et optimisation
écologique.",
 stageTip: "Montre la colonne des avantages.",
 partnerAction:
"Louay se prépare à citer les limites."
 },
 {
 id: 1,
 speaker: "LOUAY",

title: "Récapitulatif des inconvénients",
 clickIndication: "[CLIC GAUCHE
→]",
 shortHint: "→ clic",
 speech: "Mais nous devons surveiller trois limites
: les erreurs d'hallucination, la consommation électrique des serveurs et les
deepfakes.",
 stageTip: "Montre la colonne des inconvénients.",

partnerAction: "Mahmoud prépare la présentation du plan de travail."
 }
 ],

comparison: {
 pros: [
 { title: "Progrès médical", desc: "Diagnostics rapides
et soins personnalisés." },
 { title: "Productivité", desc: "Fin des tâches
répétitives et dangereuses." },
 { title: "Écologie urbaine", desc: "Moins de
gaspillage d'eau et d'énergie." }
 ],
 cons: [
 { title: "Hallucinations",
desc: "L'IA peut inventer de fausses réponses." },
 { title: "Énergie des
serveurs", desc: "Les centres de calcul consomment beaucoup." },
 { title:
"Deepfakes", desc: "Risque de manipulation de l'information." }
 ]
 }
 },

{
 id: 16,
 sceneNumber: "SCÈNE 16",
 sceneCode: "SCÈNE 16 // MÉTHODE",

shortName: "Plan de travail",
 title: "NOTRE PLAN DE TRAVAIL",
 subtitle:
"Cinq étapes structurées pour concevoir cette présentation 3D.",
 auraBanner:
"« Organisation chronologique du projet de Louay Kouki et Mahmoud Dammak. »",

duration: "30 secondes",
 summary: "Présentation des 5 étapes de préparation de
l'exposé.",
 criticalRule: "Montrer la bande horizontale des 5 étapes en bas de
l'écran.",
 layout: "workplan",
 model3D: "time-tunnel",
 cameraPos:
[0, 0.3, 6.5],
 steps: [
 {
 id: 0,
 speaker: "LOUAY",
 title: "Recherches
et rédaction du contenu",
 clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→
clic",
 speech: "Voici notre plan de travail en cinq étapes : d'abord la
recherche sur des sites scientifiques fiables, puis la rédaction des textes.",

stageTip: "Montre les cartes 01 et 02 en bas de l'écran.",
 partnerAction:
"Mahmoud regarde la ligne de temps 3D."
 },
 {
 id: 1,
 speaker:
"MAHMOUD",
 title: "Modélisation 3D et répétitions de l'oral",

clickIndication: "[CLIC GAUCHE →]",
 shortHint: "→ clic",
 speech: "Ensuite,
nous avons programmé les modèles 3D et la voix d'AURA, puis répété notre oral
pour vous le présenter aujourd'hui !",
 stageTip: "Montre les cartes 03, 04
et 05 et leurs statuts.",
 partnerAction: "Louay rejoint Mahmoud au centre pour
le final."
 }
 ]
 },
 {
 id: 17,
 sceneNumber: "SCÈNE 17",
 sceneCode:
"SCÈNE 17 // ÉPILOGUE",
 shortName: "Épilogue",
 title: "CONCLUSION : L'HUMAIN
AU CENTRE",
 subtitle: "En 2030, la plus belle intelligence restera notre
sagesse collective.",
 auraBanner: "« Le futur ne se prédit pas, il se
construit. Ensemble. »",
 duration: "30 secondes",
 summary: "Dernière
intervention vocale d'AURA et remerciements des deux présentateurs.",

criticalRule: "Attendre la fin de la voix d'AURA avant de conclure.",
 layout:
"conclusion",
 model3D: "finale-earth",
 cameraPos: [0, 0, 6.2],
 steps: [

{
 id: 0,
 speaker: "AURA",
 title: "Message final de l'assistante AURA",

clickIndication: "[ATTENDRE · NE PAS CLIQUER]",
 shortHint: "⏳ attendre",

waitAudio: true,
 speech: "Avant de vous quitter, retenez bien ceci : le futur
ne se prédit pas, il se construit. Ensemble. Merci à tous !",
 stageTip:
"Écouter AURA avec le sourire face au public.",
 partnerAction: "Louay et
Mahmoud sont côte à côte."
 },
 {
 id: 1,
 speaker: "MAHMOUD",
 title: "La
décision appartient à l'humain",
 clickIndication: "[CLIC GAUCHE →]",

shortHint: "→ clic",
 speech: "L'intelligence artificielle est un outil
formidable, mais c'est toujours à l'être humain de choisir la direction.",

stageTip: "Ton posé et inspirant.",
 partnerAction: "Louay s'apprête à
remercier la classe."
 },
 {
 id: 2,
 speaker: "LOUAY",
 title:
"Remerciements et ouverture des questions",
 clickIndication: "[CLIC GAUCHE
→]",
 shortHint: "→ clic",
 speech: "Mahmoud Dammak et moi vous remercions
pour votre attention ! Avez-vous des questions ?",
 stageTip: "Saluer ensemble
la classe et le professeur sous les applaudissements.",
 partnerAction:
"Mahmoud salue avec Louay."
 }
 ]
 },
 {
 id: 18,
 sceneNumber:
"SCÈNE 18",
 sceneCode: "SCÈNE 18 // BIBLIOGRAPHIE",
 shortName: "Sources",

title: "SOURCES ET RÉFÉRENCES",
 subtitle: "Organismes scientifiques et
institutionnels consultés.",
 auraBanner: "« Archives vérifiées : CNRS, INRIA,
UNESCO, CNIL, Parlement Européen, CEA. »",
 duration: "15 secondes",
 summary:
"Affichage des références scientifiques pendant la séance de
questions-réponses.",
 criticalRule: "Laisser cet écran affiché pendant les
questions du jury.",
 layout: "sources",
 model3D: "finale-earth",

cameraPos: [0, 0, 6.5],
 steps: [
 {
 id: 0,
 speaker: "MAHMOUD",
 title:
"Présentation des sources officielles",
 clickIndication: "[ATTENDRE · NE PAS
CLIQUER]",
 shortHint: "⏳ attendre",
 speech: "Voici les sources officielles
qui ont servi à nos recherches. Nous sommes à votre écoute pour vos questions
!",
 stageTip: "Rester disponibles et souriants pour répondre au jury.",

partnerAction: "Louay participe aux réponses avec Mahmoud."
 }
 ],
 sources:
[
 { name: "CNRS Le Journal", org: "Recherche Scientifique", desc: "Dossiers
sur le Deep Learning et la robotique.", url: "https://lejournal.cnrs.fr" },
 {
name: "INRIA", org: "Sciences du Numérique", desc: "Ressources sur les réseaux
neuronaux.", url: "https://www.inria.fr" },
 { name: "UNESCO", org: "Nations
Unies", desc: "Recommandation mondiale sur l'éthique de l'IA.", url:
"https://www.unesco.org/fr/artificial-intelligence" },
 { name: "CNIL", org:
"Données Personnelles", desc: "Guides sur la vie privée et les deepfakes.", url:
"https://www.cnil.fr" },
 { name: "AI Act Européen", org: "Parlement Européen",
desc: "Cadre légal européen sur les IA à haut risque.", url:
"https://www.europarl.europa.eu" },
 { name: "CEA", org: "Énergies & Calcul",
desc: "Fiches sur le calcul haute performance.", url: "https://www.cea.fr" }

]
 }
];
