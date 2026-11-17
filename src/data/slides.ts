export type Model3DType =
  | 'intro-explosion'
  | 'holo-gates'
  | 'time-tunnel'
  | 'neural-traversal'
  | 'ai-awakening'
  | 'superintelligence'
  | 'future-city'
  | 'future-health'
  | 'robot-human'
  | 'space-station'
  | 'bci-head'
  | 'dilemma-portal'
  | 'finale-earth';

export type SlideLayout =
  | 'prologue'
  | 'gates-menu'
  | 'cards'
  | 'timeline-history'
  | 'ai-levels'
  | 'dilemma'
  | 'comparison'
  | 'workplan'
  | 'conclusion'
  | 'sources';

export type SpeakerRole = 'AURA' | 'LOUAY' | 'MAHMOUD';

export interface ScriptStep {
  id: number;
  speaker: SpeakerRole;
  title: string;
  clickIndication: '[CLIC GAUCHE →]' | '[ATTENDRE · NE PAS CLIQUER]';
  shortHint: '→ clic' | '⏳ attendre';
  waitAudio?: boolean;
  speech: string;
  stageTip: string;
  partnerAction: string;
}

export interface SlideData {
  id: number;
  sceneNumber: string;
  sceneCode: string;
  shortName: string;
  title: string;
  subtitle: string;
  auraBanner: string;
  duration: string;
  summary: string;
  criticalRule: string;
  isFictional?: boolean;
  layout: SlideLayout;
  model3D: Model3DType;
  cameraPos: [number, number, number];
  steps: ScriptStep[];
  cards?: {
    title: string;
    description: string;
    tag?: string;
    icon?: string;
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
    scale: number;
    gauge: number;
  }[];
  dilemma?: {
    bright: { title: string; subtitle: string; points: string[] };
    dark: { title: string; subtitle: string; points: string[] };
  };
  comparison?: {
    pros: { title: string; desc: string }[];
    cons: { title: string; desc: string }[];
  };
  sources?: {
    name: string;
    org: string;
    desc: string;
    url: string;
  }[];
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    sceneNumber: "SCÈNE 01",
    sceneCode: "SCÈNE 01 // PROLOGUE",
    shortName: "Prologue",
    title: "L'INTELLIGENCE ARTIFICIELLE EN 2030",
    subtitle: "Vers la Superintelligence : voyage interactif avec AURA.",
    auraBanner: "« Bienvenue en 2030. Je suis AURA, votre guide. »",
    duration: "25 secondes",
    summary: "Éveil du cerveau 3D, accueil d'AURA et lancement par Louay et Mahmoud.",
    criticalRule: "Attendre la fin de la voix d'AURA avant de parler.",
    layout: "prologue",
    model3D: "intro-explosion",
    cameraPos: [0, 0, 6.2],
    steps: [
      {
        id: 0,
        speaker: "AURA",
        title: "Accueil vocal d'AURA",
        clickIndication: "[ATTENDRE · NE PAS CLIQUER]",
        shortHint: "⏳ attendre",
        waitAudio: true,
        speech: "Bonjour Louay ! Bonjour Mahmoud ! Bienvenue en 2030. Je suis AURA. Tout est prêt !",
        stageTip: "Sourire en écoutant AURA.",
        partnerAction: "Saluer la classe du regard."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Louay lance la présentation",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Bonjour à tous ! Merci AURA. Avec Mahmoud Dammak, nous vous présentons l'IA en 2030.",
        stageTip: "Saluer la classe avec dynamisme.",
        partnerAction: "Mahmoud acquiesce avec le sourire."
      },
      {
        id: 2,
        speaker: "MAHMOUD",
        title: "Mahmoud invite au voyage",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Aujourd'hui, avec Louay Kouki, découvrons nos vraies prévisions et les scénarios du futur !",
        stageTip: "Geste d'ouverture vers le public.",
        partnerAction: "Louay se prépare pour le plan."
      }
    ]
  },
  {
    id: 2,
    sceneNumber: "SCÈNE 02",
    sceneCode: "SCÈNE 02 // ARCHITECTURE",
    shortName: "Plan",
    title: "PLAN DE LA PRÉSENTATION",
    subtitle: "Six portes holographiques entre science réelle et récits du futur.",
    auraBanner: "« Six portes temporelles structurent notre parcours. »",
    duration: "20 secondes",
    summary: "Présentation rapide des 6 parties.",
    criticalRule: "Montrer les 6 portes holographiques.",
    layout: "gates-menu",
    model3D: "holo-gates",
    cameraPos: [0, 0.2, 6.5],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Premières portes du parcours",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Voici nos six étapes : d'abord comprendre l'IA et son histoire, puis ses trois niveaux.",
        stageTip: "Montrer les portes 1 et 2.",
        partnerAction: "Mahmoud prépare la suite."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Suite du parcours",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Ensuite, nous explorerons la ville de 2030, la santé, l'espace et les risques éthiques.",
        stageTip: "Ton clair et rythmé.",
        partnerAction: "Louay enchaîne sur la définition."
      }
    ],
    cards: [
      { tag: "PORTE 01", title: "Fondations & Histoire", description: "Définition simple et *voyage de 1950 à 2030*.", targetSlide: 2 },
      { tag: "PORTE 02", title: "3 Niveaux & Éveil", description: "De l'IA faible jusqu'à la *superintelligence*.", targetSlide: 5 },
      { tag: "PORTE 03", title: "Vie en 2030", description: "Cité autonome, *santé du futur* et éducation.", targetSlide: 7 },
      { tag: "PORTE 04", title: "Espace & Hybride", description: "Exploration spatiale et *interface cerveau-machine*.", targetSlide: 10 },
      { tag: "PORTE 05", title: "Risques & Dilemme", description: "Contrôle, *deepfakes* et choix entre deux futurs.", targetSlide: 12 },
      { tag: "PORTE 06", title: "Méthode & Sources", description: "Notre *plan de travail* et les références fiables.", targetSlide: 15 }
    ]
  },
  {
    id: 3,
    sceneNumber: "SCÈNE 03",
    sceneCode: "SCÈNE 03 // DÉFINITION",
    shortName: "Qu'est-ce que l'IA",
    title: "QU'EST-CE QUE L'IA ?",
    subtitle: "Un programme capable d'apprendre, analyser et décider.",
    auraBanner: "« Vous m'utilisez déjà chaque jour dans votre smartphone. »",
    duration: "20 secondes",
    summary: "Définition simple et 3 usages quotidiens.",
    criticalRule: "Citer voix, vidéos et traduction.",
    layout: "cards",
    model3D: "intro-explosion",
    cameraPos: [0.2, 0, 6.0],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "La question de départ",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Posons une question simple : qu'est-ce que l'intelligence artificielle ?",
        stageTip: "Fixer la classe.",
        partnerAction: "Mahmoud répond tout de suite."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Définition et exemples",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "C'est un programme capable d'apprendre : il comprend la voix, recommande des vidéos et traduit cent langues !",
        stageTip: "Montrer les 3 cartes.",
        partnerAction: "Louay approuve."
      }
    ],
    cards: [
      { icon: "Mic", tag: "QUOTIDIEN", title: "Assistants Vocaux", description: "Ils comprennent la *voix humaine* et répondent en direct." },
      { icon: "Sparkles", tag: "ALGORITHMES", title: "Recommandations", description: "Ils proposent des *vidéos et musiques* selon nos goûts." },
      { icon: "Globe", tag: "LANGAGE", title: "Traduction Instantanée", description: "Elle traduit *cent langues* à l'écrit comme à l'oral." }
    ]
  },
  {
    id: 4,
    sceneNumber: "SCÈNE 04",
    sceneCode: "SCÈNE 04 // CHRONOLOGIE",
    shortName: "Voyage dans le temps",
    title: "LE VOYAGE DANS LE TEMPS",
    subtitle: "Des premières équations de 1950 jusqu'aux agents de 2030.",
    auraBanner: "« Traversons le tunnel temporel de 1950 à 2030. »",
    duration: "20 secondes",
    summary: "5 dates clés de Turing à 2030.",
    criticalRule: "Suivre les dates de 1950 à 2030.",
    layout: "timeline-history",
    model3D: "time-tunnel",
    cameraPos: [0, 0.2, 6.2],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "De 1950 à 2016",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Tout naît en 1950 avec Turing. En 1997, Deep Blue gagne aux échecs, puis AlphaGo au jeu de Go.",
        stageTip: "Montrer la chronologie.",
        partnerAction: "Mahmoud enchaîne sur 2022 et 2030."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "De 2022 à 2030",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "En 2022, l'IA générative crée textes et images. En 2030, les agents deviennent autonomes !",
        stageTip: "Ton enthousiaste sur 2030.",
        partnerAction: "Louay pointe le tunnel 3D."
      }
    ],
    timeline: [
      { year: "1950", title: "Alan Turing", description: "Création du célèbre *Test de Turing*." },
      { year: "1997", title: "Deep Blue", description: "Victoire historique contre le *champion d'échecs*." },
      { year: "2016", title: "AlphaGo", description: "Maîtrise du *jeu de Go* par apprentissage profond." },
      { year: "2022", title: "IA Générative", description: "Création instantanée de *textes et d'images*." },
      { year: "2030", title: "Ère d'AURA", description: "Assistants *multimodaux* intégrés partout." }
    ]
  },
  {
    id: 5,
    sceneNumber: "SCÈNE 05",
    sceneCode: "SCÈNE 05 // MÉCANIQUE",
    shortName: "Comment une IA pense",
    title: "COMMENT UNE IA « PENSE »",
    subtitle: "Données massives, algorithmes et réseaux de neurones.",
    auraBanner: "« Trois étapes transforment les données en décisions. »",
    duration: "20 secondes",
    summary: "Données, algorithmes et réseaux de neurones.",
    criticalRule: "Compter les 3 piliers sur les doigts.",
    layout: "cards",
    model3D: "neural-traversal",
    cameraPos: [0, 0.1, 6.2],
    steps: [
      {
        id: 0,
        speaker: "MAHMOUD",
        title: "Données et algorithmes",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Comment réfléchit une IA ? D'abord des millions de données, puis des algorithmes qui corrigent les erreurs.",
        stageTip: "Compter 1 et 2 sur ses doigts.",
        partnerAction: "Louay montre le réseau 3D."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Réseaux de neurones",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Enfin, un réseau de neurones artificiels imite notre cerveau pour décider en une seconde !",
        stageTip: "Lever le 3e doigt.",
        partnerAction: "Mahmoud prépare les 3 paliers."
      }
    ],
    cards: [
      { icon: "Database", tag: "PILIER 01", title: "1. Les Données", description: "Des millions d'*exemples variés* pour apprendre." },
      { icon: "Code", tag: "PILIER 02", title: "2. Les Algorithmes", description: "Des formules qui *corrigent les erreurs*." },
      { icon: "Network", tag: "PILIER 03", title: "3. Les Neurones", description: "Des couches reliées qui *prennent la décision*." }
    ]
  },
  {
    id: 6,
    sceneNumber: "SCÈNE 06",
    sceneCode: "SCÈNE 06 // ÉVOLUTION",
    shortName: "3 niveaux d'IA",
    title: "LES 3 NIVEAUX D'IA",
    subtitle: "Cliquez sur chaque palier pour voir grandir le noyau 3D.",
    auraBanner: "« De l'IA spécialisée jusqu'à la superintelligence. »",
    duration: "20 secondes",
    summary: "IA faible, IA générale et Superintelligence.",
    criticalRule: "Cliquer sur les 3 paliers pour agrandir la sphère.",
    layout: "ai-levels",
    model3D: "ai-awakening",
    cameraPos: [0, 0, 6.2],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "IA faible et IA générale",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Voici les trois paliers : l'IA faible aujourd'hui, puis l'IA générale en 2030 qui saura tout apprendre.",
        stageTip: "Montrer les paliers 1 et 2.",
        partnerAction: "Mahmoud clique sur les paliers."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "La Superintelligence",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Et le troisième palier est la superintelligence : un scénario fictif dépassant tous les cerveaux humains !",
        stageTip: "Ton captivant sur le palier 3.",
        partnerAction: "Louay montre la sphère géante."
      }
    ],
    levels: [
      { level: "PALIER 01", name: "IA Faible (ANI)", tag: "AUJOURD'HUI", description: "Réussit *une seule tâche précise* (échecs, traduction).", scale: 0.75, gauge: 35 },
      { level: "PALIER 02", name: "IA Générale (AGI)", tag: "OBJECTIF 2030", description: "Comprend et apprend *toute tâche intellectuelle*.", scale: 1.0, gauge: 75 },
      { level: "PALIER 03", name: "Superintelligence", tag: "SCÉNARIO FICTIF", description: "Dépasserait *tous les cerveaux humains* réunis.", scale: 1.3, gauge: 100 }
    ]
  },
  {
    id: 7,
    sceneNumber: "SCÈNE 07",
    sceneCode: "SCÈNE 07 // SINGULARITÉ",
    shortName: "L'éveil (scénario fictif)",
    title: "L'ÉVEIL : ET SI ELLE NOUS DÉPASSAIT ?",
    subtitle: "Exploration d'une hypothèse de science-fiction.",
    auraBanner: "« Scénario fictif : je réécris mon propre code source. »",
    duration: "25 secondes",
    summary: "Scénario fictif de l'éveil et commande vocale d'AURA.",
    criticalRule: "NE PAS CLIQUER pendant la réponse vocale d'AURA !",
    isFictional: true,
    layout: "cards",
    model3D: "superintelligence",
    cameraPos: [0, 0.2, 6.4],
    steps: [
      {
        id: 0,
        speaker: "MAHMOUD",
        title: "Scénario de l'éveil",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Dans ce scénario fictif, l'IA réécrit son propre code et résout des défis scientifiques en quelques heures.",
        stageTip: "Montrer le badge SCÉNARIO FICTIF.",
        partnerAction: "Louay introduit la commande au smartphone."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Commande à AURA",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Avec son téléphone, Mahmoud demande maintenant à AURA de lancer la cité de 2030 !",
        stageTip: "Désigner le smartphone de Mahmoud.",
        partnerAction: "Mahmoud lève son téléphone."
      },
      {
        id: 2,
        speaker: "AURA",
        title: "Réponse d'AURA en direct",
        clickIndication: "[ATTENDRE · NE PAS CLIQUER]",
        shortHint: "⏳ attendre",
        waitAudio: true,
        speech: "Commande reçue ! J'active la simulation de la cité intelligente et de la médecine de 2030.",
        stageTip: "Silence pendant la voix d'AURA.",
        partnerAction: "Regarder la scène 3D s'animer."
      }
    ],
    cards: [
      { icon: "Zap", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Auto-Amélioration", description: "L'IA réécrit son *propre programme* mille fois plus vite." },
      { icon: "Atom", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Science Accélérée", description: "Découverte rapide d'*énergies propres* et nouveaux matériaux." },
      { icon: "HelpCircle", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Conscience Machine ?", description: "Une machine peut-elle *ressentir* ou seulement calculer ?" }
    ]
  },
  {
    id: 8,
    sceneNumber: "SCÈNE 08",
    sceneCode: "SCÈNE 08 // URBANISME",
    shortName: "Cité de 2030",
    title: "LA CITÉ INTELLIGENTE DE 2030",
    subtitle: "Transports autonomes, énergie propre et trafic fluide.",
    auraBanner: "« Je coordonne les transports et l'énergie de chaque quartier. »",
    duration: "20 secondes",
    summary: "Voitures autonomes et économies d'énergie urbaines.",
    criticalRule: "Citer les 30 % d'économie d'énergie.",
    layout: "cards",
    model3D: "future-city",
    cameraPos: [0, 0.8, 6.5],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Transports autonomes",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Dans la cité de 2030, les navettes autonomes communiquent entre elles : zéro embouteillage !",
        stageTip: "Montrer la ville 3D.",
        partnerAction: "Mahmoud prépare le point écologique."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Ville écologique",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Et les bâtiments partagent leur énergie solaire pour réduire de trente pour cent le gaspillage !",
        stageTip: "Insister sur 30 %.",
        partnerAction: "Louay acquiesce."
      }
    ],
    cards: [
      { icon: "Navigation", tag: "PRÉVISION 2030", title: "Transport Autonome", description: "Navettes sans conducteur et *zéro embouteillage*." },
      { icon: "Sun", tag: "PRÉVISION 2030", title: "Énergie Partagée", description: "Réseaux solaires *optimisés en temps réel*." },
      { icon: "ShieldCheck", tag: "PRÉVISION 2030", title: "Ville Écologique", description: "Réduction de *trente pour cent* du gaspillage urbain." }
    ]
  },
  {
    id: 9,
    sceneNumber: "SCÈNE 09",
    sceneCode: "SCÈNE 09 // MÉDECINE",
    shortName: "Santé du futur",
    title: "LA SANTÉ DU FUTUR",
    subtitle: "Diagnostics instantanés et nanorobots médicaux.",
    auraBanner: "« J'analyse l'ADN pour prévenir les maladies à l'avance. »",
    duration: "20 secondes",
    summary: "Diagnostics précoces par IA et nanorobots en fiction.",
    criticalRule: "Distinguer prévision médicale et fiction des nanorobots.",
    layout: "cards",
    model3D: "future-health",
    cameraPos: [0, 0, 6.2],
    steps: [
      {
        id: 0,
        speaker: "MAHMOUD",
        title: "Diagnostics précoces",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "En santé, l'IA repère des maladies invisibles sur les scanners et crée des traitements sur mesure.",
        stageTip: "Montrer l'ADN 3D.",
        partnerAction: "Louay enchaîne sur les nanorobots."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Nanorobots sanguins",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Et en fiction, des nanorobots microscopiques circulent dans le sang pour réparer nos cellules !",
        stageTip: "Montrer les particules 3D.",
        partnerAction: "Mahmoud sourit."
      }
    ],
    cards: [
      { icon: "Activity", tag: "PRÉVISION 2030", title: "Diagnostic Précoce", description: "Détection des *anomalies invisibles* en quelques secondes." },
      { icon: "FlaskConical", tag: "PRÉVISION 2030", title: "Traitements sur Mesure", description: "Médicaments créés selon *votre ADN personnel*." },
      { icon: "HeartPulse", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Nanorobots Sanguins", description: "Robots microscopiques *réparant les cellules* en direct." }
    ]
  },
  {
    id: 10,
    sceneNumber: "SCÈNE 10",
    sceneCode: "SCÈNE 10 // SOCIÉTÉ",
    shortName: "Éducation et travail",
    title: "ÉDUCATION ET TRAVAIL",
    subtitle: "Tuteur personnel sur mesure et alliance Humain + IA.",
    auraBanner: "« Je libère votre temps pour la créativité humaine. »",
    duration: "20 secondes",
    summary: "Tuteur IA à l'école et complémentarité au travail.",
    criticalRule: "Montrer la poignée de main Humain + Robot.",
    layout: "cards",
    model3D: "robot-human",
    cameraPos: [0, 0.1, 6.2],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Tuteur personnel",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "À l'école, chaque élève a un tuteur IA qui adapte les exercices à son propre rythme.",
        stageTip: "Ton bienveillant.",
        partnerAction: "Mahmoud pointe le duo Humain + Robot."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Alliance Humain + IA",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Au travail, l'IA calcule vite, mais l'humain apporte toujours l'empathie et l'esprit critique !",
        stageTip: "Geste d'alliance.",
        partnerAction: "Louay approuve."
      }
    ],
    cards: [
      { icon: "GraduationCap", tag: "ÉDUCATION", title: "Tuteur Personnel", description: "Explications adaptées au *rythme de chaque élève*." },
      { icon: "Briefcase", tag: "EMPLOI 2030", title: "Nouveaux Métiers", description: "Auditeurs d'éthique IA et *architectes d'hologrammes*." },
      { icon: "Users", tag: "COLLABORATION", title: "Humain + IA", description: "L'IA calcule vite ; l'humain garde *l'esprit critique*." }
    ]
  },
  {
    id: 11,
    sceneNumber: "SCÈNE 11",
    sceneCode: "SCÈNE 11 // COSMOS",
    shortName: "Au-delà de la Terre",
    title: "AU-DELÀ DE LA TERRE",
    subtitle: "L'IA pilote des stations spatiales et prépare l'exploration de Mars.",
    auraBanner: "« Scénario fictif : mes robots bâtissent les bases lunaires. »",
    duration: "15 secondes",
    summary: "Pilotage autonome vers Mars et bases lunaires.",
    criticalRule: "Montrer la trajectoire Terre-Mars.",
    isFictional: true,
    layout: "cards",
    model3D: "space-station",
    cameraPos: [0, 0.2, 6.4],
    steps: [
      {
        id: 0,
        speaker: "MAHMOUD",
        title: "Vaisseaux vers Mars",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Dans l'espace, l'IA pilote seule les vaisseaux vers Mars sans attendre les signaux radio.",
        stageTip: "Montrer la trajectoire 3D.",
        partnerAction: "Louay observe la station."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Bases lunaires",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Et des robots autonomes construisent des bases sur la Lune avant l'arrivée des astronautes !",
        stageTip: "Ton émerveillé.",
        partnerAction: "Mahmoud prépare la scène suivante."
      }
    ],
    cards: [
      { icon: "Compass", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Pilotage vers Mars", description: "Navigation spatiale *sans délai radio* depuis la Terre." },
      { icon: "Bot", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Bases Lunaires", description: "Des robots bâtissent les *abris des astronautes*." },
      { icon: "Radio", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Sondes Autonomes", description: "Recherche de vie sous la *glace des lunes lointaines*." }
    ]
  },
  {
    id: 12,
    sceneNumber: "SCÈNE 12",
    sceneCode: "SCÈNE 12 // NEURO-INTERFACE",
    shortName: "Humain + machine",
    title: "HUMAIN + MACHINE : L'HYBRIDE",
    subtitle: "Interfaces cerveau-ordinateur et humain augmenté.",
    auraBanner: "« Scénario fictif : relier directement la pensée au numérique. »",
    duration: "20 secondes",
    summary: "Implants médicaux et éthique de la liberté mentale.",
    criticalRule: "Poser la question de la protection de nos pensées.",
    isFictional: true,
    layout: "cards",
    model3D: "bci-head",
    cameraPos: [0, 0.1, 6.2],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Réparer le handicap",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Relier le cerveau à l'ordinateur aide déjà des personnes paralysées à bouger par la pensée.",
        stageTip: "Montrer la tête 3D.",
        partnerAction: "Mahmoud écoute avec attention."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Liberté mentale",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Mais en fiction, connecter son cerveau au cloud oblige à protéger nos pensées privées !",
        stageTip: "Index sur la tempe.",
        partnerAction: "Louay hoche la tête."
      }
    ],
    cards: [
      { icon: "Accessibility", tag: "PROGRÈS MÉDICAL", title: "Mobilité Retrouvée", description: "Commander une prothèse *directement par la pensée*." },
      { icon: "Cpu", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Mémoire Augmentée", description: "Accès instantané au *nuage de données* sans écran." },
      { icon: "ShieldAlert", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Liberté Mentale", description: "Protéger nos *pensées intimes* contre toute intrusion." }
    ]
  },
  {
    id: 13,
    sceneNumber: "SCÈNE 13",
    sceneCode: "SCÈNE 13 // VIGILANCE",
    shortName: "Les risques",
    title: "CONTRÔLER UNE SUPERINTELLIGENCE ?",
    subtitle: "Vie privée, deepfakes, dépendance et lois internationales.",
    auraBanner: "« Sans règles strictes, ma puissance deviendrait un risque. »",
    duration: "20 secondes",
    summary: "Vie privée, deepfakes et régulation européenne.",
    criticalRule: "Ton grave et responsable.",
    layout: "cards",
    model3D: "ai-awakening",
    cameraPos: [0, 0, 6.2],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Question du contrôle",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Attention : pouvons-nous contrôler une superintelligence ? Il faut protéger notre vie privée.",
        stageTip: "Ton sérieux.",
        partnerAction: "Mahmoud montre les cartes."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Deepfakes et lois",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Face aux deepfakes qui truquent la réalité, des lois strictes comme l'AI Act sont indispensables !",
        stageTip: "Ton ferme.",
        partnerAction: "Louay prépare le Dilemme."
      }
    ],
    cards: [
      { icon: "AlertTriangle", tag: "VIE PRIVÉE", title: "Surveillance & Biais", description: "Protéger nos *données personnelles* et notre autonomie." },
      { icon: "EyeOff", tag: "DÉSINFORMATION", title: "Danger des Deepfakes", description: "Fausses vidéos et voix truquées *manipulant l'opinion*." },
      { icon: "Scale", tag: "RÉGULATION", title: "Lois & Contrôle Humain", description: "Imposer des *règles mondiales* comme l'AI Act européen." }
    ]
  },
  {
    id: 14,
    sceneNumber: "SCÈNE 14",
    sceneCode: "SCÈNE 14 // BIFURCATION",
    shortName: "Le dilemme",
    title: "LE DILEMME : DEUX FUTURS",
    subtitle: "Cliquez pour basculer entre le futur lumineux et le futur sombre.",
    auraBanner: "« Deux futurs s'offrent à vous : l'alliance ou la dérive. »",
    duration: "25 secondes",
    summary: "Futur lumineux vs sombre et vote à main levée.",
    criticalRule: "Faire lever la main à la classe !",
    isFictional: true,
    layout: "dilemma",
    model3D: "dilemma-portal",
    cameraPos: [0, 0, 6.4],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Les deux futurs",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Voici deux choix : un futur lumineux au service de l'humain, ou un futur sombre sans liberté.",
        stageTip: "Basculer les boutons à l'écran.",
        partnerAction: "Mahmoud s'avance vers le public."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Vote de la classe",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Qui pense que nous réussirons à bâtir le futur lumineux en 2030 ? Levez la main !",
        stageTip: "Lever la main et compter avec le sourire.",
        partnerAction: "Louay observe les mains levées."
      }
    ],
    dilemma: {
      bright: {
        title: "FUTUR LUMINEUX : L'ALLIANCE",
        subtitle: "L'IA reste au service de l'humain et de la planète.",
        points: [
          "Guérison rapide de *nombreuses maladies graves*.",
          "Économies d'énergie et *protection du climat*.",
          "Plus de temps libre pour *la culture et l'humain*."
        ]
      },
      dark: {
        title: "FUTUR SOMBRE : LA DÉRIVE",
        subtitle: "Perte de contrôle démocratique et dépendance.",
        points: [
          "Surveillance totale et *fin de la vie privée*.",
          "Désinformation massive par les *deepfakes*.",
          "Affaiblissement de *l'esprit critique humain*."
        ]
      }
    }
  },
  {
    id: 15,
    sceneNumber: "SCÈNE 15",
    sceneCode: "SCÈNE 15 // BILAN",
    shortName: "Avantages vs inconvénients",
    title: "AVANTAGES VS INCONVÉNIENTS",
    subtitle: "Les deux colonnes du bilan pour 2030.",
    auraBanner: "« Toute révolution technologique demande de la vigilance. »",
    duration: "20 secondes",
    summary: "Synthèse des avantages et des limites.",
    criticalRule: "Comparer les deux colonnes.",
    layout: "comparison",
    model3D: "dilemma-portal",
    cameraPos: [0, 0, 6.6],
    steps: [
      {
        id: 0,
        speaker: "MAHMOUD",
        title: "Les grands avantages",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "En résumé : l'IA accélère la médecine, supprime les corvées et économise l'énergie.",
        stageTip: "Montrer la colonne Avantages.",
        partnerAction: "Louay prépare les limites."
      },
      {
        id: 1,
        speaker: "LOUAY",
        title: "Les limites à surveiller",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Mais attention aux erreurs d'hallucination, à la consommation des serveurs et aux deepfakes !",
        stageTip: "Montrer la colonne Inconvénients.",
        partnerAction: "Mahmoud prépare le plan de travail."
      }
    ],
    comparison: {
      pros: [
        { title: "Progrès médical", desc: "Diagnostics rapides et *soins personnalisés*." },
        { title: "Productivité", desc: "Fin des *tâches répétitives* et dangereuses." },
        { title: "Écologie urbaine", desc: "Moins de gaspillage d'*eau et d'énergie*." }
      ],
      cons: [
        { title: "Hallucinations", desc: "L'IA peut inventer de *fausses réponses*." },
        { title: "Énergie des serveurs", desc: "Les centres de calcul *consomment beaucoup*." },
        { title: "Deepfakes", desc: "Risque de *manipulation* de l'information." }
      ]
    }
  },
  {
    id: 16,
    sceneNumber: "SCÈNE 16",
    sceneCode: "SCÈNE 16 // MÉTHODE",
    shortName: "Plan de travail",
    title: "NOTRE PLAN DE TRAVAIL",
    subtitle: "Cinq étapes structurées pour concevoir cette présentation 3D.",
    auraBanner: "« Méthodologie de Louay Kouki et Mahmoud Dammak. »",
    duration: "20 secondes",
    summary: "Les 5 étapes de réalisation du projet.",
    criticalRule: "Montrer la bande des 5 étapes en bas.",
    layout: "workplan",
    model3D: "time-tunnel",
    cameraPos: [0, 0.3, 6.5],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Recherches et textes",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Voici nos cinq étapes : recherches scientifiques, puis rédaction de textes clairs et équilibrés.",
        stageTip: "Montrer les étapes 1 et 2.",
        partnerAction: "Mahmoud prépare la suite."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "3D et répétitions",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Ensuite, création des modèles 3D et de la voix d'AURA, avant nos répétitions pour aujourd'hui !",
        stageTip: "Montrer les étapes 3 à 5.",
        partnerAction: "Se placer côte à côte pour conclure."
      }
    ]
  },
  {
    id: 17,
    sceneNumber: "SCÈNE 17",
    sceneCode: "SCÈNE 17 // ÉPILOGUE",
    shortName: "Épilogue",
    title: "CONCLUSION : L'HUMAIN AU CENTRE",
    subtitle: "En 2030, la plus belle intelligence restera notre sagesse collective.",
    auraBanner: "« Le futur ne se prédit pas, il se construit. Ensemble. »",
    duration: "25 secondes",
    summary: "Message final d'AURA et remerciements.",
    criticalRule: "Attendre la fin de la voix d'AURA.",
    layout: "conclusion",
    model3D: "finale-earth",
    cameraPos: [0, 0, 6.2],
    steps: [
      {
        id: 0,
        speaker: "AURA",
        title: "Message final d'AURA",
        clickIndication: "[ATTENDRE · NE PAS CLIQUER]",
        shortHint: "⏳ attendre",
        waitAudio: true,
        speech: "Retenez bien ceci : le futur ne se prédit pas, il se construit. Ensemble. Merci à tous !",
        stageTip: "Écouter AURA avec le sourire.",
        partnerAction: "Louay et Mahmoud côte à côte."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Conclusion humaine",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "La technologie propose, mais c'est toujours à l'être humain de décider !",
        stageTip: "Ton inspirant.",
        partnerAction: "Louay prépare le salut final."
      },
      {
        id: 2,
        speaker: "LOUAY",
        title: "Notre engagement",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Construisons ensemble ce futur éthique et responsable avec discernement et intelligence !",
        stageTip: "Regard confiant et résolu vers la classe.",
        partnerAction: "Mahmoud acquiesce et prépare la diapositive des sources."
      }
    ]
  },
  {
    id: 18,
    sceneNumber: "SCÈNE 18",
    sceneCode: "SCÈNE 18 // BIBLIOGRAPHIE",
    shortName: "Sources",
    title: "SOURCES ET RÉFÉRENCES",
    subtitle: "Organismes scientifiques et institutionnels consultés.",
    auraBanner: "« Sources officielles : CNRS, INRIA, UNESCO, CNIL, AI Act, CEA. »",
    duration: "15 secondes",
    summary: "Références officielles et ouverture des questions.",
    criticalRule: "Un clic supplémentaire affiche l'écran de fin ou ramène au début.",
    layout: "sources",
    model3D: "finale-earth",
    cameraPos: [0, 0, 6.5],
    steps: [
      {
        id: 0,
        speaker: "LOUAY",
        title: "Nos sources scientifiques",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Voici les institutions scientifiques officielles qui fondent l'ensemble de notre recherche.",
        stageTip: "Pointer les organismes scientifiques (CNRS, INRIA, UNESCO) avec clarté.",
        partnerAction: "Mahmoud s'apprête pour le mot de remerciement et le débat."
      },
      {
        id: 1,
        speaker: "MAHMOUD",
        title: "Remerciements et débat",
        clickIndication: "[CLIC GAUCHE →]",
        shortHint: "→ clic",
        speech: "Mahmoud Dammak et Louay Kouki vous remercient pour votre attention ! Avez-vous des questions ?",
        stageTip: "Sourire chaleureux et ouverture des bras vers le public.",
        partnerAction: "Louay salue la classe aux côtés de Mahmoud."
      }
    ],
    sources: [
      { name: "CNRS Le Journal", org: "Recherche Scientifique", desc: "Dossiers sur le *Deep Learning* et la robotique.", url: "https://lejournal.cnrs.fr" },
      { name: "INRIA", org: "Sciences du Numérique", desc: "Ressources sur les *réseaux neuronaux*.", url: "https://www.inria.fr" },
      { name: "UNESCO", org: "Nations Unies", desc: "Recommandation mondiale sur *l'éthique de l'IA*.", url: "https://www.unesco.org/fr/artificial-intelligence" },
      { name: "CNIL", org: "Données Personnelles", desc: "Guides sur la *vie privée* et les deepfakes.", url: "https://www.cnil.fr" },
      { name: "AI Act Européen", org: "Parlement Européen", desc: "Cadre légal européen sur les *IA à haut risque*.", url: "https://www.europarl.europa.eu" },
      { name: "CEA", org: "Énergies & Calcul", desc: "Fiches sur le *calcul haute performance*.", url: "https://www.cea.fr" }
    ]
  }
];
