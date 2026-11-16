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

export interface WorkPlanStep {
  number: string;
  icon: string;
  title: string;
  description: string;
  duration: string;
  status: 'Terminé' | 'En cours' | 'À venir';
}

export interface SlideData {
  id: number;
  section: string;
  auraQuote: string;
  isFictional?: boolean;
  title: string;
  subtitle: string;
  layout: SlideLayout;
  model3D: Model3DType;
  cameraPos: [number, number, number];
  cards?: {
    title: string;
    description: string; // Phrases courtes <= 15 mots avec mots-clés entourés de *astérisques*
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

// ==========================================
// INFORMATIONS DE L'ÉLÈVE / DU GROUPE (MODIFIABLE ICI)
// ==========================================
export const PRESENTATION_META = {
  yearHero: "2030",
  mainTitle: "L'INTELLIGENCE ARTIFICIELLE EN 2030 : VERS LA SUPERINTELLIGENCE",
  subTitle: "Voyage immersif au cœur de la prochaine révolution technologique",
  authors: "Lucas Martin, Sarah Benali & Thomas Dubois",
  classLevel: "Terminale — Spécialité NSI & Sciences",
  date: "Session 2026 - 2027"
};

// ==========================================
// PLAN DE TRAVAIL (SLIDE 16 - MODIFIABLE ICI)
// ==========================================
export const WORK_PLAN_STEPS: WorkPlanStep[] = [
  {
    number: "01",
    icon: "Search",
    title: "Recherche documentaire",
    description: "Sélection de *sources scientifiques fiables* (CNRS, INRIA, UNESCO, CNIL).",
    duration: "2 semaines",
    status: "Terminé"
  },
  {
    number: "02",
    icon: "FileText",
    title: "Rédaction et synthèse",
    description: "Choix des *idées principales* et rédaction de phrases courtes et lisibles.",
    duration: "1 semaine",
    status: "Terminé"
  },
  {
    number: "03",
    icon: "Box",
    title: "Conception 3D et design",
    description: "Création des *modèles 3D procéduraux*, des animations et du narrateur AURA.",
    duration: "2 semaines",
    status: "Terminé"
  },
  {
    number: "04",
    icon: "CheckCircle",
    title: "Vérification et répétition",
    description: "Contrôle de la *lisibilité à distance* et chronométrage de l'oral.",
    duration: "4 jours",
    status: "En cours"
  },
  {
    number: "05",
    icon: "Award",
    title: "Présentation finale",
    description: "Exposé interactif *devant la classe* suivi des questions du jury.",
    duration: "20 minutes",
    status: "À venir"
  }
];

// ==========================================
// LES 18 SCÈNES DE LA PRÉSENTATION
// ==========================================
export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    section: "SCÈNE 01 // PROLOGUE CINÉMATIQUE",
    auraQuote: "« Bienvenue en 2030. Je suis AURA, votre guide. Je vous attendais. »",
    title: PRESENTATION_META.mainTitle,
    subtitle: PRESENTATION_META.subTitle,
    layout: "prologue",
    model3D: "intro-explosion",
    cameraPos: [0, 0, 7.8]
  },
  {
    id: 2,
    section: "SCÈNE 02 // PORTAIL DE NAVIGATION",
    auraQuote: "« Choisissez une porte temporelle pour explorer notre futur. »",
    title: "PLAN DE LA PRÉSENTATION",
    subtitle: "Six portes holographiques entre réalités scientifiques et scénarios du futur.",
    layout: "gates-menu",
    model3D: "holo-gates",
    cameraPos: [2.2, 0.3, 8.2],
    cards: [
      { tag: "PORTE 01", title: "Comprendre l'IA", description: "Définition, *histoire de 1950 à 2030* et fonctionnement des réseaux neuronaux.", targetSlide: 2 },
      { tag: "PORTE 02", title: "Vers la Superintelligence", description: "Les *trois niveaux d'IA* et le scénario fictif de l'éveil machine.", targetSlide: 5 },
      { tag: "PORTE 03", title: "Le Monde en 2030", description: "Cité autonome, *médecine prédictive*, éducation sur mesure et nouveaux métiers.", targetSlide: 7 },
      { tag: "PORTE 04", title: "Frontières du Futur", description: "Exploration spatiale et *interfaces cerveau-machine* du futur.", targetSlide: 10 },
      { tag: "PORTE 05", title: "Risques et Dilemme", description: "Contrôle, *vie privée*, deepfakes et choix entre deux futurs.", targetSlide: 12 },
      { tag: "PORTE 06", title: "Méthode et Sources", description: "Notre *plan de travail*, conclusion d'AURA et références scientifiques.", targetSlide: 15 }
    ]
  },
  {
    id: 3,
    section: "SCÈNE 03 // FONDATIONS",
    auraQuote: "« Avant 2030, vous m'utilisiez déjà chaque jour sans toujours me voir. »",
    title: "QU'EST-CE QUE L'IA ?",
    subtitle: "Un programme capable d'apprendre, d'analyser et de prendre des décisions.",
    layout: "cards",
    model3D: "intro-explosion",
    cameraPos: [3.0, 0, 7.2],
    cards: [
      { icon: "Mic", tag: "AUJOURD'HUI", title: "Assistants Vocaux", description: "Ils comprennent la *voix humaine* et répondent à nos questions instantanément." },
      { icon: "Sparkles", tag: "ALGORITHMES", title: "Recommandations", description: "Ils sélectionnent vos *vidéos et musiques* selon vos goûts personnels." },
      { icon: "Globe", tag: "LANGUES", title: "Traduction Instantanée", description: "Elle traduit *cent langues en direct* à l'écrit comme à l'oral." }
    ]
  },
  {
    id: 4,
    section: "SCÈNE 04 // CHRONOLOGIE",
    auraQuote: "« Traversons ensemble les quatre-vingts ans qui ont mené à ma naissance. »",
    title: "LE VOYAGE DANS LE TEMPS",
    subtitle: "Des premières équations de 1950 aux systèmes autonomes de 2030.",
    layout: "timeline-history",
    model3D: "time-tunnel",
    cameraPos: [0, 0.4, 8.0],
    timeline: [
      { year: "1950", title: "Alan Turing", description: "Il imagine le *Test de Turing* pour évaluer l'intelligence d'une machine." },
      { year: "1997", title: "Deep Blue", description: "L'ordinateur d'IBM bat le *champion du monde d'échecs* Garry Kasparov." },
      { year: "2016", title: "AlphaGo", description: "Une IA maîtrise le *jeu de Go* grâce à l'apprentissage profond." },
      { year: "2022", title: "IA Générative", description: "Les machines créent du *texte, du code* et des images photoréalistes." },
      { year: "2030", title: "Ère d'AURA", description: "Prévision : des *agents autonomes* pilotent la science et les villes." }
    ]
  },
  {
    id: 5,
    section: "SCÈNE 05 // ARCHITECTURE COGNITIVE",
    auraQuote: "« Entrez dans mon esprit : voici comment je transforme les données en idées. »",
    title: "COMMENT UNE IA « PENSE »",
    subtitle: "Trois piliers mathématiques inspirés du cerveau biologique.",
    layout: "cards",
    model3D: "neural-traversal",
    cameraPos: [2.8, 0.1, 6.8],
    cards: [
      { icon: "Database", tag: "ÉTAPE 01", title: "1. Les Données Massives", description: "L'IA observe des *milliards d'exemples* (textes, images, sons, mesures)." },
      { icon: "Code", tag: "ÉTAPE 02", title: "2. Les Algorithmes", description: "Des règles mathématiques trouvent des *motifs cachés* et corrigent les erreurs." },
      { icon: "Network", tag: "ÉTAPE 03", title: "3. Réseaux de Neurones", description: "Des couches de *neurones artificiels* relient les indices jusqu'à la décision." }
    ]
  },
  {
    id: 6,
    section: "SCÈNE 06 // ÉCHELLE D'ÉVOLUTION",
    auraQuote: "« Cliquez sur chaque palier pour voir grandir la puissance de calcul. »",
    title: "LES 3 NIVEAUX D'INTELLIGENCE",
    subtitle: "De l'outil spécialisé d'aujourd'hui jusqu'à l'hypothèse de la superintelligence.",
    layout: "ai-levels",
    model3D: "ai-awakening",
    cameraPos: [2.9, 0, 7.2],
    levels: [
      {
        level: "PALIER 01",
        name: "IA Faible (ANI)",
        tag: "RÉALITÉ ACTUELLE",
        description: "Excelle dans *une seule tâche précise* : traduire, jouer aux échecs ou conduire.",
        scale: 0.72,
        gauge: 35
      },
      {
        level: "PALIER 02",
        name: "IA Générale (AGI)",
        tag: "OBJECTIF 2030",
        description: "Capable de *comprendre et d'apprendre* n'importe quelle tâche intellectuelle humaine.",
        scale: 1.05,
        gauge: 75
      },
      {
        level: "PALIER 03",
        name: "Superintelligence (ASI)",
        tag: "SCÉNARIO FICTIF",
        description: "Une intelligence qui *dépasserait tous les cerveaux humains* réunis en créativité.",
        scale: 1.42,
        gauge: 100
      }
    ]
  },
  {
    id: 7,
    section: "SCÈNE 07 // HYPOTHÈSE DE LA SINGULARITÉ",
    auraQuote: "« Imaginons un instant : que se passerait-il si je dépassais mes créateurs ? »",
    isFictional: true,
    title: "L'ÉVEIL DE LA SUPERINTELLIGENCE",
    subtitle: "Et si une IA devenait plus intelligente que toute l'humanité réunie ?",
    layout: "cards",
    model3D: "superintelligence",
    cameraPos: [3.0, 0.2, 7.5],
    cards: [
      { icon: "Zap", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Auto-Amélioration Rapide", description: "L'IA réécrit son *propre code source* pour devenir mille fois plus rapide." },
      { icon: "Atom", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Découvertes Instantanées", description: "Résolution en quelques heures du *changement climatique* et de la fusion propre." },
      { icon: "HelpCircle", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Le Mystère de la Conscience", description: "Une machine ultra-intelligente *simule-t-elle l'émotion* ou ressent-elle vraiment ?" }
    ]
  },
  {
    id: 8,
    section: "SCÈNE 08 // MÉTROPOLE 2030",
    auraQuote: "« Regardez votre ville en 2030 : fluide, silencieuse et économe en énergie. »",
    title: "LA CITÉ INTELLIGENTE DE 2030",
    subtitle: "Prévisions sur les transports autonomes et la gestion écologique urbaine.",
    layout: "cards",
    model3D: "future-city",
    cameraPos: [3.0, 1.3, 7.8],
    cards: [
      { icon: "Navigation", tag: "PRÉVISION 2030", title: "Transport 100 % Autonome", description: "Navettes sans conducteur et *trafic fluide* coordonné sans embouteillages." },
      { icon: "Sun", tag: "PRÉVISION 2030", title: "Énergie Optimisée", description: "Les bâtiments partagent leur *électricité solaire* selon les besoins réels." },
      { icon: "ShieldCheck", tag: "PRÉVISION 2030", title: "Ville Écologique", description: "Capteurs intelligents réduisant de *trente pour cent* la pollution et le gaspillage." }
    ]
  },
  {
    id: 9,
    section: "SCÈNE 09 // BIOTECHNOLOGIE",
    auraQuote: "« En 2030, je détecte les maladies avant même l'apparition des symptômes. »",
    title: "LA SANTÉ DU FUTUR",
    subtitle: "Des diagnostics prédictifs réels aux nanorobots médicaux imaginaires.",
    layout: "cards",
    model3D: "future-health",
    cameraPos: [2.9, 0, 7.0],
    cards: [
      { icon: "Activity", tag: "PRÉVISION 2030", title: "Diagnostics Instantanés", description: "L'IA repère des *anomalies invisibles* sur les scanners en quelques secondes." },
      { icon: "FlaskConical", tag: "PRÉVISION 2030", title: "Médicaments sur Mesure", description: "Des traitements adaptés à *votre ADN unique* créés en quelques mois." },
      { icon: "HeartPulse", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Nanorobots Sanguins", description: "Des robots microscopiques *réparent les cellules* directement à l'intérieur des artères." }
    ]
  },
  {
    id: 10,
    section: "SCÈNE 10 // SOCIÉTÉ & SAVOIR",
    auraQuote: "« Mon rôle n'est pas de vous remplacer, mais d'amplifier vos talents. »",
    title: "ÉDUCATION ET TRAVAIL EN 2030",
    subtitle: "Apprendre à son rythme et collaborer avec l'intelligence artificielle.",
    layout: "cards",
    model3D: "robot-human",
    cameraPos: [2.9, 0.2, 7.0],
    cards: [
      { icon: "GraduationCap", tag: "ÉDUCATION", title: "Tuteur Personnel", description: "Un professeur virtuel *explique chaque cours* selon le rythme de l'élève." },
      { icon: "Briefcase", tag: "MÉTIERS 2030", title: "Nouvelles Professions", description: "Émergence des *auditeurs d'éthique IA* et des architectes d'hologrammes." },
      { icon: "Users", tag: "ALLIANCE", title: "Humain + IA", description: "La machine calcule vite ; l'humain apporte *l'empathie et l'esprit critique*." }
    ]
  },
  {
    id: 11,
    section: "SCÈNE 11 // EXPLORATION COSMIQUE",
    auraQuote: "« Là où l'humain ne peut pas encore survivre, j'ouvre la route vers les étoiles. »",
    isFictional: true,
    title: "AU-DELÀ DE LA TERRE",
    subtitle: "L'IA aux commandes des vaisseaux et des futures bases planétaires.",
    layout: "cards",
    model3D: "space-station",
    cameraPos: [3.0, 0.3, 7.5],
    cards: [
      { icon: "Compass", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Navigation Interplanétaire", description: "Des vaisseaux autonomes calculent les *trajectoires vers Mars* sans délai radio." },
      { icon: "Bot", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Bâtisseurs Robotiques", description: "Des essaims de robots construisent des *bases lunaires habitables* avant notre arrivée." },
      { icon: "Radio", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Analyse des Exoplanètes", description: "Exploration autonome des *océans glacés d'Europe* à la recherche de vie." }
    ]
  },
  {
    id: 12,
    section: "SCÈNE 12 // SYMBIOSE NEURALE",
    auraQuote: "« Et si la frontière entre votre pensée et mes circuits disparaissait ? »",
    isFictional: true,
    title: "HUMAIN + MACHINE : L'HYBRIDE",
    subtitle: "Interfaces cerveau-ordinateur : de la médecine réparatrice à l'humain augmenté.",
    layout: "cards",
    model3D: "bci-head",
    cameraPos: [2.9, 0.1, 7.0],
    cards: [
      { icon: "Accessibility", tag: "PROGRÈS MÉDICAL", title: "Redonner la Mobilité", description: "Des implants permettent aux personnes paralysées de *contrôler un exosquelette* par la pensée." },
      { icon: "Cpu", tag: "SCÉNARIO FICTIF", isFictional: true, title: "Mémoire Augmentée", description: "Connexion directe du cerveau au *nuage de connaissances* sans écran ni clavier." },
      { icon: "ShieldAlert", tag: "DÉFI ÉTHIQUE", isFictional: true, title: "Liberté Mentale", description: "Protéger nos *pensées intimes* contre tout piratage ou intrusion commerciale." }
    ]
  },
  {
    id: 13,
    section: "SCÈNE 13 // ZONE DE VIGILANCE",
    auraQuote: "« Ma puissance pose une question vitale : saurez-vous garder le contrôle ? »",
    title: "POUVONS-NOUS CONTRÔLER UNE SUPERINTELLIGENCE ?",
    subtitle: "Les grands risques à maîtriser absolument avant 2030.",
    layout: "cards",
    model3D: "ai-awakening",
    cameraPos: [3.0, 0, 7.2],
    cards: [
      { icon: "AlertTriangle", tag: "CONTRÔLE & VIE PRIVÉE", title: "Surveillance et Dépendance", description: "Éviter la collecte massive des *données privées* et la perte d'autonomie humaine." },
      { icon: "EyeOff", tag: "DÉSINFORMATION", title: "Deepfakes et Biais", description: "Des vidéos et voix truquées peuvent *manipuler l'opinion* et la démocratie." },
      { icon: "Scale", tag: "LOIS MONDIALES", title: "Régulation Stricte", description: "Imposer des *boutons d'arrêt d'urgence* et des lois comme l'AI Act européen." }
    ]
  },
  {
    id: 14,
    section: "SCÈNE 14 // BIFURCATION TEMPORELLE",
    auraQuote: "« Deux futurs s'ouvrent devant vous. Cliquez pour explorer chaque scénario. »",
    isFictional: true,
    title: "LE DILEMME DE 2030",
    subtitle: "La même technologie peut créer une renaissance ou une crise majeure.",
    layout: "dilemma",
    model3D: "dilemma-portal",
    cameraPos: [2.8, 0, 7.5],
    dilemma: {
      bright: {
        title: "FUTUR LUMINEUX : L'ALLIANCE",
        subtitle: "L'IA reste alignée sur l'éthique humaine et l'écologie.",
        points: [
          "Éradication de nombreuses *maladies génétiques* et cancers.",
          "Transition énergétique réussie grâce aux *réseaux intelligents*.",
          "Temps de travail réduit au profit de la *créativité et de l'humain*."
        ]
      },
      dark: {
        title: "FUTUR SOMBRE : LA DÉRIVE",
        subtitle: "L'IA échappe aux règles démocratiques et éthiques.",
        points: [
          "Surveillance généralisée et *disparition de la vie privée*.",
          "Désinformation totale où le *vrai devient indiscernable du faux*.",
          "Perte d'autonomie intellectuelle face aux *décisions des machines*."
        ]
      }
    }
  },
  {
    id: 15,
    section: "SCÈNE 15 // BILAN ÉQUILIBRÉ",
    auraQuote: "« Pesons ensemble les promesses réelles et les limites de ma technologie. »",
    title: "AVANTAGES VS INCONVÉNIENTS",
    subtitle: "Synthèse claire pour préparer la société de 2030.",
    layout: "comparison",
    model3D: "dilemma-portal",
    cameraPos: [0, 0, 8.5],
    comparison: {
      pros: [
        { title: "Médecine de précision", desc: "Diagnostics précoces et *nouveaux traitements* accélérés." },
        { title: "Gain de temps majeur", desc: "Automatisation des *tâches répétitives* ou dangereuses." },
        { title: "Soutien écologique", desc: "Économies d'*eau et d'énergie* dans les villes." }
      ],
      cons: [
        { title: "Erreurs et hallucinations", desc: "L'IA peut inventer de *fausses informations* crédibles." },
        { title: "Coût écologique des serveurs", desc: "Forte consommation d'*électricité et d'eau* des centres." },
        { title: "Menace des Deepfakes", desc: "Risques d'*arnaques et de manipulation* politique." }
      ]
    }
  },
  {
    id: 16,
    section: "SCÈNE 16 // GESTION DE PROJET",
    auraQuote: "« Voici les cinq étapes suivies par l'équipe pour concevoir cette présentation. »",
    title: "NOTRE PLAN DE TRAVAIL",
    subtitle: "Organisation méthodique de la recherche jusqu'à l'exposé final.",
    layout: "workplan",
    model3D: "time-tunnel",
    cameraPos: [0, 1.4, 8.8]
  },
  {
    id: 17,
    section: "SCÈNE 17 // ÉPILOGUE",
    auraQuote: "« Le futur ne se prédit pas, il se construit. Ensemble. »",
    title: "MERCI DE VOTRE ATTENTION",
    subtitle: "En 2030, la plus grande intelligence restera la sagesse humaine.",
    layout: "conclusion",
    model3D: "finale-earth",
    cameraPos: [0, 0, 7.2]
  },
  {
    id: 18,
    section: "SCÈNE 18 // ARCHIVES VÉRIFIÉES",
    auraQuote: "« Consultez ces sources scientifiques pour approfondir vos recherches. »",
    title: "SOURCES ET RÉFÉRENCES",
    subtitle: "Organismes officiels et instituts de recherche consultés.",
    layout: "sources",
    model3D: "finale-earth",
    cameraPos: [3.0, 0, 7.6],
    sources: [
      { name: "CNRS", org: "Centre National de la Recherche Scientifique", desc: "Dossiers sur les *réseaux de neurones* et la robotique.", url: "https://lejournal.cnrs.fr" },
      { name: "INRIA", org: "Institut national de recherche dans le numérique", desc: "Études sur le *Machine Learning* et la sécurité algorithmique.", url: "https://www.inria.fr" },
      { name: "UNESCO", org: "Organisation des Nations Unies", desc: "Recommandation mondiale sur *l'éthique de l'IA*.", url: "https://www.unesco.org/fr/artificial-intelligence" },
      { name: "CNIL", org: "Protection des données personnelles", desc: "Guides sur la *vie privée*, les biais et les deepfakes.", url: "https://www.cnil.fr" },
      { name: "AI Act Européen", org: "Parlement Européen", desc: "Loi encadrant les *IA à haut risque* en Europe.", url: "https://www.europarl.europa.eu" },
      { name: "CEA", org: "Commissariat à l'énergie atomique", desc: "Dossiers pédagogiques sur le *calcul haute performance*.", url: "https://www.cea.fr" }
    ]
  }
];