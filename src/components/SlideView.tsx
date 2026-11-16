import React, { useState } from
'react';
import * as Icons from 'lucide-react';
import { SlideData } from
'../data/slides';
import { PRESENTATION_CONFIG, WORK_PLAN_DATA } from
'../data/config';
import { soundEngine } from '../utils/sound';

interface
SlideViewProps {
 slide: SlideData;
 onSelectSlide: (index: number) => void;

clearTextMode: boolean;
 onChangeAiScale: (scale: number) => void;

dilemmaChoice: 'bright' | 'dark';
 onChangeDilemma: (choice: 'bright' | 'dark')
=> void;
}

const formatHighlightedText = (text: string) => {
 const parts =
text.split(/([^*]+)/g);
 return parts.map((part, i) => {
 if
(part.startsWith('') && part.endsWith('')) {
 return (
 <strong key={i}
className="text-[#A9D4FF] font-bold">
 {part.slice(1, -1)}
 
 );
 }
 return
{part};
 });
};

const renderDynamicIcon = (iconName?: string) => {
 if
(!iconName) return <Icons.Cpu className="w-5 h-5 text-blueCyan shrink-0" />;

const IconComp =
 (Icons as Record<string, React.ComponentType<{ className?:
string }>>)[iconName] || Icons.Cpu;
 return <IconComp className="w-5 h-5
text-blueCyan shrink-0" />;
};

