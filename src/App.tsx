import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES_DATA } from './data/slides';
import { Scene3D } from './components/Scene3D';
import { SlideContentColumn, WorkPlanHorizontalStrip } from './components/SlideView';
import { CompactRegieBar, StandaloneSouffleurPage } from './components/SouffleurWindow';
import { LivretPage } from './components/LivretPage';
import { soundEngine } from './utils/sound';
import { syncManager } from './utils/sync';

export const App: React.FC = () => {
  // Routing direct indépendant pour /livret et /souffleur sans recharger Three.js
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    if (path === '/livret' || path.endsWith('/livret')) {
      return <LivretPage />;
    }
    if (path === '/souffleur' || path.endsWith('/souffleur')) {
      return <StandaloneSouffleurPage />;
    }
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [publicMode, setPublicMode] = useState(false);
  const [clearTextMode, setClearTextMode] = useState(false);
  const [lowPerf, setLowPerf] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isAuraSpeaking, setIsAuraSpeaking] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
          window.setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return p + 20;
      });
    }, 55);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = SLIDES_DATA[slideIndex] || SLIDES_DATA[0];
  const currentStep = currentSlide.steps[stepIndex] || currentSlide.steps[0];

  // Synchronisation en temps réel vers la fenêtre /souffleur
  useEffect(() => {
    syncManager.send({
      type: 'STATE_UPDATE',
      slideIndex,
      stepIndex,
      elapsedSeconds,
      isAuraSpeaking,
    });
  }, [slideIndex, stepIndex, elapsedSeconds, isAuraSpeaking]);

  // Déclenchement automatique de la voix d'AURA (Microsoft Julie)
  useEffect(() => {
    if (isLoading) return;
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
  }, [slideIndex, stepIndex, soundEnabled, isLoading, currentStep]);

  const canTrigger = () => {
    const now = Date.now();
    if (now - lastActionRef.current < 250) return false;
    lastActionRef.current = now;
    return true;
  };

  const advanceStep = useCallback(() => {
    if (!canTrigger()) return;
    if (isAuraSpeaking && soundEnabled) return; // Bloqué pendant la voix d'AURA

    const slide = SLIDES_DATA[slideIndex];
    if (stepIndex < slide.steps.length - 1) {
      setStepIndex((s) => s + 1);
      soundEngine.playBeep(720, 0.05);
    } else if (slideIndex < SLIDES_DATA.length - 1) {
      setSlideIndex((sc) => sc + 1);
      setStepIndex(0);
      soundEngine.playSlideWhooshAndBass();
    }
  }, [isAuraSpeaking, soundEnabled, slideIndex, stepIndex]);

  const retreatStep = useCallback(() => {
    if (!canTrigger()) return;
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);

    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
      soundEngine.playBeep(440, 0.05);
    } else if (slideIndex > 0) {
      const prevSlide = SLIDES_DATA[slideIndex - 1];
      setSlideIndex((sc) => sc - 1);
      setStepIndex(prevSlide.steps.length - 1);
      soundEngine.playSlideWhooshAndBass();
    }
  }, [slideIndex, stepIndex]);

  const restartScene = useCallback(() => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
    setStepIndex(0);
    soundEngine.playBeep(520, 0.08);
  }, []);

  const jumpToSlide = useCallback((idx: number) => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
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

  // Réception des commandes depuis la fenêtre /souffleur
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

  // Raccourcis clavier du direct
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        advanceStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        retreatStep();
      } else if (e.key === 'r' || e.key === 'R') {
        restartScene();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'p' || e.key === 'P') {
        openExternalSouffleur();
      } else if (e.key === 'h' || e.key === 'H') {
        setPublicMode((v) => !v);
      } else if (e.key === 't' || e.key === 'T') {
        setClearTextMode((v) => !v);
      } else if (e.key === 'l' || e.key === 'L') {
        setLowPerf((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, advanceStep, retreatStep, restartScene, toggleFullscreen, openExternalSouffleur]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#05070D] flex items-center justify-center px-6">
        <div className="max-w-lg w-full p-8 rounded-2xl text-center border border-blueCyan/40 bg-[#0A1020]/90">
          <div className="w-14 h-14 rounded-full border-4 border-blueCyan border-t-transparent animate-spin mx-auto mb-6" />
          <h1 className="font-title text-xl font-bold text-white mb-2">INITIALISATION DE L'IA AURA…</h1>
          <p className="text-sm text-blueIce mb-6">Chargement de la simulation 2030</p>
          <div className="w-full h-3 bg-[#05070D] rounded-full overflow-hidden border border-blueCyan/50">
            <div className="h-full bg-gradient-to-r from-blueElectric to-blueCyan transition-all" style={{ width: `${loadProgress}%` }} />
          </div>
          <span className="font-title text-sm text-blueCyan mt-3 block font-bold">{loadProgress} %</span>
        </div>
      </div>
    );
  }

  return (
    <main
      onClick={advanceStep}
      onContextMenu={(e) => {
        e.preventDefault();
        retreatStep();
      }}
      className="relative w-screen h-screen overflow-hidden bg-[#05070D] select-none flex flex-col justify-between"
    >
      <div className="relative w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Colonne Gauche : Contenu Lisible des Diapositives */}
        <div className="lg:col-span-6 xl:col-span-5 h-full p-4 lg:p-6 z-10 min-h-0 overflow-y-auto">
          {currentSlide.layout === 'workplan' ? (
            <WorkPlanHorizontalStrip />
          ) : (
            <SlideContentColumn
              slide={currentSlide}
              onSelectSlide={jumpToSlide}
              clearTextMode={clearTextMode}
              onChangeAiScale={setAiLevelScale}
              dilemmaChoice={dilemmaChoice}
              onChangeDilemma={setDilemmaChoice}
            />
          )}
        </div>

        {/* Colonne Droite : Scène 3D Haute Visibilité */}
        <div className="lg:col-span-6 xl:col-span-7 h-full w-full absolute lg:relative inset-0 -z-0 lg:z-0">
          <Scene3D
            activeModel={currentSlide.model3D}
            cameraTarget={currentSlide.cameraPos}
            reducedMotion={reducedMotion}
            lowPerf={lowPerf}
            aiLevelScale={aiLevelScale}
            dilemmaChoice={dilemmaChoice}
          />
        </div>
      </div>

      {/* Barre Régie Compacte en bas */}
      {!publicMode && (
        <CompactRegieBar
          slideIndex={slideIndex}
          stepIndex={stepIndex}
          isAuraSpeaking={isAuraSpeaking}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onOpenExternalSouffleur={openExternalSouffleur}
        />
      )}
    </main>
  );
};

export default App;
