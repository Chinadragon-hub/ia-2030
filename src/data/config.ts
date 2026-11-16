export const PRESENTATION_CONFIG = {
 yearHero:
"2030",
 mainTitle: "L'INTELLIGENCE ARTIFICIELLE EN 2030",
 subTitle: "Vers la
Superintelligence : Une IA qui pense, dialogue et construit le futur",

presenter1Name: "Louay Kouki",
 presenter1Badge: "LOUAY · PRÉSENTATEUR 1",

presenter2Name: "Mahmoud Dammak",
 presenter2Badge: "MAHMOUD ·
PRÉSENTATEUR 2",
 assistantName: "AURA",
 assistantBadge: "AURA · VOIX
JULIE",
 assistantBookletBadge: "ASSISTANTE VOIX JULIE",
 assistantVoiceDesc:
"AURA, voix invisible intégrée, voix humaine chaleureuse : Microsoft Julie
(fr-FR)",
 classLevel: "Classe de Terminale — Spécialité Sciences &
Numérique",
 date: "Année scolaire 2026 - 2027",
 durationLabel: "8 à 10
minutes • Français clair et structuré (répartition 50/50 vérifiée)",
 appUrl:
"https://ia-2030.vercel.app/",
 telemetryCode: "SYS//2030 • LAT 36.80 • NŒUD
AURA-09"
};

export interface WorkPlanItem {
 number: string;
 icon:
string;
 title: string;
 description: string;
 duration: string;
 status:
'Terminé' | 'En cours' | 'À venir';
}

export const WORK_PLAN_DATA:
WorkPlanItem[] = [
 {
 number: "01",
 icon: "Search",
 title: "Recherche &
Sources",
 description: "Collecte de dossiers fiables (CNRS, INRIA, UNESCO,
CNIL).",
 duration: "2 sem.",
 status: "Terminé"
 },
 {
 number: "02",

icon: "FileText",
 title: "Rédaction & Script",
 description: "Synthèse des
idées clés et répartition 50/50 des répliques.",
 duration: "1 sem.",
 status:
"Terminé"
 },
 {
 number: "03",
 icon: "Box",
 title: "Modèles 3D &
Audio",
 description: "Création des 12 scènes 3D et de la voix d'AURA.",

duration: "2 sem.",
 status: "Terminé"
 },
 {
 number: "04",
 icon:
"CheckCircle",
 title: "Répétition Orale",
 description: "Vérification du
souffleur et synchronisation des clics.",
 duration: "4 jours",
 status: "En
cours"
 },
 {
 number: "05",
 icon: "Award",
 title: "Exposé Final",

description: "Présentation devant la classe et débat interactif.",
 duration:
"10 min",
 status: "À venir"
 }
];

export const KEY_MEMORABLE_PHRASES =
{
 louay: [
 "Bonjour à tous ! Merci AURA. Avec Mahmoud Dammak, nous vous
présentons l'intelligence artificielle en 2030.",
 "Pour commencer, posons une
question simple : qu'est-ce que l'intelligence artificielle ?",
 "Il existe
trois paliers : aujourd'hui l'IA faible, vers 2030 l'IA générale, et enfin la
superintelligence.",
 "Mahmoud Dammak et moi vous remercions pour votre
attention ! Avez-vous des questions ?"
 ],
 mahmoud: [
 "Aujourd'hui, avec
Louay Kouki, nous allons explorer ensemble nos vraies prévisions et les
scénarios du futur !",
 "Comment une IA réfléchit-elle ? D'abord des millions
de données, puis des algorithmes et un réseau de neurones.",
 "Regardez mon
téléphone portable : je demande simplement à AURA de nous projeter dans la cité
de 2030 !",
 "Une question pour vous tous : qui pense que nous réussirons à
bâtir le futur lumineux en 2030 ? Levez la main !"
 ]
};
