import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Clock,
  MessageSquare,
  BookOpen,
  Volume2,
} from 'lucide-react';
import { SLIDES_DATA, SpeakerRole } from '../data/slides';
import { PRESENTATION_CONFIG } from '../data/config';
import { syncManager } from '../utils/sync';

export const getSpeakerBadgeText = (role: SpeakerRole): string => {
  if (role === 'LOUAY') return PRESENTATION_CONFIG.presenter1Badge;
  if (role === 'MAHMOUD') return PRESENTATION_CONFIG.presenter2Badge;
  return PRESENTATION_CONFIG.assistantBadge;
};

export const getSpeakerShortName = (role: SpeakerRole): string => {
  if (role === 'LOUAY') return 'LOUAY';
  if (role === 'MAHMOUD') return 'MAHMOUD';
  return 'AURA';
};

export const getSpeakerBadgeStyle = (role: SpeakerRole): string => {
  if (role === 'LOUAY') return 'bg-[#1E6BFF] text-white border border-[#3DA5FF]';
  if (role === 'MAHMOUD') return 'bg-[#0A1838] text-[#A9D4FF] border border-[#3DA5FF]';
  return 'bg-[#3DA5FF] text-[#05070D] font-black';
};

interface RegieBarProps {
  slideIndex: number;
  stepIndex: number;
  isAuraSpeaking: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  onOpenExternalSouffleur: () => void;
  onRestartScene?: () => void;
}

