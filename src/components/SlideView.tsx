import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SlideData, PRESENTATION_META, WORK_PLAN_STEPS } from '../data/slides';
import { AnimatedCounter } from './AnimatedCounter';
import { soundEngine } from '../utils/sound';

interface SlideViewProps {
  slide: SlideData;
  onSelectSlide: (index: number) => void;
  clearTextMode: boolean;
  onChangeAiScale: (scale: number) => void;
  dilemmaChoice: 'bright' | 'dark';
  onChangeDilemma: (choice: 'bright' | 'dark') => void;
}

// Formate les mots entourés d'astérisques en gras bleu glacé #A9D4FF
const formatHighlightedText = (text: string) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <strong key={i} className="text-[#A9D4FF] font-bold">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const renderDynamicIcon = (iconName?: string) => {
  if (!iconName) return <Icons.Cpu className="w-7 h-7 text-blueCyan shrink-0" />;
  const IconComp =
    (Icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || Icons.Cpu;
  return <IconComp className="w-7 h-7 text-blueCyan shrink-0" />;
};

export const SlideView: React.FC<SlideViewProps> = ({
  slide,
  onSelectSlide,
  clearTextMode,
  onChangeAiScale,
  dilemmaChoice,
  onChangeDilemma,
}) => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const words = slide.title.split(' ');

  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: clearTextMode ? 0.15 : 0.45 }}
      className="relative z-10 w-full h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-20 pb-24 overflow-y-auto"
    >
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* BARRE DE DIALOGUE D'AURA (Toujours stable, grande et lisible en haut) */}
        <div className="hud-panel px-6 py-4 rounded-2xl border-l-4 border-l-blueCyan flex flex-wrap items-center justify-between gap-4 max-w-5xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blueElectric/30 border-2 border-blueCyan flex items-center justify-center shrink-0 shadow-glow">
              <Icons.Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-title text-hud-min text-blueCyan font-bold tracking-wider uppercase block">
                IA NARRATRICE // AURA
              </span>
              <p className="text-hud-body text-white font-semibold">{slide.auraQuote}</p>
            </div>
          </div>

          {slide.isFictional && (
            <span className="px-4 py-1.5 rounded-full bg-blueElectric text-white font-title text-hud-min font-bold tracking-wider uppercase shadow-glow">
              ★ SCÉNARIO FICTIF
            </span>
          )}
        </div>

        {/* EN-TÊTE DE LA SLIDE DANS UN PANNEAU SOMBRE OPAQUE (90%) */}
        <div className="hud-panel p-6 sm:p-8 rounded-2xl max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="w-3 h-3 rounded-full bg-blueCyan" />
            <span className="font-title text-hud-min text-blueIce tracking-widest uppercase font-bold">
              {slide.section}
            </span>
          </div>

          {slide.layout === 'prologue' && (
            <div className="font-title text-[64px] sm:text-[92px] font-black text-blueCyan text-glow leading-none mb-2">
              {PRESENTATION_META.yearHero}
            </div>
          )}

          {/* Titre >= 56px sur ordinateur, net en moins de 0.7s */}
          <h1 className="font-title text-hud-title text-white tracking-tight mb-4 flex flex-wrap gap-x-4 gap-y-1">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={clearTextMode ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, delay: clearTextMode ? 0 : idx * 0.04 }}
                className={idx >= words.length - 2 ? 'text-blueCyan text-glow' : 'text-white'}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sous-titre >= 32px sur ordinateur */}
          <p className="text-hud-subtitle text-[#E8EEF9]">{slide.subtitle}</p>
        </div>

        {/* 1. PROLOGUE : MÉTADONNÉES ÉLÈVE / CLASSE / DATE */}
        {slide.layout === 'prologue' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
            <div className="hud-panel p-6 rounded-2xl border-l-4 border-l-blueElectric">
              <p className="font-title text-hud-min text-blueIce uppercase mb-1">Présenté par</p>
              <p className="text-hud-body text-white font-bold">{PRESENTATION_META.authors}</p>
            </div>
            <div className="hud-panel p-6 rounded-2xl border-l-4 border-l-blueCyan">
              <p className="font-title text-hud-min text-blueIce uppercase mb-1">Classe</p>
              <p className="text-hud-body text-white font-bold">{PRESENTATION_META.classLevel}</p>
            </div>
            <div className="hud-panel p-6 rounded-2xl border-l-4 border-l-blueIce">
              <p className="font-title text-hud-min text-blueIce uppercase mb-1">Date</p>
              <p className="text-hud-body text-white font-bold">{PRESENTATION_META.date}</p>
            </div>
          </div>
        )}

        {/* 2. MENU HOLOGRAPHIQUE À 6 PORTES (SLIDE 2) */}
        {slide.layout === 'gates-menu' && slide.cards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
            {slide.cards.map((gate, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  soundEngine.playBeep(740, 0.08);
                  if (gate.targetSlide !== undefined) onSelectSlide(gate.targetSlide);
                }}
                initial={clearTextMode ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: clearTextMode ? 0 : i * 0.08 }}
                className="hud-panel p-6 rounded-2xl text-left hover:border-white transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-title text-hud-min text-blueCyan font-bold">
                    {gate.tag}
                  </span>
                  <Icons.ArrowUpRight className="w-6 h-6 text-blueIce group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h2 className="font-title text-hud-body font-bold text-white mb-2">
                  {gate.title}
                </h2>
                <p className="text-hud-min text-[#E8EEF9]">
                  {formatHighlightedText(gate.description)}
                </p>
              </motion.button>
            ))}
          </div>
        )}

        {/* 3. CARTES DE CONTENU (3 CARTES MAX, PHRASES COURTES <= 15 MOTS) */}
        {slide.layout === 'cards' && slide.cards && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
            {slide.cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={clearTextMode ? false : { opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: clearTextMode ? 0 : idx * 0.12 }}
                className="hud-panel p-7 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-blueElectric/25 border border-blueCyan">
                      {renderDynamicIcon(card.icon)}
                    </div>
                    {card.tag && (
                      <span
                        className={`px-3 py-1 rounded-lg font-title text-hud-min font-bold ${
                          card.isFictional
                            ? 'bg-blueElectric text-white'
                            : 'bg-blueElectric/25 text-blueIce'
                        }`}
                      >
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="font-title text-hud-body font-bold text-white mb-3">
                    {card.title}
                  </h2>
                  <p className="text-hud-body text-[#E8EEF9]">
                    {formatHighlightedText(card.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 4. VOYAGE DANS LE TEMPS (1950 -> 2030) */}
        {slide.layout === 'timeline-history' && slide.timeline && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl">
            {slide.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={clearTextMode ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: clearTextMode ? 0 : idx * 0.1 }}
                className="hud-panel p-6 rounded-2xl border-t-4 border-t-blueCyan"
              >
                <div className="font-title text-hud-subtitle font-black text-blueCyan mb-2">
                  {item.year}
                </div>
                <h2 className="font-title text-hud-body font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-hud-min text-[#E8EEF9]">
                  {formatHighlightedText(item.description)}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* 5. LES 3 NIVEAUX D'IA INTERACTIFS (SLIDE 6) */}
        {slide.layout === 'ai-levels' && slide.levels && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
            {slide.levels.map((lvl, idx) => {
              const isSelected = selectedLevel === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLevel(idx);
                    onChangeAiScale(lvl.scale);
                    soundEngine.playBeep(520 + idx * 180, 0.1);
                  }}
                  className={`p-7 rounded-2xl text-left transition-all ${
                    isSelected ? 'hud-panel-active' : 'hud-panel hover:border-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-title text-hud-min font-bold text-blueCyan">
                      {lvl.level}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-blueElectric/30 font-title text-hud-min text-white font-bold">
                      {lvl.tag}
                    </span>
                  </div>
                  <h2 className="font-title text-hud-body font-bold text-white mb-3">
                    {lvl.name}
                  </h2>
                  <p className="text-hud-body text-[#E8EEF9] mb-5">
                    {formatHighlightedText(lvl.description)}
                  </p>
                  <div className="pt-3 border-t border-blueCyan/30 flex items-center justify-between">
                    <span className="font-title text-hud-min text-blueIce">PUISSANCE COGNITIVE</span>
                    <span className="font-title text-hud-body font-black text-blueCyan">
                      <AnimatedCounter target={lvl.gauge} suffix=" %" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 6. LE DILEMME INTERACTIF (SLIDE 14 : FUTUR LUMINEUX VS SOMBRE) */}
        {slide.layout === 'dilemma' && slide.dilemma && (
          <div className="space-y-5 max-w-5xl">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  onChangeDilemma('bright');
                  soundEngine.playBeep(880, 0.1);
                }}
                className={`px-6 py-4 rounded-2xl font-title text-hud-body font-bold transition-all ${
                  dilemmaChoice === 'bright'
                    ? 'bg-blueElectric text-white shadow-glowStrong border-2 border-white'
                    : 'hud-panel text-blueIce'
                }`}
              >
                ☀ Explorer le Futur Lumineux
              </button>
              <button
                onClick={() => {
                  onChangeDilemma('dark');
                  soundEngine.playBeep(320, 0.12);
                }}
                className={`px-6 py-4 rounded-2xl font-title text-hud-body font-bold transition-all ${
                  dilemmaChoice === 'dark'
                    ? 'bg-blueElectric text-white shadow-glowStrong border-2 border-white'
                    : 'hud-panel text-blueIce'
                }`}
              >
                ⚡ Explorer le Futur Sombre
              </button>
            </div>

            <div className="hud-panel-active p-8 rounded-2xl">
              <h2 className="font-title text-hud-subtitle font-bold text-white mb-2">
                {dilemmaChoice === 'bright' ? slide.dilemma.bright.title : slide.dilemma.dark.title}
              </h2>
              <p className="text-hud-body text-blueIce mb-5">
                {dilemmaChoice === 'bright'
                  ? slide.dilemma.bright.subtitle
                  : slide.dilemma.dark.subtitle}
              </p>
              <ul className="space-y-4">
                {(dilemmaChoice === 'bright'
                  ? slide.dilemma.bright.points
                  : slide.dilemma.dark.points
                ).map((pt, i) => (
                  <li key={i} className="flex items-center gap-4 text-hud-body text-white">
                    <span className="w-3.5 h-3.5 rounded-full bg-blueCyan shrink-0" />
                    <span>{formatHighlightedText(pt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 7. AVANTAGES VS INCONVÉNIENTS (SLIDE 15) */}
        {slide.layout === 'comparison' && slide.comparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
            <div className="hud-panel-active p-7 rounded-2xl">
              <h2 className="font-title text-hud-subtitle font-bold text-white mb-5 flex items-center gap-3">
                <Icons.CheckCircle2 className="w-8 h-8 text-blueCyan shrink-0" />
                <span>AVANTAGES MAJEURS</span>
              </h2>
              <div className="space-y-4">
                {slide.comparison.pros.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-bgMain/80 border border-blueCyan/30">
                    <h3 className="font-title text-hud-body font-bold text-white">{p.title}</h3>
                    <p className="text-hud-min text-[#E8EEF9]">{formatHighlightedText(p.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-panel p-7 rounded-2xl">
              <h2 className="font-title text-hud-subtitle font-bold text-white mb-5 flex items-center gap-3">
                <Icons.AlertOctagon className="w-8 h-8 text-blueIce shrink-0" />
                <span>INCONVÉNIENTS & RISQUES</span>
              </h2>
              <div className="space-y-4">
                {slide.comparison.cons.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-bgMain/80 border border-blueIce/30">
                    <h3 className="font-title text-hud-body font-bold text-white">{c.title}</h3>
                    <p className="text-hud-min text-[#E8EEF9]">{formatHighlightedText(c.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. PLAN DE TRAVAIL EN 5 ÉTAPES (SLIDE 16 - HAUTE LISIBILITÉ) */}
        {slide.layout === 'workplan' && (
          <div className="space-y-5">
            <div className="hidden lg:block h-2 w-full bg-bgCard rounded-full overflow-hidden border border-blueCyan/40">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.2 }}
                className="h-full bg-gradient-to-r from-blueElectric via-blueCyan to-white"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {WORK_PLAN_STEPS.map((step, idx) => {
                const isDone = step.status === 'Terminé';
                const isCurrent = step.status === 'En cours';
                return (
                  <motion.div
                    key={step.number}
                    initial={clearTextMode ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: clearTextMode ? 0 : idx * 0.12 }}
                    className={`p-6 rounded-2xl flex flex-col justify-between ${
                      isCurrent ? 'hud-panel-active' : 'hud-panel'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-title text-hud-subtitle font-black text-blueCyan">
                          {step.number}
                        </span>
                        {renderDynamicIcon(step.icon)}
                      </div>
                      <h2 className="font-title text-hud-body font-bold text-white mb-2">
                        {step.title}
                      </h2>
                      <p className="text-hud-min text-[#E8EEF9] mb-4">
                        {formatHighlightedText(step.description)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-blueCyan/30 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-hud-min text-blueIce font-bold">⏱ {step.duration}</span>
                      <span
                        className={`px-3 py-1 rounded-full font-title text-hud-min font-bold ${
                          isDone
                            ? 'bg-blueElectric text-white'
                            : isCurrent
                            ? 'bg-blueCyan text-bgMain animate-pulse'
                            : 'bg-bgMain text-blueIce border border-blueIce/40'
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 9. CONCLUSION FINALE D'AURA (SLIDE 17) */}
        {slide.layout === 'conclusion' && (
          <div className="hud-panel-active p-8 rounded-2xl max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-title text-hud-subtitle font-black text-white mb-2">
                AVEZ-VOUS DES QUESTIONS ?
              </h2>
              <p className="text-hud-body text-blueIce">
                Transmission d'AURA terminée — Merci pour votre écoute.
              </p>
            </div>
            <button
              onClick={() => onSelectSlide(0)}
              className="px-6 py-4 rounded-xl bg-blueElectric hover:bg-blueCyan text-white font-title text-hud-min font-bold uppercase shadow-glow shrink-0"
            >
              Rejouer l'expérience
            </button>
          </div>
        )}

        {/* 10. SOURCES & RÉFÉRENCES (SLIDE 18) */}
        {slide.layout === 'sources' && slide.sources && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
            {slide.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-panel p-6 rounded-2xl hover:border-white transition-all block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-title text-hud-body font-bold text-blueCyan">
                    {src.name}
                  </span>
                  <Icons.ExternalLink className="w-5 h-5 text-white" />
                </div>
                <p className="text-hud-min text-white font-bold mb-1">{src.org}</p>
                <p className="text-hud-min text-[#E8EEF9]">{formatHighlightedText(src.desc)}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};