export const SlideContentColumn: React.FC =
({
 slide,
 onSelectSlide,
 clearTextMode,
 onChangeAiScale,

dilemmaChoice,
 onChangeDilemma,
}) => {
 const [selectedLevel,
setSelectedLevel] = useState(1);

 return (
 <div
 onClick={(e) =>
e.stopPropagation()}
 className={scene-card-col h-full min-h-0 overflow-y-auto
cyber-card p-5 flex flex-col justify-between ${
 slide.isFictional ?
'cyber-card-fictional' : ''
 }}
 >
 <div className="space-y-4">
 <div
className="flex flex-wrap items-center justify-between gap-2 border-b
border-blueCyan/25 pb-2.5">
 <span className="txt-badge
text-blueIce">{slide.sceneCode}
 {slide.isFictional && (
 <span
className="txt-badge px-2.5 py-0.5 rounded badge-fictional">
 ★ SCÉNARIO
FICTIF
 
 )}
 

 {slide.layout === 'prologue' && (
 <div
className="font-title text-[52px] font-black text-blueCyan leading-none
tracking-tight">
 {PRESENTATION_CONFIG.yearHero}
 
 )}

 <h1
className={txt-title text-white ${clearTextMode ? '' : 'glitch-once'}}>

{slide.title}
 

 <p className="txt-subtitle
text-[#E8EEF9]">{slide.subtitle}

 {slide.layout === 'prologue' && (
 <div
className="space-y-2.5 pt-2">
 <div className="p-3.5 rounded-lg bg-[#05070D]/90
border-l-4 border-l-blueElectric">
 <span className="txt-badge text-blueIce
block">PRÉSENTATEURS
 <p className="txt-card text-white font-bold">

{PRESENTATION_CONFIG.presenter1Name} (Présentateur 1) •
{PRESENTATION_CONFIG.presenter2Name} (Présentateur 2)
 
 
 <div
className="p-3.5 rounded-lg bg-[#05070D]/90 border-l-4 border-l-blueCyan">

<span className="txt-badge text-blueIce block">ASSISTANTE VOCALE IA
 <p
className="txt-card text-white font-bold">

{PRESENTATION_CONFIG.assistantVoiceDesc}
 
 
 <div className="p-3.5
rounded-lg bg-[#05070D]/90 border-l-4 border-l-blueIce">
 <span
className="txt-badge text-blueIce block">CLASSE & SESSION
 <p
className="txt-card text-white">
 {PRESENTATION_CONFIG.classLevel} •
{PRESENTATION_CONFIG.date}
 
 
 
 )}

 {slide.layout === 'gates-menu' &&
slide.cards && (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5
pt-1">
 {slide.cards.map((gate, i) => (
 <button
 key={i}
 onClick={() =>
{
 soundEngine.playBeep(740, 0.06);
 if (gate.targetSlide !== undefined)
onSelectSlide(gate.targetSlide);
 }}
 className="p-3 rounded-lg
bg-[#05070D]/90 border border-blueCyan/35 hover:border-white text-left
transition-all"
 >
 <div className="flex items-center justify-between mb-1">

<span className="txt-badge text-blueCyan">{gate.tag}
 <Icons.ArrowUpRight
className="w-4 h-4 text-blueIce" />
 
 <h2 className="txt-card font-bold
text-white">{gate.title}
 <p className="txt-card
text-[#E8EEF9]">{formatHighlightedText(gate.description)}
 
 ))}
 
 )}


{slide.layout === 'cards' && slide.cards && (
 <div className="space-y-2.5
pt-1">
 {slide.cards.map((card, idx) => (
 <div
 key={idx}
 className={p-3.5
rounded-lg bg-[#05070D]/90 border ${
 card.isFictional ? 'border-[#B026FF]' :
'border-blueCyan/35'
 }}
 >
 <div className="flex items-center
justify-between gap-2 mb-1">
 <div className="flex items-center gap-2">

{renderDynamicIcon(card.icon)}
 <h2 className="txt-card font-bold
text-white">{card.title}
 
 {card.tag && (
 <span
 className={txt-badge px-2
py-0.5 rounded ${
 card.isFictional ? 'badge-fictional' : 'bg-blueElectric/25
text-blueIce'
 }}
 >
 {card.tag}
 
 )}
 
 <p className="txt-card
text-[#E8EEF9]">
 {formatHighlightedText(card.description)}
 
 
 ))}
 

)}

 {slide.layout === 'timeline-history' && slide.timeline && (
 <div
className="space-y-2 pt-1">
 {slide.timeline.map((item, idx) => (
 <div

key={idx}
 className="p-2.5 rounded-lg bg-[#05070D]/90 border-l-4
border-l-blueCyan flex items-center justify-between gap-3"
 >
 
 <span
className="txt-badge text-blueCyan mr-2">{item.year}
 <strong
className="txt-card text-white font-bold">{item.title}
 <p className="txt-card
text-[#E8EEF9]">
 {formatHighlightedText(item.description)}
 
 
 
 ))}
 

)}

 {slide.layout === 'ai-levels' && slide.levels && (
 <div
className="space-y-2.5 pt-1">
 {slide.levels.map((lvl, idx) => {
 const active
= selectedLevel === idx;
 return (
 <button
 key={idx}
 onClick={() => {

setSelectedLevel(idx);
 onChangeAiScale(lvl.scale);
 soundEngine.playBeep(500
+ idx * 180, 0.08);
 }}
 className={w-full p-3.5 rounded-lg text-left
transition-all border ${
 active
 ? 'bg-blueElectric/25 border-white
shadow-glow'
 : 'bg-[#05070D]/90 border-blueCyan/35 hover:border-blueCyan'

}}
 >
 <div className="flex items-center justify-between mb-1">
 <span
className="txt-badge text-blueCyan">
 {lvl.level} — {lvl.name}
 
 <span

className={txt-badge px-2 py-0.5 rounded ${
 lvl.tag.includes('FICTIF')
 ?
'badge-fictional'
 : 'bg-blueElectric/30 text-white'
 }}
 >
 {lvl.tag}
 


 <p className="txt-card text-[#E8EEF9] mb-2">

{formatHighlightedText(lvl.description)}
 
 <div className="w-full h-2
bg-[#05070D] rounded-full overflow-hidden">
 <div
 className="h-full
bg-gradient-to-r from-blueElectric to-blueCyan"
 style={{ width: ${lvl.gauge}%
}}
 />
 
 
 );
 })}
 
 )}

 {slide.layout === 'dilemma' &&
slide.dilemma && (
 <div className="space-y-3 pt-1">
 <div className="grid
grid-cols-2 gap-2">
 <button
 onClick={() => {
 onChangeDilemma('bright');

soundEngine.playBeep(880, 0.08);
 }}
 className={p-2.5 rounded-lg txt-badge
text-center border transition-all ${
 dilemmaChoice === 'bright'
 ?
'bg-blueElectric text-white border-white'
 : 'bg-[#05070D] text-blueIce
border-blueCyan/35'
 }}
 >
 ☀ FUTUR LUMINEUX
 
 <button
 onClick={() =>
{
 onChangeDilemma('dark');
 soundEngine.playBeep(320, 0.1);
 }}

className={p-2.5 rounded-lg txt-badge text-center border transition-all ${

dilemmaChoice === 'dark'
 ? 'badge-fictional'
 : 'bg-[#05070D] text-blueIce
border-blueCyan/35'
 }}
 >
 ⚡ FUTUR SOMBRE
 
 

 <div className="p-4
rounded-lg bg-[#05070D]/90 border border-blueCyan/40 space-y-2">
 <h2
className="txt-card font-bold text-white">
 {dilemmaChoice === 'bright' ?
slide.dilemma.bright.title : slide.dilemma.dark.title}
 
 <p
className="txt-card text-blueIce">
 {dilemmaChoice === 'bright'
 ?
slide.dilemma.bright.subtitle
 : slide.dilemma.dark.subtitle}
 
 <ul
className="space-y-1.5 pt-1">
 {(dilemmaChoice === 'bright'
 ?
slide.dilemma.bright.points
 : slide.dilemma.dark.points
 ).map((pt, i) => (

<li key={i} className="txt-card text-white flex items-start gap-2">
 <span
className="text-blueCyan font-bold">▸
 {formatHighlightedText(pt)}
 
 ))}


 
 
 )}

 {slide.layout === 'comparison' && slide.comparison && (
 <div
className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
 <div className="p-3
rounded-lg bg-[#05070D]/90 border border-blueCyan/40 space-y-2">
 <span
className="txt-badge text-blueCyan block">✓ AVANTAGES

{slide.comparison.pros.map((p, i) => (
 
 <strong className="txt-card
text-white font-bold block">{p.title}
 <p className="txt-card
text-[#E8EEF9]">{formatHighlightedText(p.desc)}
 
 ))}
 
 <div
className="p-3 rounded-lg bg-[#05070D]/90 border border-[#B026FF]/60
space-y-2">
 <span className="txt-badge text-[#E8EEF9] block">⚠ INCONVÉNIENTS

{slide.comparison.cons.map((c, i) => (
 
 <strong className="txt-card
text-white font-bold block">{c.title}
 <p className="txt-card
text-[#E8EEF9]">{formatHighlightedText(c.desc)}
 
 ))}
 
 
 )}


{slide.layout === 'workplan' && (
 <div className="p-4 rounded-lg
bg-[#05070D]/90 border border-blueCyan/40 space-y-2">
 <span
className="txt-badge text-blueCyan block">MÉTHODOLOGIE EN 5 ÉTAPES
 <p
className="txt-card text-white">
 Répartition équilibrée 50/50 entre{' '}

<strong className="text-[#A9D4FF]">{PRESENTATION_CONFIG.presenter1Name}
(Présentateur 1) et{' '}
 <strong
className="text-[#A9D4FF]">{PRESENTATION_CONFIG.presenter2Name}
(Présentateur 2).
 
 <p className="txt-card text-blueIce">
 Consultez les 5
cartes d'étapes et leurs badges de statut alignés ci-dessous.
 
 
 )}


{slide.layout === 'conclusion' && (
 <div className="space-y-3 pt-1">
 <div
className="p-4 rounded-lg bg-[#05070D]/90 border-l-4 border-l-blueCyan">
 <h2
className="txt-card font-bold text-white mb-1">1. Le message d'AURA
 <p
className="txt-card text-[#E8EEF9]">
 L'IA est un formidable accélérateur
scientifique, mais l'éthique et la décision
 appartiennent toujours à l'être
humain.
 
 
 <div className="p-4 rounded-lg bg-blueElectric/20 border
border-blueCyan">
 <h2 className="txt-subtitle font-bold text-white mb-1">

MERCI ! AVEZ-VOUS DES QUESTIONS ?
 
 <p className="txt-card text-blueIce
mb-3">
 Présentation réalisée par {PRESENTATION_CONFIG.presenter1Name}
(Présentateur 1) &{' '}
 {PRESENTATION_CONFIG.presenter2Name}
(Présentateur 2).
 
 <button
 onClick={() => onSelectSlide(0)}

className="px-4 py-2 rounded-lg bg-blueElectric hover:bg-blueCyan text-white
txt-badge transition-colors"
 >
 ↺ Revenir à la Scène 01
 
 
 
 )}


{slide.layout === 'sources' && slide.sources && (
 <div className="grid
grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
 {slide.sources.map((src, idx) => (

<a
 key={idx}
 href={src.url}
 target="_blank"
 rel="noopener noreferrer"

className="p-3 rounded-lg bg-[#05070D]/90 border border-blueCyan/35
hover:border-white block"
 >
 <div className="flex items-center
justify-between">
 <span className="txt-badge text-blueCyan">{src.name}

<Icons.ExternalLink className="w-4 h-4 text-blueIce" />
 
 <p
className="txt-card text-white font-semibold">{src.org}
 <p className="txt-card
text-[#E8EEF9]">{formatHighlightedText(src.desc)}
 
 ))}
 
 )}
 

 <div
className="pt-3 mt-3 border-t border-blueCyan/20 flex items-center
justify-between text-[14px] text-blueIce/80 font-title">
 DURÉE SCÈNE :
{slide.duration}
 {PRESENTATION_CONFIG.telemetryCode}
 
 
 );
};

export
const WorkPlanHorizontalStrip: React.FC = () => {
 return (
 <div

onClick={(e) => e.stopPropagation()}
 className="col-span-full grid grid-cols-1
sm:grid-cols-5 gap-3 pt-1"
 >
 {WORK_PLAN_DATA.map((item) => {
 const isDone
= item.status === 'Terminé';
 const isCurrent = item.status === 'En cours';

return (
 <div
 key={item.number}
 className={cyber-card p-3 flex flex-col
justify-between ${
 isCurrent ? 'border-2 border-blueCyan' : ''
 }}
 >
 

<div className="flex items-center justify-between gap-2 mb-1">
 <span
className="font-title text-[18px] font-black text-blueCyan">
 {item.number}


 {renderDynamicIcon(item.icon)}
 
 <h3 className="txt-card font-bold
text-white mb-0.5">{item.title}
 <p className="txt-card text-[#E8EEF9]
mb-2">{item.description}
 
 <div className="pt-2 border-t border-blueCyan/25
flex items-center justify-between gap-1">
 <span className="txt-badge
text-blueIce">⏱ {item.duration}
 <span
 className={txt-badge px-2 py-0.5
rounded ${
 isDone
 ? 'bg-blueElectric text-white'
 : isCurrent
 ?
'bg-blueCyan text-[#05070D] animate-pulse'
 : 'bg-[#05070D] text-blueIce border
border-blueIce/40'
 }}
 >
 {item.status}
 
 
 
 );
 })}
 
 );
};
