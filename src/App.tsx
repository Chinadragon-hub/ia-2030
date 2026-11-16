import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SLIDES_DATA } from './data/slides';
import { REHEARSAL_SCENES } from './data/rehearsalScript';
import { Scene3D } from './components/Scene3D';
import { SlideView } from './components/SlideView';
import { NavigationControls } from './components/NavigationControls';
import { TeleprompterHUD } from './components/TeleprompterHUD';
import { soundEngine } from './utils/sound';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [presenterMode, setPresenterMode] = useState(false);
  const [clearTextMode, setClearTextMode] = useState(false);
  const [lowPerf, setLowPerf] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [fontScale, setFontScale] = useState(1);
  const [aiLevelScale, setAiLevelScale] = useState(1);
  const [dilemmaChoice, setDilemmaChoice] = useState<'bright' | 'dark'>('bright');

  // Script Scénique Synchronisé & Prompteur
  const [sceneIdx, setSceneIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isAuraSpeaking, setIsAuraSpeaking] = useState(false);
  const [isBookletOpen, setIsBookletOpen] = useState(false);

  const currentScene = REHEARSAL_SCENES[sceneIdx] || REHEARSAL_SCENES[0];
  const currentStep = currentScene.steps[stepIdx] || currentScene.steps[0];

  const wheelLockRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  // Applique le zoom de texte A+ / A-
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
  }, [fontScale]);

  const adjustFontScale = (delta: number) => {
    setFontScale((prev) => Math.min(1.3, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  // Synchronise automatiquement la slide 3D et déclenche la voix Microsoft Julie quand AURA parle
  useEffect(() => {
    if (currentScene) {
      setCurrentSlide(currentScene.slideIndex);
    }
    soundEngine.stopSpeech();
    if (currentStep && currentStep.speaker === 'AURA') {
      soundEngine.speakAura(
        currentStep.speech,
        () => setIsAuraSpeaking(true),
        () => setIsAuraSpeaking(false)
      );
    } else {
      setIsAuraSpeaking(false);
    }
  }, [sceneIdx, stepIdx]);

  // Avancer d'une étape (Clic Gauche ou Flèche Droite)
  const advanceStep = useCallback(() => {
    if (isAuraSpeaking) return;
    if (stepIdx < currentScene.steps.length - 1) {
      setStepIdx((s) => s + 1);
      soundEngine.playBeep(680, 0.05);
    } else if (sceneIdx < REHEARSAL_SCENES.length - 1) {
      setSceneIdx((sc) => sc + 1);
      setStepIdx(0);
      soundEngine.playSlideTransition();
    }
  }, [isAuraSpeaking, stepIdx, currentScene, sceneIdx]);

  // Reculer d'une étape en cas d'erreur (Clic Droit ou Flèche Gauche)
  const retreatStep = useCallback(() => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
    if (stepIdx > 0) {
      setStepIdx((s) => s - 1);
    } else if (sceneIdx > 0) {
      const prevScene = REHEARSAL_SCENES[sceneIdx - 1];
      setSceneIdx((sc) => sc - 1);
      setStepIdx(prevScene.steps.length - 1);
    }
  }, [stepIdx, sceneIdx]);

  // Redémarrer la scène active (Touche R)
  const restartCurrentScene = useCallback(() => {
    soundEngine.stopSpeech();
    setIsAuraSpeaking(false);
    setStepIdx(0);
  }, []);

  // Écran d'initialisation d'AURA
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 250);
          return 100;
        }
        return prev + 10;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!presenterMode) return;
    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [presenterMode]);

  const selectSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    soundEngine.playSlideTransition();
  }, []);

  const goToNext = useCallback(() => {
    advanceStep();
  }, [advanceStep]);

  const goToPrev = useCallback(() => {
    retreatStep();
  }, [retreatStep]);

  // Raccourcis Clavier
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
        restartCurrentScene();
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          setIsFullscreen(true);
        } else {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        }
      } else if (e.key === 'p' || e.key === 'P') {
        setPresenterMode((v) => !v);
      } else if (e.key === 't' || e.key === 'T') {
        setClearTextMode((v) => !v);
      } else if (e.key === 'l' || e.key === 'L') {
        setLowPerf((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceStep, retreatStep, restartCurrentScene, isMenuOpen]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isMenuOpen || wheelLockRef.current || Math.abs(e.deltaY) < 40) return;
    wheelLockRef.current = true;
    if (e.deltaY > 0) advanceStep();
    else retreatStep();
    setTimeout(() => {
      wheelLockRef.current = false;
    }, 800);
  };

  const activeSlide = SLIDES_DATA[currentSlide] || SLIDES_DATA[0];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-bgMain flex items-center justify-center px-6 holo-grid">
        <div className="max-w-lg w-full hud-panel p-10 rounded-2xl text-center">
          <div className="w-14 h-14 rounded-full border-4 border-blueCyan border-t-transparent animate-spin mx-auto mb-6 shadow-glow" />
          <h1 className="font-title text-hud-body font-bold text-white mb-2">
            INITIALISATION DE L'IA AURA…
          </h1>
          <p className="text-hud-min text-blueIce mb-6">
            Chargement de la simulation 2030 : Vers la Superintelligence
          </p>
          <div className="w-full h-3 bg-bgMain rounded-full overflow-hidden border border-blueCyan">
            <div
              className="h-full bg-gradient-to-r from-blueElectric via-blueCyan to-white"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="font-title text-hud-min text-blueCyan mt-3 block font-bold">
            {loadProgress} %
          </span>
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
      onWheel={handleWheel}
      onTouchStart={(e) => (touchStartXRef.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartXRef.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartXRef.current;
        if (Math.abs(dx) > 60) dx < 0 ? advanceStep() : retreatStep();
        touchStartXRef.current = null;
      }}
      className="relative w-screen h-screen overflow-hidden bg-bgMain select-none cursor-pointer"
    >
      <Scene3D
        activeModel={activeSlide.model3D}
        cameraTarget={activeSlide.cameraPos}
        reducedMotion={presenterMode}
        lowPerf={lowPerf}
        aiLevelScale={aiLevelScale}
        dilemmaChoice={dilemmaChoice}
      />

      <AnimatePresence mode="wait">
        <SlideView
          key={activeSlide.id}
          slide={activeSlide}
          onSelectSlide={selectSlide}
          clearTextMode={clearTextMode}
          onChangeAiScale={setAiLevelScale}
          dilemmaChoice={dilemmaChoice}
          onChangeDilemma={setDilemmaChoice}
        />
      </AnimatePresence>

      <TeleprompterHUD
        currentStep={currentStep}
        isAuraSpeaking={isAuraSpeaking}
        onRestartScene={restartCurrentScene}
        isBookletOpen={isBookletOpen}
        setIsBookletOpen={setIsBookletOpen}
      />

      <NavigationControls
        currentIndex={currentSlide}
        totalSlides={SLIDES_DATA.length}
        slides={SLIDES_DATA}
        onPrev={goToPrev}
        onNext={goToNext}
        onSelect={selectSlide}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
          } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
          }
        }}
        presenterMode={presenterMode}
        elapsedSeconds={elapsedSeconds}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(soundEngine.toggleSound())}
        clearTextMode={clearTextMode}
        onToggleClearText={() => setClearTextMode((v) => !v)}
        lowPerf={lowPerf}
        onToggleLowPerf={() => setLowPerf((v) => !v)}
        onAdjustFontScale={adjustFontScale}
      />
    </main>
  );
};

export default App;
