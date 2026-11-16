export type SpeakerRole = 'SYSTEME' | 'AURA' | 'MAHMOUD' | 'LOUAY';

export interface DialogueStep {
  stepIndex: number;
  speaker: SpeakerRole;
  speakerLabel: string;
  actionTag: string;
  waitVoice?: boolean;
  speech: string;
  stageTip: string;
  partnerAction: string;
}

export interface SceneScript {
  sceneNumber: string;
  slideIndex: number; // Index (0 à 17) ou groupe de slides
  title: string;
  duration: string;
  summary: string;
  steps: DialogueStep[];
}

export const REHEARSAL_SCENES: SceneScript[] = [
  {
    sceneNumber: "SCÈNE 01",
    slideIndex: 0,
    title: "OUVERTURE & ÉVEIL D'AURA (2030)",
    duration: "35 secondes",
    summary: "Écran noir spatial → Carillon d'éveil → Accueil vocal d'AURA (Voix Julie) → Lancement par Mahmoud et Louay",
    steps: [
      {
        stepIndex: 0,
        speaker: "SYSTEME",
        speakerLabel: "ACTION SCÈNE • SYSTÈME",
        actionTag: "[CLIC DÉPART] Faire un Clic Gauche n'importe où sur l'écran pour réveiller AURA.",
        speech: "En attente du clic initial pour activer le noyau neuronal de 2030…",
        stageTip: "Mahmoud et Louay sont debout face à la classe, silencieux, confiants et souriants.",
        partnerAction: "Mahmoud et Louay attendent le clic initial."
      },
      {
        stepIndex: 1,
        speaker: "AURA",
        speakerLabel: "AURA • VOIX JULIE",
        actionTag: "[ATTENDRE • NE PAS CLIQUER] Attendre qu'AURA ait terminé sa phrase. Le cerveau 3D s'illumine.",
        waitVoice: true,
        speech: "Bonjour Mahmoud ! Bonjour Louay ! Bienvenue en 2030. Je suis AURA, votre intelligence artificielle. Tout est prêt !",
        stageTip: "Sourire en entendant vos prénoms prononcés par la voix d'AURA.",
        partnerAction: "Louay et Mahmoud se tournent vers le public ensemble."
      },
      {
        stepIndex: 2,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer une fois après avoir posé la question à AURA.",
        speech: "Bonjour à tous ! Merci AURA. Avec Louay Kouki, nous vous présentons l'intelligence artificielle en 2030. AURA, où sommes-nous ?",
        stageTip: "Salue la classe d'un geste amical puis regarde l'écran 3D pour interroger AURA.",
        partnerAction: "Louay regarde la classe et acquiesce avec le sourire."
      },
      {
        stepIndex: 3,
        speaker: "AURA",
        speakerLabel: "AURA • VOIX JULIE",
        actionTag: "[ATTENDRE • NE PAS CLIQUER] Attendre la fin de la voix d'AURA (~4 secondes).",
        waitVoice: true,
        speech: "Vous êtes dans le futur. Aujourd'hui, nous allons voir comment l'intelligence artificielle transforme notre monde.",
        stageTip: "Écouter AURA avec intérêt en regardant l'hologramme 3D.",
        partnerAction: "Mahmoud invite la classe du regard."
      },
      {
        stepIndex: 4,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour passer au Plan et à la Définition.",
        speech: "Exactement ! Aujourd'hui, avec Mahmoud Dammak, nous allons explorer le futur en direct. C'est parti !",
        stageTip: "Ton très dynamique et enthousiaste. Geste d'ouverture des bras vers la classe.",
        partnerAction: "Mahmoud se prépare pour la définition de l'IA."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 02",
    slideIndex: 2,
    title: "DÉFINITION, HISTOIRE & FONCTIONNEMENT",
    duration: "50 secondes",
    summary: "Qu'est-ce que l'IA ? • Le voyage de 1950 à 2030 • Les 3 étapes (Données, Algorithmes, Neurones)",
    steps: [
      {
        stepIndex: 0,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer après la question pour faire parler Mahmoud.",
        speech: "Pour commencer, posons une question simple : qu'est-ce que l'intelligence artificielle ?",
        stageTip: "Pose la question avec clarté en fixant la classe pour capter toute leur attention.",
        partnerAction: "Mahmoud prend la parole en enchaînant naturellement."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour passer au tunnel temporel (Histoire).",
        speech: "C'est un programme informatique qui apprend, comprend notre voix, traduit les langues et nous aide tous les jours.",
        stageTip: "Diction posée, montre les 3 cartes sur l'écran.",
        partnerAction: "Louay pointe les exemples du quotidien à l'écran."
      },
      {
        stepIndex: 2,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour expliquer comment l'IA réfléchit.",
        speech: "Tout commence en 1950 avec Alan Turing, puis les échecs en 1997, l'IA générative en 2022, et enfin 2030 !",
        stageTip: "Fait un geste de la main de gauche à droite pour suivre la ligne du temps.",
        partnerAction: "Mahmoud se prépare à compter les 3 éléments du cerveau IA."
      },
      {
        stepIndex: 3,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour passer à la Scène 3 (Les 3 Niveaux & L'Éveil).",
        speech: "Et comment ça marche ? Il y a trois éléments : beaucoup de données, des algorithmes, et un réseau de neurones !",
        stageTip: "Compte sur ses doigts : 1 (données), 2 (algorithmes), 3 (neurones). Très visuel !",
        partnerAction: "Louay se tourne vers l'écran pour présenter les 3 niveaux d'IA."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 03",
    slideIndex: 5,
    title: "LES 3 NIVEAUX D'IA & L'ÉVEIL AU SMARTPHONE",
    duration: "65 secondes",
    summary: "IA Faible, Générale, Superintelligence • Commande en direct avec le vrai téléphone portable de Mahmoud",
    steps: [
      {
        stepIndex: 0,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour montrer l'évolution des 3 paliers.",
        speech: "Regardons les trois niveaux d'IA : d'abord l'IA faible d'aujourd'hui, puis l'IA générale en 2030, et enfin la superintelligence.",
        stageTip: "Montre la sphère 3D qui grandit à chaque palier sur l'écran.",
        partnerAction: "Mahmoud sort son vrai téléphone portable de sa poche."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour lancer le scénario fictif de la superintelligence.",
        speech: "La superintelligence est un scénario fictif : une machine qui dépasserait tous les cerveaux humains réunis !",
        stageTip: "Montre le badge 'SCÉNARIO FICTIF' à l'écran avec un ton captivant.",
        partnerAction: "Louay annonce le test en direct avec le smartphone."
      },
      {
        stepIndex: 2,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour préparer la commande vocale de Mahmoud.",
        speech: "Maintenant, le moment magique ! Mahmoud Dammak va donner un ordre à AURA avec son téléphone portable.",
        stageTip: "Passe la main à Mahmoud en le désignant. Crée le suspense dans la classe !",
        partnerAction: "Mahmoud lève son vrai téléphone portable bien haut face à la classe."
      },
      {
        stepIndex: 3,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer juste après avoir parlé dans le téléphone pour déclencher AURA.",
        speech: "Regardez mon téléphone portable. Je dis simplement : “AURA, montre-nous la ville et la santé de 2030 !”",
        stageTip: "Parle directement dans son vrai smartphone face au public comme en direct.",
        partnerAction: "Louay pointe l'écran 3D pour que toute la classe voie la réaction."
      },
      {
        stepIndex: 4,
        speaker: "AURA",
        speakerLabel: "AURA • VOIX JULIE",
        actionTag: "[ATTENDRE • NE PAS CLIQUER] ATTENDRE ! Ne pas cliquer pendant qu'AURA répond !",
        waitVoice: true,
        speech: "Bien sûr Mahmoud ! J'active la cité intelligente de 2030, les transports autonomes et la médecine du futur.",
        stageTip: "Silence sur scène ! Laisser résonner la voix d'AURA et admirer l'animation 3D.",
        partnerAction: "Mahmoud et Louay regardent l'écran s'animer avec émerveillement."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 04",
    slideIndex: 7,
    title: "LA VIE EN 2030 : CITÉ, SANTÉ, ÉDUCATION & ESPACE",
    duration: "55 secondes",
    summary: "Voitures autonomes • Diagnostics médicaux & Nanorobots • Tuteur IA • Espace & Cerveau-Machine",
    steps: [
      {
        stepIndex: 0,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour passer à la Santé du futur.",
        speech: "En deux secondes, nous voici dans la cité de 2030 : les voitures roulent toutes seules et la ville économise l'énergie !",
        stageTip: "Récapitule avec fierté et dynamisme en montrant la ville 3D.",
        partnerAction: "Mahmoud range calmement son téléphone portable."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour afficher l'Éducation et le Travail.",
        speech: "Pour la santé, l'IA détecte les maladies très tôt sur les scanners. Et en fiction, des nanorobots réparent notre corps !",
        stageTip: "Montre la double hélice d'ADN 3D en rotation sur l'écran.",
        partnerAction: "Louay se prépare à parler de l'école et des métiers."
      },
      {
        stepIndex: 2,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour montrer l'Espace et l'Humain augmenté.",
        speech: "À l'école, chaque élève a un tuteur personnel. Au travail, l'IA ne remplace pas l'humain : ils travaillent ensemble !",
        stageTip: "Montre la poignée de main holographique entre le robot et l'humain.",
        partnerAction: "Mahmoud s'apprête à présenter l'espace et les implants."
      },
      {
        stepIndex: 3,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour passer aux Risques et au Dilemme.",
        speech: "Plus loin encore : l'IA pilote des fusées vers Mars et aide les personnes paralysées à remarcher par la pensée !",
        stageTip: "Ton enthousiaste et inspirant.",
        partnerAction: "Louay adopte une posture plus sérieuse pour la transition vers les risques."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 05",
    slideIndex: 12,
    title: "LES RISQUES, LE DILEMME & VOTE DE LA CLASSE",
    duration: "55 secondes",
    summary: "Vie privée, Deepfakes, Contrôle • Choix entre Futur Lumineux et Futur Sombre • Vote à main levée",
    steps: [
      {
        stepIndex: 0,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour détailler les 3 grands risques.",
        speech: "Mais attention : il y a aussi de vrais problèmes et une question centrale : pouvons-nous contrôler une superintelligence ?",
        stageTip: "Adopte un ton sérieux et attentif. Regarde la classe avec gravité.",
        partnerAction: "Mahmoud hoche la tête avec sérieux."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour ouvrir le Portail du Dilemme (Slide 14).",
        speech: "Il y a trois risques majeurs : la perte de la vie privée, les fausses vidéos deepfakes, et une trop grande dépendance.",
        stageTip: "Pose l'index sur la tempe pour inviter à la prudence et à l'esprit critique.",
        partnerAction: "Louay se prépare à montrer les deux futurs."
      },
      {
        stepIndex: 2,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour afficher le bilan Avantages vs Inconvénients.",
        speech: "Devant nous, il y a deux futurs possibles : un futur lumineux où l'IA nous protège, ou un futur sombre sans contrôle.",
        stageTip: "Clique sur les boutons Futur Lumineux / Futur Sombre pour montrer l'interaction.",
        partnerAction: "Mahmoud se tourne vers la classe pour poser la question à main levée."
      },
      {
        stepIndex: 3,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Attendre 3-4 secondes en comptant les mains levées, puis cliquer.",
        speech: "Une question pour vous tous : qui pense que l'IA en 2030 sera une chance pour l'humanité ? Levez la main !",
        stageTip: "Lève la main en souriant et compte à voix haute : '1, 2, 5, 10 mains... Super !'",
        partnerAction: "Louay regarde les élèves, sourit et commente les réponses."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 06",
    slideIndex: 15,
    title: "NOTRE PLAN DE TRAVAIL EN 5 ÉTAPES",
    duration: "30 secondes",
    summary: "Présentation claire de l'organisation de Mahmoud Dammak et Louay Kouki",
    steps: [
      {
        stepIndex: 0,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[CLIC GAUCHE →] Cliquer pour détailler la réalisation 3D.",
        speech: "Voici notre plan de travail en cinq étapes : d'abord les recherches scientifiques, puis la rédaction de textes simples.",
        stageTip: "Montre les étapes 01 et 02 sur la ligne lumineuse.",
        partnerAction: "Mahmoud se prépare à présenter les étapes 03 à 05."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour lancer la Scène Finale et la dernière phrase d'AURA.",
        speech: "Ensuite, nous avons créé les modèles 3D, répété notre oral ensemble, pour vous présenter ce projet aujourd'hui !",
        stageTip: "Montre les étapes 03, 04 et 05 avec fierté.",
        partnerAction: "Louay et Mahmoud se placent côte à côte au centre pour le final."
      }
    ]
  },
  {
    sceneNumber: "SCÈNE 07",
    slideIndex: 16,
    title: "CONCLUSION D'AURA & GRAND DÉBAT",
    duration: "30 secondes",
    summary: "Message final d'AURA (Voix Julie) • Question d'ouverture au débat • Salut final sous les applaudissements",
    steps: [
      {
        stepIndex: 0,
        speaker: "AURA",
        speakerLabel: "AURA • VOIX JULIE",
        actionTag: "[ATTENDRE • NE PAS CLIQUER] Attendre la voix d'AURA (~4 secondes).",
        waitVoice: true,
        speech: "Avant de terminer, retenez bien ceci : le futur ne se prédit pas, il se construit. Ensemble. À vous de jouer !",
        stageTip: "Mahmoud et Louay écoutent AURA puis regardent le public avec le sourire.",
        partnerAction: "Se tenir prêts pour le mot de la fin."
      },
      {
        stepIndex: 1,
        speaker: "MAHMOUD",
        speakerLabel: "MAHMOUD • PRÉSENTATEUR 1",
        actionTag: "[CLIC GAUCHE →] Cliquer pour la phrase finale de remerciement.",
        speech: "La technologie propose, mais c'est toujours à l'être humain de décider. Et vous, êtes-vous prêts pour 2030 ?",
        stageTip: "Pose la question avec conviction en regardant toute la classe.",
        partnerAction: "Louay prépare le salut final."
      },
      {
        stepIndex: 2,
        speaker: "LOUAY",
        speakerLabel: "LOUAY • PRÉSENTATEUR 2",
        actionTag: "[ATTENDRE • NE PAS CLIQUER] FIN ! Laisser l'écran final affiché.",
        speech: "Mahmoud Dammak et moi vous remercions pour votre attention ! La parole est à vous pour vos questions !",
        stageTip: "Mahmoud et Louay saluent ensemble la classe et le professeur sous les applaudissements.",
        partnerAction: "Mahmoud et Louay animent ensemble les réponses aux questions."
      }
    ]
  }
];