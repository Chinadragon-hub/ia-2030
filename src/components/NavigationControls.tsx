import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Maximize2,
  Minimize2,
  Clock,
  X,
  Volume2,
  VolumeX,
  Type,
  Gauge,
} from 'lucide-react';
import { SlideData } from '../data/slides';

interface NavigationProps {
  currentIndex: number;
  totalSlides: number;
  slides: SlideData[];
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  presenterMode: boolean;
  elapsedSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  clearTextMode: boolean;
  onToggleClearText: () => void;
  lowPerf: boolean;
  onToggleLowPerf: () => void;
  onAdjustFontScale: (delta: number) => void;
}

export const NavigationControls: React.FC<NavigationProps> = ({
  currentIndex,
  totalSlides,
  slides,
  onPrev,
  onNext,
  onSelect,
  isMenuOpen,
  setIsMenuOpen,
  isFullscreen,
  onToggleFullscreen,
  presenterMode,
  elapsedSeconds,
  soundEnabled,
  onToggleSound,
  clearTextMode,
  onToggleClearText,
  lowPerf,
  onToggleLowPerf,
  onAdjustFontScale,
}) => {
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
  const formatTimer = (secs: number) =>
    `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  return (
    <>
      {/* Barre de progression supérieure */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-bgCard">
        <div
          className="h-full bg-gradient-to-r from-blueElectric via-blueCyan to-white transition-all duration-500 shadow-glow"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Barre HUD supérieure : Compteur, A+/A-, Texte clair (T), Son, Perf (L), Sommaire */}
      <header className="fixed top-3 left-0 right-0 z-30 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hud-panel px-4 py-2 rounded-xl flex items-center gap-2 font-title text-hud-min">
            <span className="font-bold text-blueCyan">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-blueIce">/</span>
            <span className="text-white">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          {presenterMode && (
            <div className="hud-panel-active px-4 py-2 rounded-xl flex items-center gap-2 font-title text-hud-min text-white">
              <Clock className="w-5 h-5 text-blueCyan" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Contrôles de taille de police A- / A+ */}
          <div className="hud-panel rounded-xl flex items-center overflow-hidden">
            <button
              onClick={() => onAdjustFontScale(-0.08)}
              title="Réduire la taille du texte"
              className="px-3.5 py-2 text-hud-min font-title font-bold text-white hover:bg-blueElectric/40 transition-colors"
            >
              A-
            </button>
            <button
              onClick={() => onAdjustFontScale(0.08)}
              title="Agrandir la taille du texte"
              className="px-3.5 py-2 text-hud-min font-title font-bold text-blueCyan hover:bg-blueElectric/40 transition-colors border-l border-blueCyan/30"
            >
              A+
            </button>
          </div>

          {/* Bouton Mode Texte Clair (Touche T) */}
          <button
            onClick={onToggleClearText}
            title="Mode Texte Clair (Touche T)"
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 font-title text-hud-min font-bold transition-all ${
              clearTextMode ? 'bg-blueElectric text-white shadow-glow' : 'hud-panel text-white'
            }`}
          >
            <Type className="w-5 h-5 text-blueCyan" />
            <span className="hidden md:inline">Texte clair</span>
          </button>

          {/* Bouton Son Web Audio */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Couper le son' : 'Activer le son sci-fi'}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 font-title text-hud-min font-bold transition-all ${
              soundEnabled ? 'bg-blueElectric text-white shadow-glow' : 'hud-panel text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-blueIce" />}
            <span className="hidden lg:inline">{soundEnabled ? 'Son actif' : 'Son coupé'}</span>
          </button>

          {/* Bouton Mode Performance (Touche L) */}
          <button
            onClick={onToggleLowPerf}
            title="Mode Performance (Touche L)"
            className={`p-2.5 rounded-xl transition-all ${
              lowPerf ? 'bg-blueElectric text-white' : 'hud-panel text-white'
            }`}
          >
            <Gauge className="w-5 h-5" />
          </button>

          {/* Plein écran */}
          <button
            onClick={onToggleFullscreen}
            title="Plein écran"
            className="hud-panel p-2.5 rounded-xl text-white hover:border-white"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Sommaire */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="hud-panel px-4 py-2 rounded-xl flex items-center gap-2 font-title text-hud-min font-bold text-white hover:border-white"
          >
            <Menu className="w-5 h-5 text-blueCyan" />
            <span className="hidden sm:inline">Sommaire</span>
          </button>
        </div>
      </header>

      {/* Points de navigation latéraux */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => onSelect(idx)}
            title={`${idx + 1}. ${s.title}`}
            className="group flex items-center justify-end gap-2 py-0.5"
          >
            <span
              className={`block rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-3.5 h-3.5 bg-blueCyan shadow-glowStrong'
                  : 'w-2.5 h-2.5 bg-blueIce/40 group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Pied de page : Raccourcis & Boutons Précédent / Suivant */}
      <footer className="fixed bottom-4 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        <div className="hidden xl:flex items-center gap-3 text-hud-min text-blueIce hud-panel px-4 py-2 rounded-xl">
          <span>Clavier : ←/→ • T (Texte clair) • P (Présentateur) • L (Performance)</span>
        </div>

        <div className="flex items-center gap-4 ml-auto pointer-events-auto">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="hud-panel px-5 py-3 rounded-xl flex items-center gap-2 font-title text-hud-min font-bold text-white hover:border-white disabled:opacity-35"
          >
            <ChevronLeft className="w-5 h-5 text-blueCyan" />
            <span>Précédent</span>
          </button>

          <button
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            className="px-6 py-3 rounded-xl flex items-center gap-2 font-title text-hud-min font-bold bg-blueElectric hover:bg-blueCyan text-white shadow-glow disabled:opacity-35"
          >
            <span>Suivant</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Panneau latéral Sommaire */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-bgMain/85 backdrop-blur-lg flex justify-end">
          <div className="w-full max-w-lg bg-bgCard border-l-2 border-blueCyan h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-blueCyan/40">
              <h2 className="font-title text-hud-body font-bold text-white">
                LES 18 SCÈNES D'AURA
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl hud-panel text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelect(idx);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl flex items-center gap-4 ${
                    idx === currentIndex ? 'hud-panel-active text-white' : 'hud-panel text-white'
                  }`}
                >
                  <span className="font-title text-hud-min font-bold text-blueCyan">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-hud-min font-semibold line-clamp-1">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};