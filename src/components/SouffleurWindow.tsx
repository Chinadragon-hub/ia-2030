import React, { useEffect, useState }
from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ExternalLink,
ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { SLIDES_DATA,
SpeakerRole } from '../data/slides';
import { PRESENTATION_CONFIG } from
'../data/config';
import { syncManager } from '../utils/sync';

export const
getSpeakerBadgeText = (role: SpeakerRole): string => {
 if (role === 'LOUAY')
return PRESENTATION_CONFIG.presenter1Badge;
 if (role === 'MAHMOUD') return
PRESENTATION_CONFIG.presenter2Badge;
 return
PRESENTATION_CONFIG.assistantBadge;
};

export const getSpeakerBadgeStyle =
(role: SpeakerRole): string => {
 if (role === 'LOUAY') return 'bg-[#1E6BFF]
text-white border border-[#3DA5FF]';
 if (role === 'MAHMOUD') return
'bg-[#0A1838] text-[#A9D4FF] border border-[#3DA5FF]';
 return 'bg-[#3DA5FF]
text-[#05070D] font-black';
};

interface RegieBarProps {
 slideIndex:
number;
 stepIndex: number;
 isAuraSpeaking: boolean;
 drawerOpen: boolean;

setDrawerOpen: (v: boolean) => void;
 onOpenExternalSouffleur: () =>
void;
}

export const CompactRegieBar: React.FC = ({
 slideIndex,

stepIndex,
 isAuraSpeaking,
 drawerOpen,
 setDrawerOpen,

onOpenExternalSouffleur,
}) => {
 const slide = SLIDES_DATA[slideIndex] ||
SLIDES_DATA[0];
 const step = slide.steps[stepIndex] || slide.steps[0];


return (
 <div
 onClick={(e) => e.stopPropagation()}
 className="area-regie
w-full px-5 bg-[#070C18]/95 border-t border-blueCyan/30 flex flex-col
justify-center"
 >
 {/ Ligne compacte de 36px maximum : Badge intervenant +
indication courte /}
 <div className="h-[36px] flex items-center
justify-between gap-3">
 <div className="flex items-center gap-3 min-w-0">

<span className={txt-badge px-2.5 py-0.5 rounded shrink-0
${getSpeakerBadgeStyle(step.speaker)}}>
 {getSpeakerBadgeText(step.speaker)}


 <span className="font-title text-[14px] font-bold text-blueCyan shrink-0">

{isAuraSpeaking ? '⏳ attendre' : step.shortHint}
 
 {drawerOpen && (
 <span
className="text-[15px] text-white/90 truncate hidden sm:inline">
 «
{step.speech} »
 
 )}
 

 <div className="flex items-center gap-2
shrink-0">
 <button
 onClick={() => setDrawerOpen(!drawerOpen)}

className="px-2.5 py-1 rounded bg-[#0A1020] border border-blueCyan/40
text-[13px] font-title text-blueIce hover:text-white flex items-center gap-1"

>
 {drawerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp
className="w-3.5 h-3.5" />}
 {drawerOpen ? 'Masquer tiroir' : 'Tiroir
secours'}
 
 <button
 onClick={onOpenExternalSouffleur}
 className="px-2.5
py-1 rounded bg-blueElectric/30 border border-blueCyan text-[13px] font-title
text-white hover:bg-blueElectric flex items-center gap-1"
 >
 <ExternalLink
className="w-3.5 h-3.5" />
 <span className="hidden md:inline">Fenêtre
souffleur (P)
 
 
 

 {/ Tiroir de secours ancré dans la grille (max 150px,
ne flotte jamais sur la 3D) /}
 {drawerOpen && (
 <div
className="max-h-[110px] overflow-y-auto py-2 border-t border-blueCyan/20 grid
grid-cols-1 md:grid-cols-3 gap-3 text-[15px]">
 <div
className="md:col-span-2">
 <p className="text-white font-semibold">«
{step.speech} »
 
 <div className="text-blueIce text-[14px] space-y-0.5">

Jeu : {step.stageTip}
 Coéquipier : {step.partnerAction}
 
 
 )}
 

);
};

export const StandaloneSouffleurPage: React.FC = () => {
 const
[slideIndex, setSlideIndex] = useState(0);
 const [stepIndex, setStepIndex] =
useState(0);
 const [elapsedSeconds, setElapsedSeconds] = useState(0);
 const
[isAuraSpeaking, setIsAuraSpeaking] = useState(false);

 useEffect(() => {

document.title = 'Souffleur Temps Réel — Louay Kouki & Mahmoud Dammak';
 const
unsub = syncManager.subscribe((payload) => {
 if (payload.type ===
'STATE_UPDATE') {
 if (payload.slideIndex !== undefined)
setSlideIndex(payload.slideIndex);
 if (payload.stepIndex !== undefined)
setStepIndex(payload.stepIndex);
 if (payload.elapsedSeconds !== undefined)
setElapsedSeconds(payload.elapsedSeconds);
 if (payload.isAuraSpeaking !==
undefined) setIsAuraSpeaking(payload.isAuraSpeaking);
 }
 });
 return
unsub;
 }, []);

 const slide = SLIDES_DATA[slideIndex] || SLIDES_DATA[0];

const step = slide.steps[stepIndex] || slide.steps[0];

 const nextStepPreview
= (() => {
 if (stepIndex + 1 < slide.steps.length) {
 return
slide.steps[stepIndex + 1];
 }
 if (slideIndex + 1 < SLIDES_DATA.length) {

return SLIDES_DATA[slideIndex + 1].steps[0];
 }
 return null;
 })();


const formatTimer = (secs: number) =>
 ${String(Math.floor(secs
/ 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')};

 return (

<div className="min-h-screen bg-[#05070D] text-white p-6 flex flex-col
justify-between gap-6">
 <header className="flex flex-wrap items-center
justify-between gap-4 pb-4 border-b border-blueCyan/40">
 
 <span
className="txt-badge text-blueCyan block">RÉGIE & SOUFFLEUR SYNCHRONISÉ
 <h1
className="font-title text-2xl font-bold text-white">
 {slide.sceneNumber} —
{slide.title}
 
 
 <div className="flex items-center gap-4">
 <div
className="px-4 py-2 rounded-lg bg-[#0A1020] border border-blueCyan flex
items-center gap-2 font-title text-lg">
 <Clock className="w-5 h-5
text-blueCyan" />
 {formatTimer(elapsedSeconds)}
 
 <div className="px-4 py-2
rounded-lg bg-[#0A1020] border border-blueCyan font-title text-lg">
 Slide
{String(slideIndex + 1).padStart(2, '0')} / {SLIDES_DATA.length}
 
 
 


<main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div
className="lg:col-span-2 cyber-card p-6 flex flex-col justify-between
space-y-4">
 <div className="space-y-3">
 <div className="flex flex-wrap
items-center justify-between gap-3">
 <span className={px-4 py-1.5 rounded-lg
font-title text-lg font-bold ${getSpeakerBadgeStyle(step.speaker)}}>

{getSpeakerBadgeText(step.speaker)}
 
 <span className="font-title text-lg
font-bold text-blueCyan">
 {isAuraSpeaking ? '⏳ VOIX D'AURA EN COURS —
ATTENDRE' : step.clickIndication}
 
 

 <p className="text-blueIce
font-title text-base">
 Étape {stepIndex} : {step.title}
 

 <div
className="p-5 rounded-xl bg-[#05070D] border-2 border-blueCyan">
 <p
className="text-2xl sm:text-3xl font-bold leading-snug text-white">
 «
{step.speech} »
 
 
 

 <div className="grid grid-cols-1 sm:grid-cols-2
gap-4 pt-2">
 <div className="p-4 rounded-lg bg-[#0A1020] border
border-blueCyan/40">
 <span className="txt-badge text-blueCyan block
mb-1">CONSEIL DE JEU
 <p className="text-base text-white">{step.stageTip}
 

<div className="p-4 rounded-lg bg-[#0A1020] border border-blueCyan/40">
 <span
className="txt-badge text-blueIce block mb-1">ACTION DU COÉQUIPIER
 <p
className="text-base text-white">{step.partnerAction}
 
 
 

 <div
className="cyber-card p-6 flex flex-col justify-between space-y-4">
 
 <span
className="txt-badge text-blueIce block mb-2">APERÇU RÉPLIQUE SUIVANTE

{nextStepPreview ? (
 <div className="p-4 rounded-lg bg-[#05070D] border
border-blueCyan/30 space-y-2">
 <span className={inline-block px-3 py-1 rounded
text-xs font-title font-bold
${getSpeakerBadgeStyle(nextStepPreview.speaker)}}>

{getSpeakerBadgeText(nextStepPreview.speaker)}
 
 <p className="text-base
text-[#E8EEF9]">« {nextStepPreview.speech} »
 
 ) : (
 <p
className="text-base text-blueIce">Fin de la présentation.
 )}
 

 <div
className="p-4 rounded-lg bg-[#0A1020] border border-blueCyan/30">
 <span
className="txt-badge text-blueCyan block mb-1">RÈGLE CRITIQUE DE LA SCÈNE
 <p
className="text-base text-white">{slide.criticalRule}
 
 
 

 <footer
className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t
border-blueCyan/40">
 <button
 onClick={() => syncManager.send({ type:
'COMMAND', command: 'RESTART' })}
 className="px-5 py-3 rounded-xl bg-[#0A1020]
border border-blueCyan font-title text-base font-bold text-white
hover:border-white flex items-center gap-2"
 >
 <RotateCcw className="w-5 h-5
text-blueCyan" />
 Recommencer la scène (R)
 

 <div className="flex
items-center gap-4">
 <button
 onClick={() => syncManager.send({ type:
'COMMAND', command: 'PREV' })}
 className="px-6 py-3 rounded-xl bg-[#0A1020]
border border-blueCyan font-title text-base font-bold text-white
hover:border-white flex items-center gap-2"
 >
 <ChevronLeft className="w-5
h-5 text-blueCyan" />
 Précédent
 
 <button
 onClick={() =>
syncManager.send({ type: 'COMMAND', command: 'NEXT' })}
 className="px-8 py-3
rounded-xl bg-blueElectric hover:bg-blueCyan font-title text-base font-bold
text-white flex items-center gap-2"
 >
 Suivant
 <ChevronRight className="w-5
h-5" />
 
 
 
 
 );
};