export const CompactRegieBar: React.FC<RegieBarProps> = ({
  slideIndex,
  stepIndex,
  isAuraSpeaking,
  drawerOpen,
  setDrawerOpen,
  onOpenExternalSouffleur,
  onRestartScene,
}) => {
  const slide = SLIDES_DATA[slideIndex] || SLIDES_DATA[0];
  const step = slide.steps[stepIndex] || slide.steps[0];

  // À chaque nouvelle scène, le bandeau apparaît avec une animation fluide
  useEffect(() => {
    setDrawerOpen(true);
  }, [slideIndex, setDrawerOpen]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="area-regie w-full px-4 py-1 flex items-center justify-center z-30 pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {drawerOpen ? (
          <motion.div
            key={`expanded-${slideIndex}-${stepIndex}`}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.88 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setDrawerOpen(false)}
            title="Cliquez n'importe où sur ce bandeau pour le réduire en mini-pilule"
            className="pointer-events-auto cursor-pointer w-full max-w-4xl cyber-card px-5 py-3 border-2 border-blueCyan/80 shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2.5">
                <span className={`txt-badge px-2.5 py-0.5 rounded ${getSpeakerBadgeStyle(step.speaker)}`}>
                  {getSpeakerBadgeText(step.speaker)}
                </span>
                {isAuraSpeaking ? (
                  <span className="flex items-center gap-1.5 font-title text-[13px] font-bold text-blueCyan animate-pulse">
                    <Volume2 className="w-4 h-4" />
                    ATTENDRE • NE PAS CLIQUER
                  </span>
                ) : (
                  <span className="font-title text-[13px] font-bold text-blueIce">
                    {step.clickIndication}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {onRestartScene && (
                  <button
                    onClick={onRestartScene}
                    className="px-2.5 py-1 rounded bg-[#05070D] border border-blueCyan/40 text-[12px] font-title text-white hover:border-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-blueCyan" />
                    <span>Recommencer (R)</span>
                  </button>
                )}
                <button
                  onClick={onOpenExternalSouffleur}
                  className="px-2.5 py-1 rounded bg-blueElectric/30 border border-blueCyan text-[12px] font-title text-white hover:bg-blueElectric flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Souffleur (P)</span>
                </button>
                <a
                  href="/livret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#05070D] border border-blueCyan/40 text-[12px] font-title text-blueIce hover:text-white flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blueCyan" />
                  <span className="hidden md:inline">Livret PDF</span>
                </a>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-2.5 py-1 rounded bg-blueCyan/20 border border-blueCyan text-[12px] font-title text-white hover:bg-blueCyan hover:text-[#05070D] flex items-center gap-1"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Réduire</span>
                </button>
              </div>
            </div>

            <p className="txt-card text-white font-bold leading-snug">
              « {step.speech} »
            </p>
            <p className="text-[13px] text-blueIce/85 mt-1 flex items-center justify-between">
              <span>💡 {step.stageTip} — 🤝 {step.partnerAction}</span>
              <span className="text-[11px] font-title uppercase text-blueCyan ml-2 shrink-0">
                [Clic sur le bandeau pour masquer]
              </span>
            </p>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed-pill"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.9 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={() => setDrawerOpen(true)}
            className="pointer-events-auto px-4 py-1.5 rounded-full bg-[#0A1020]/95 border border-blueCyan/70 hover:border-white shadow-lg flex items-center gap-2.5 text-[13px] font-title text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-blueCyan" />
            <span className="font-extrabold text-blueCyan">
              💬 [{getSpeakerShortName(step.speaker)}]
            </span>
            <span className="text-blueIce">• Clic pour agrandir le prompteur</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TeleprompterHUD = CompactRegieBar;

export const StandaloneSouffleurPage: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAuraSpeaking, setIsAuraSpeaking] = useState(false);

  useEffect(() => {
    document.title = 'Souffleur Temps Réel — Louay Kouki & Mahmoud Dammak';
    const unsub = syncManager.subscribe((payload) => {
      if (payload.type === 'STATE_UPDATE') {
        if (payload.slideIndex !== undefined) setSlideIndex(payload.slideIndex);
        if (payload.stepIndex !== undefined) setStepIndex(payload.stepIndex);
        if (payload.elapsedSeconds !== undefined) setElapsedSeconds(payload.elapsedSeconds);
        if (payload.isAuraSpeaking !== undefined) setIsAuraSpeaking(payload.isAuraSpeaking);
      }
    });
    return unsub;
  }, []);

  const slide = SLIDES_DATA[slideIndex] || SLIDES_DATA[0];
  const step = slide.steps[stepIndex] || slide.steps[0];

  const nextStepPreview = (() => {
    if (stepIndex + 1 < slide.steps.length) {
      return slide.steps[stepIndex + 1];
    }
    if (slideIndex + 1 < SLIDES_DATA.length) {
      return SLIDES_DATA[slideIndex + 1].steps[0];
    }
    return null;
  })();

  const formatTimer = (secs: number) =>
    `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#05070D] text-white p-6 flex flex-col justify-between gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blueCyan/40">
        <div>
          <span className="txt-badge text-blueCyan block">RÉGIE & SOUFFLEUR SYNCHRONISÉ</span>
          <h1 className="font-title text-2xl font-bold text-white">
            {slide.sceneNumber} — {slide.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-[#0A1020] border border-blueCyan flex items-center gap-2 font-title text-lg">
            <Clock className="w-5 h-5 text-blueCyan" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-[#0A1020] border border-blueCyan font-title text-lg">
            Slide {String(slideIndex + 1).padStart(2, '0')} / {SLIDES_DATA.length}
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 cyber-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`px-4 py-1.5 rounded-lg font-title text-lg font-bold ${getSpeakerBadgeStyle(step.speaker)}`}>
                {getSpeakerBadgeText(step.speaker)}
              </span>
              <span className="font-title text-lg font-bold text-blueCyan">
                {isAuraSpeaking ? '⏳ VOIX D\'AURA EN COURS — ATTENDRE' : step.clickIndication}
              </span>
            </div>

            <p className="text-blueIce font-title text-base">
              Étape {stepIndex} : {step.title}
            </p>

            <div className="p-5 rounded-xl bg-[#05070D] border-2 border-blueCyan">
              <p className="text-2xl sm:text-3xl font-bold leading-snug text-white">
                « {step.speech} »
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[#0A1020] border border-blueCyan/40">
              <span className="txt-badge text-blueCyan block mb-1">CONSEIL DE JEU</span>
              <p className="text-base text-white">{step.stageTip}</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0A1020] border border-blueCyan/40">
              <span className="txt-badge text-blueIce block mb-1">ACTION DU COÉQUIPIER</span>
              <p className="text-base text-white">{step.partnerAction}</p>
            </div>
          </div>
        </div>

        <div className="cyber-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="txt-badge text-blueIce block mb-2">APERÇU RÉPLIQUE SUIVANTE</span>
            {nextStepPreview ? (
              <div className="p-4 rounded-lg bg-[#05070D] border border-blueCyan/30 space-y-2">
                <span className={`inline-block px-3 py-1 rounded text-xs font-title font-bold ${getSpeakerBadgeStyle(nextStepPreview.speaker)}`}>
                  {getSpeakerBadgeText(nextStepPreview.speaker)}
                </span>
                <p className="text-base text-[#E8EEF9]">« {nextStepPreview.speech} »</p>
              </div>
            ) : (
              <p className="text-base text-blueIce">Fin de la présentation (clic suivant = retour au début).</p>
            )}
          </div>

          <div className="p-4 rounded-lg bg-[#0A1020] border border-blueCyan/30">
            <span className="txt-badge text-blueCyan block mb-1">RÈGLE CRITIQUE DE LA SCÈNE</span>
            <p className="text-base text-white">{slide.criticalRule}</p>
          </div>
        </div>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-blueCyan/40">
        <button
          onClick={() => syncManager.send({ type: 'COMMAND', command: 'RESTART' })}
          className="px-5 py-3 rounded-xl bg-[#0A1020] border border-blueCyan font-title text-base font-bold text-white hover:border-white flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5 text-blueCyan" />
          <span>Recommencer la scène (R)</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => syncManager.send({ type: 'COMMAND', command: 'PREV' })}
            className="px-6 py-3 rounded-xl bg-[#0A1020] border border-blueCyan font-title text-base font-bold text-white hover:border-white flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5 text-blueCyan" />
            <span>Précédent</span>
          </button>
          <button
            onClick={() => syncManager.send({ type: 'COMMAND', command: 'NEXT' })}
            className="px-8 py-3 rounded-xl bg-blueElectric hover:bg-blueCyan font-title text-base font-bold text-white flex items-center gap-2"
          >
            <span>Suivant</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
