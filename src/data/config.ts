export const PRESENTATION_CONFIG = {
  yearHero: "2030",
  mainTitle: "L'INTELLIGENCE ARTIFICIELLE EN 2030",
  subTitle: "Vers la Superintelligence : Une IA qui pense, dialogue et construit le futur",
  presenter1Name: "Louay Kouki",
  presenter1Badge: "LOUAY · PRÉSENTATEUR 1",
  presenter2Name: "Mahmoud Dammak",
  presenter2Badge: "MAHMOUD · PRÉSENTATEUR 2",
  assistantName: "AURA",
  assistantBadge: "AURA · VOIX JULIE",
  assistantBookletBadge: "ASSISTANTE VOIX JULIE",
  assistantVoiceDesc: "AURA, voix invisible intégrée, voix humaine chaleureuse : Microsoft Julie (fr-FR)",
  classLevel: "Classe de Terminale — Spécialité Sciences & Numérique",
  date: "Année scolaire 2026 - 2027",
  durationLabel: "5 à 8 minutes • Français clair et structuré (répartition 50/50 vérifiée)",
  appUrl: "https://ia-2030.vercel.app/",
  telemetryCode: "SYS//2030 • LAT 36.80 • NŒUD AURA-09"
};

export interface WorkPlanItem {
  number: string;
  icon: string;
  title: string;
  description: string;
  duration: string;
  status: 'Terminé' | 'En cours' | 'À venir';
}

export const WORK_PLAN_DATA: WorkPlanItem[] = [
  {
    number: "01",
    icon: "Search",
    title: "Recherche & Sources",
    description: "Collecte de dossiers fiables (CNRS, INRIA, UNESCO, CNIL).",
    duration: "2 sem.",
    status: "Terminé"
  },
  {
    number: "02",
    icon: "FileText",
    title: "Rédaction & Script",
    description: "Synthèse des idées clés et répartition 50/50 des répliques.",
    duration: "1 sem.",
    status: "Terminé"
  },
  {
    number: "03",
    icon: "Box",
    title: "Modèles 3D & Audio",
    description: "Création des 12 scènes 3D et de la voix d'AURA.",
    duration: "2 sem.",
    status: "Terminé"
  },
  {
    number: "04",
    icon: "CheckCircle",
    title: "Répétition Orale",
    description: "Vérification du souffleur et synchronisation des clics.",
    duration: "4 jours",
    status: "En cours"
  },
  {
    number: "05",
    icon: "Award",
    title: "Exposé Final",
    description: "Présentation devant la classe et débat interactif.",
    duration: "6 min",
    status: "À venir"
  }
];

export const KEY_MEMORABLE_PHRASES = {
  louay: [
    "Bonjour à tous ! Merci AURA. Avec Mahmoud Dammak, nous vous présentons l'IA en 2030.",
    "Posons une question simple : qu'est-ce que l'intelligence artificielle ?",
    "Voici les trois paliers : l'IA faible aujourd'hui, l'IA générale en 2030, puis la superintelligence.",
    "Construisons ensemble ce futur éthique et responsable avec discernement et intelligence !"
  ],
  mahmoud: [
    "Aujourd'hui, avec Louay Kouki, découvrons nos vraies prévisions et les scénarios du futur !",
    "Comment réfléchit une IA ? Grâce aux données, aux algorithmes et aux réseaux de neurones !",
    "Avec mon smartphone, je demande à AURA de lancer la simulation de la cité 2030 !",
    "Mahmoud Dammak et Louay Kouki vous remercient pour votre attention ! Avez-vous des questions ?"
  ]
};
