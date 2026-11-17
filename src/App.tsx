import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Type,
  Gauge,
  Sparkles,
  Eye,
  ExternalLink,
  RotateCcw,
  X,
} from 'lucide-react';
import { SLIDES_DATA } from './data/slides';
import { PRESENTATION_CONFIG } from './data/config';
import { Scene3D } from './components/Scene3D';
import { SlideContentColumn, WorkPlanHorizontalStrip } from './components/SlideView';
import { CompactRegieBar } from './components/SouffleurWindow';
import { soundEngine } from './utils/sound';
import { syncManager } from './utils/sync';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [publicMode, setPublicMode] = useState(false);
  const [clearTextMode, setClearTextMode] = useState(false);
  const [lowPerf, setLowPerf] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isAuraSpeaking, setIsAuraSpeaking] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [fontScale, setFontScale] = useState(1);
  const [aiLevelScale, setAiLevelScale] = useState(1);
  const [dilemmaChoice, setDilemmaChoice] = useState<'bright' | 'dark'>('bright');
  const [reducedMotion, setReducedMotion] = useState(false);

  const lastActionRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setIsLoading(false), 180);
          return 100;
        }
        return p + 25;
      });
    }, 50);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = SLIDES_DATA[slideIndex] || SLIDES_DATA[0];
  const currentStep = currentSlide.steps[stepIndex] || currentSlide.steps[0];

  useEffect(() => {
    syncManager.send({
      type: 'STATE_UPDATE',
      slideIndex,
      stepIndex,
      elapsedSeconds,
      isAuraSpeaking,
    });
  }, [slideIndex, stepIndex, elapsedSeconds, isAuraSpeaking]);

  useEffect(() => {
    if (isLoading || isEndScreen) return;
    soundEngine.stopSpeech();
    if (currentStep.speaker === 'AURA' && soundEnabled) {
      soundEngine.speakAura(
        currentStep.speech,
        () => setIsAuraSpeaking(true),
        () => setIsAuraSpeaking(false)
      );
    } else {
      setIsAuraSpeaking(false);
    }
  }, [slideIndex, stepIndex, soundEnabled, isLoading, isEndScreen, currentStep]);

  const canTrigger = () => {
    const now = Date.now();
    if (now - lastActionRef.current < 250) return false;
    lastActionRef.current = now;
    return true;
  };

  // Avancer d'une étape ou boucler proprement après la dernière diapositive (Scène 18)
  const advanceStep = useCallback(() => {
    if (!canTrigger()) return;
    if (isAuraSpeaking && soundEnabled) return;

    if (isEndScreen) {
      setIsEndScreen(false);
      setSlideIndex(0);
      setStepIndex(0);
      soundEngine.playOpeningChime();
      return;
    }

    const slide = SLIDES_DATA[slideIndex];
    if (stepIndex < slide.steps.length - 1) {
      setStepIndex((s) => s + 1);
      soundEngine.playBeep(720, 0.05);
    } else if (slideIndex < SLIDES_DATA.length - 1) {
      setSlideIndex((sc) => sc + 1);
      setStepIndex(0);
      soundEngine.playSlideWhooshAndBass();
    } else {
      // Fin de la dernière étape de la Scène 18 : affiche l'épilogue final qui permet de recommencer en 1 clic
      setIsEndScreen(true);
      soundEngine.playOpeningChime();
    }
  }, [isAuraSpeaking, soundEnabled, isEndScreen, slideIndex, stepIndex]);

  const retreatStep = useCallback(() => {
    if (!canTrigger()) return;
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);

    if (isEndScreen) {
      setIsEndScreen(false);
      return;
    }

    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
      soundEngine.playBeep(440, 0.05);
    } else if (slideIndex > 0) {
      const prevSlide = SLIDES_DATA[slideIndex - 1];
      setSlideIndex((sc) => sc - 1);
      setStepIndex(prevSlide.steps.length - 1);
      soundEngine.playSlideWhooshAndBass();
    }
  }, [isEndScreen, slideIndex, stepIndex]);

  const restartScene = useCallback(() => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
    setIsEndScreen(false);
    setStepIndex(0);
    soundEngine.playBeep(520, 0.08);
  }, []);

  const jumpToSlide = useCallback((idx: number) => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
    setIsEndScreen(false);
    setSlideIndex(Math.max(0, Math.min(SLIDES_DATA.length - 1, idx)));
    setStepIndex(0);
    soundEngine.playSlideWhooshAndBass();
  }, []);

  const openExternalSouffleur = useCallback(() => {
    window.open('/souffleur', 'SouffleurIA2030', 'width=980,height=720,menubar=no,toolbar=no');
  }, []);

  const toggleFullscreen = useCallback(() => {
    const docEl = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
      webkitFullscreenElement?: Element;
    };
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      if (docEl.requestFullscreen) docEl.requestFullscreen().catch(() => {});
      else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
      setIsFullscreen(true);
      setPublicMode(true);
    } else {
      if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {});
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const unsub = syncManager.subscribe((payload) => {
      if (payload.type === 'COMMAND') {
        if (payload.command === 'NEXT') advanceStep();
        if (payload.command === 'PREV') retreatStep();
        if (payload.command === 'RESTART') restartScene();
        if (payload.command === 'GOTO_SLIDE' && payload.targetSlide !== undefined) {
          jumpToSlide(payload.targetSlide);
        }
      }
    });
    return unsub;
  }, [advanceStep, retreatStep, restartScene, jumpToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsEndScreen(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        (document.activeElement as HTMLElement)?.blur?.();
        advanceStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        retreatStep();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        restartScene();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setClearTextMode((v) => !v);
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        openExternalSouffleur();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setPublicMode((v) => !v);
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        setLowPerf((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceStep, retreatStep, restartScene, toggleFullscreen, openExternalSouffleur]);

  const adjustFontScale = (delta: number) => {
    setFontScale((prev) => Math.min(1.3, Math.max(0.8, Number((prev + delta).toFixed(2)))));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#05070D] flex items-center justify-center p-6">
        <div className="cyber-card p-8 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blueCyan border-t-transparent animate-spin mx-auto" />
          <h1 className="txt-subtitle font-title font-bold text-white">
            Initialisation de l'IA…
          </h1>
          <div className="w-full h-2.5 bg-[#05070D] rounded-full overflow-hidden border border-blueCyan">
            <div
              className="h-full bg-gradient-to-r from-blueElectric to-blueCyan transition-all"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="txt-badge text-blueCyan block">{loadProgress} %</span>
        </div>
      </div>
    );
  }

  const progressPercent = ((slideIndex + 1) / SLIDES_DATA.length) * 100;

  return (
    <div
      onClick={advanceStep}
      onContextMenu={(e) => {
        e.preventDefault();
        retreatStep();
      }}
      onTouchStart={(e) => (touchStartXRef.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartXRef.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartXRef.current;
        if (Math.abs(dx) > 60) dx < 0 ? advanceStep() : retreatStep();
        touchStartXRef.current = null;
      }}
      className={`app-grid select-none scanlines-overlay ${publicMode ? 'public-mode' : ''}`}
    >
      {/* RANGÉE 1 : BARRE DU HAUT (48px) */}
      {!publicMode && (
        <header
          onClick={(e) => e.stopPropagation()}
          className="area-barre px-4 bg-[#070C18]/95 border-b border-blueCyan/30 flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1 rounded bg-[#0A1020] border border-blueCyan/50 font-title text-[14px] font-bold">
              <span className="text-blueCyan">{String(slideIndex + 1).padStart(2, '0')}</span>
              <span className="text-blueIce mx-1">/</span>
              <span className="text-white">{String(SLIDES_DATA.length).padStart(2, '0')}</span>
            </div>

            {lowPerf && (
              <div className="px-2.5 py-1 rounded bg-blueElectric/25 border border-blueCyan font-title text-[13px] text-blueIce hidden md:block">
                FPS 30 • GPU ECO • LAT 12ms
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center rounded bg-[#0A1020] border border-blueCyan/40 overflow-hidden">
              <button
                onClick={() => adjustFontScale(-0.1)}
                aria-label="Réduire la taille du texte"
                className="px-2.5 py-1 text-[14px] font-title font-bold text-white hover:bg-blueElectric/40"
              >
                A-
              </button>
              <button
                onClick={() => adjustFontScale(0.1)}
                aria-label="Agrandir la taille du texte"
                className="px-2.5 py-1 text-[14px] font-title font-bold text-blueCyan hover:bg-blueElectric/40 border-l border-blueCyan/30"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => setClearTextMode((v) => !v)}
              aria-label="Basculer le mode texte clair"
              className={`px-2.5 py-1 rounded text-[14px] font-title flex items-center gap-1 border ${
                clearTextMode
                  ? 'bg-blueElectric text-white border-white'
                  : 'bg-[#0A1020] text-white border-blueCyan/40'
              }`}
            >
              <Type className="w-4 h-4 text-blueCyan" />
              <span className="hidden lg:inline">Texte clair</span>
            </button>

            <div className="flex items-center gap-1 bg-[#0A1020] border border-blueCyan/40 rounded px-2 py-1">
              <button
                onClick={() => setSoundEnabled(soundEngine.toggleAudio())}
                aria-label="Activer ou couper le son"
                className="flex items-center gap-1 text-[14px] font-title text-white"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-blueCyan" />
                ) : (
                  <VolumeX className="w-4 h-4 text-blueIce" />
                )}
                <span className="hidden md:inline">
                  {soundEnabled ? 'Son actif' : 'Activer le son'}
                </span>
              </button>
              {soundEnabled && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    soundEngine.setVolume(v);
                  }}
                  aria-label="Volume sonore"
                  className="w-14 accent-[#3DA5FF] cursor-pointer hidden sm:block"
                />
              )}
            </div>

            <button
              onClick={() => setLowPerf((v) => !v)}
              aria-label="Mode performance"
              className={`px-2.5 py-1 rounded text-[14px] font-title flex items-center gap-1 border ${
                lowPerf
                  ? 'bg-blueElectric text-white border-white'
                  : 'bg-[#0A1020] text-white border-blueCyan/40'
              }`}
            >
              <Gauge className="w-4 h-4 text-blueCyan" />
              <span className="hidden xl:inline">Perf</span>
            </button>

            <button
              onClick={openExternalSouffleur}
              aria-label="Ouvrir le souffleur dans une nouvelle fenêtre"
              className="px-2.5 py-1 rounded bg-[#0A1020] border border-blueCyan/40 text-[14px] font-title text-white hover:border-white flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4 text-blueCyan" />
              <span className="hidden lg:inline">Souffleur</span>
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label="Plein écran"
              className="p-1.5 rounded bg-[#0A1020] border border-blueCyan/40 text-white hover:border-white"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Ouvrir le sommaire"
              className="px-2.5 py-1 rounded bg-[#0A1020] border border-blueCyan/40 text-[14px] font-title text-white hover:border-white flex items-center gap-1"
            >
              <Menu className="w-4 h-4 text-blueCyan" />
              <span className="hidden sm:inline">Sommaire</span>
            </button>
          </div>
        </header>
      )}

      {/* BARRE DE PROGRESSION (3px) */}
      <div className="area-progress w-full h-[3px] bg-[#0A1020]">
        <div
          className="h-full bg-gradient-to-r from-blueElectric via-blueCyan to-white transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* RANGÉE 2 : BANDEAU AURA (max 64px) */}
      <section
        onClick={(e) => e.stopPropagation()}
        className="area-aura px-5 py-1.5 bg-[#080F20]/90 border-b border-blueCyan/25 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-blueElectric/30 border border-blueCyan flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-blueCyan" />
          </div>
          <span className="txt-badge text-blueCyan shrink-0">AURA //</span>
          <p className="txt-aura text-white truncate">{currentSlide.auraBanner}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!soundEngine.hasFrenchVoice && soundEnabled && (
            <span className="text-[14px] text-blueIce hidden lg:inline">
              Voix française non disponible, lisez le sous-titre
            </span>
          )}
          {publicMode && (
            <button
              onClick={() => setPublicMode(false)}
              className="px-2.5 py-0.5 rounded bg-[#0A1020] border border-blueCyan/40 text-[13px] font-title text-blueIce hover:text-white flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Afficher régie (H)</span>
            </button>
          )}
        </div>
      </section>

      {/* RANGÉE 3 : ZONE SCÈNE (38% Carte à gauche / 62% Modèle 3D à droite) */}
      <main
        className={`area-scene ${
          currentSlide.layout === 'workplan' ? 'workplan-layout' : ''
        }`}
      >
        <SlideContentColumn
          slide={currentSlide}
          onSelectSlide={jumpToSlide}
          clearTextMode={clearTextMode}
          onChangeAiScale={setAiLevelScale}
          dilemmaChoice={dilemmaChoice}
          onChangeDilemma={setDilemmaChoice}
        />

        <div className="scene-3d-col w-full h-full min-h-0 min-w-0">
          <Scene3D
            activeModel={currentSlide.model3D}
            cameraTarget={currentSlide.cameraPos}
            reducedMotion={reducedMotion}
            lowPerf={lowPerf}
            aiLevelScale={aiLevelScale}
            dilemmaChoice={dilemmaChoice}
          />
        </div>

        {currentSlide.layout === 'workplan' && <WorkPlanHorizontalStrip />}
      </main>

      {/* RANGÉE 4 : BANDEAU PROMPTEUR ANIMÉ & RÉTRACTABLE EN MINI-PILULE */}
      {!publicMode && (
        <CompactRegieBar
          slideIndex={slideIndex}
          stepIndex={stepIndex}
          isAuraSpeaking={isAuraSpeaking}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onOpenExternalSouffleur={openExternalSouffleur}
          onRestartScene={restartScene}
        />
      )}

      {/* RANGÉE 5 : COMMANDES DU BAS (52px) */}
      {!publicMode && (
        <footer
          onClick={(e) => e.stopPropagation()}
          className="area-commandes px-5 bg-[#070C18]/95 border-t border-blueCyan/30 flex items-center justify-between gap-3"
        >
          <div className="text-[14px] text-blueIce hidden lg:flex items-center gap-3">
            <span>Clic gauche / → : Suivant</span>
            <span>•</span>
            <span>Clic droit / ← : Précédent</span>
            <span>•</span>
            <span>R : Recommencer</span>
            <span>•</span>
            <span>H : Mode public</span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={retreatStep}
              disabled={slideIndex === 0 && stepIndex === 0 && !isEndScreen}
              className="px-4 py-1.5 rounded-lg bg-[#0A1020] border border-blueCyan/50 font-title text-[14px] font-bold text-white hover:border-white disabled:opacity-35 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-blueCyan" />
              <span>Précédent</span>
            </button>
            <button
              onClick={advanceStep}
              disabled={isAuraSpeaking && soundEnabled}
              className="px-5 py-1.5 rounded-lg bg-blueElectric hover:bg-blueCyan font-title text-[14px] font-bold text-white disabled:opacity-40 flex items-center gap-1.5"
            >
              <span>
                {isAuraSpeaking && soundEnabled
                  ? 'Voix AURA…'
                  : slideIndex === SLIDES_DATA.length - 1 &&
                    stepIndex === currentSlide.steps.length - 1
                  ? 'Terminer'
                  : 'Suivant'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}

      {/* ÉCRAN D'ÉPILOGUE FINAL QUAND ON CLIQUE APRÈS LA DERNIÈRE DIAPOSITIVE (SCÈNE 18) */}
      {isEndScreen && (
        <div
          onClick={advanceStep}
          className="fixed inset-0 z-50 bg-[#05070D]/92 backdrop-blur-lg flex items-center justify-center p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cyber-card p-8 max-w-xl w-full text-center space-y-5 border-2 border-blueCyan shadow-2xl"
          >
            <span className="txt-badge px-3 py-1 rounded bg-blueElectric text-white inline-block">
              TRANSMISSION AURA // 2030 COMPLÈTE
            </span>
            <h2 className="txt-title text-white">
              FIN DE LA PRÉSENTATION — Merci pour votre attention !
            </h2>
            <p className="txt-subtitle text-blueIce">
              Présenté par <strong className="text-white">{PRESENTATION_CONFIG.presenter1Name}</strong> (Présentateur 1) &{' '}
              <strong className="text-white">{PRESENTATION_CONFIG.presenter2Name}</strong> (Présentateur 2)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setIsEndScreen(false);
                  setSlideIndex(0);
                  setStepIndex(0);
                  soundEngine.playOpeningChime();
                }}
                className="px-6 py-3 rounded-xl bg-blueElectric hover:bg-blueCyan text-white font-title text-[15px] font-bold flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Recommencer depuis la Scène 01</span>
              </button>
              <button
                onClick={() => setIsEndScreen(false)}
                className="px-5 py-3 rounded-xl bg-[#0A1020] border border-blueCyan text-blueIce hover:text-white font-title text-[14px] font-bold"
              >
                Rester sur les Sources
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PANNEAU SOMMAIRE (SANS AUCUN BOUTON NI LIEN PDF) */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-50 bg-[#05070D]/85 backdrop-blur-md flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0A1020] border-l-2 border-blueCyan h-full p-5 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-blueCyan/35">
                <h2 className="font-title text-[18px] font-bold text-white">
                  SOMMAIRE DES 16 SCÈNES
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Fermer le sommaire"
                  className="p-1.5 rounded bg-[#05070D] border border-blueCyan/40 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {SLIDES_DATA.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      jumpToSlide(idx);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg flex items-center gap-3 border transition-all ${
                      idx === slideIndex
                        ? 'bg-blueElectric/30 border-blueCyan text-white'
                        : 'bg-[#05070D]/80 border-blueCyan/20 text-[#E8EEF9] hover:border-blueCyan'
                    }`}
                  >
                    <span className="font-title text-[14px] font-bold text-blueCyan">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="txt-card truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
