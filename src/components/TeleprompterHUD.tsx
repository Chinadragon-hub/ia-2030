import React from 'react';
import { Volume2, Mic, BookOpen, RotateCcw, Printer, X } from 'lucide-react';
import { DialogueStep, REHEARSAL_SCENES } from '../data/rehearsalScript';

interface TeleprompterProps {
  currentStep: DialogueStep;
  isAuraSpeaking: boolean;
  onRestartScene: () => void;
  isBookletOpen: boolean;
  setIsBookletOpen: (v: boolean) => void;
}

export const TeleprompterHUD: React.FC<TeleprompterProps> = ({
  currentStep,
  isAuraSpeaking,
  onRestartScene,
  isBookletOpen,
  setIsBookletOpen,
}) => {
  const badgeColor =
    currentStep.speaker === 'AURA'
      ? 'bg-blueCyan text-bgMain'
      : currentStep.speaker === 'MAHMOUD'
      ? 'bg-blueElectric text-white'
      : currentStep.speaker === 'LOUAY'
      ? 'bg-white text-bgMain'
      : 'bg-blueIce/30 text-blueIce';

  return (
    <>
      {/* Bandeau Prompteur en bas au centre (ultra-lisible) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-5xl hud-panel-active px-6 py-4 rounded-2xl pointer-events-auto"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <span className={`px-3.5 py-1 rounded-lg font-title text-hud-min font-extrabold ${badgeColor}`}>
              {currentStep.speakerLabel}
            </span>
            {isAuraSpeaking ? (
              <span className="flex items-center gap-2 text-hud-min font-title font-bold text-blueCyan animate-pulse">
                <Volume2 className="w-5 h-5" />
                AURA PARLE (VOIX JULIE) • NE PAS CLIQUER !
              </span>
            ) : (
              <span className="text-hud-min text-blueIce font-semibold">
                {currentStep.actionTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRestartScene}
              title="Redémarrer la scène (Touche R)"
              className="px-3 py-1 rounded-lg hud-panel text-hud-min font-title text-white hover:border-white flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-blueCyan" />
              <span>Recommencer (R)</span>
            </button>
            <button
              onClick={() => setIsBookletOpen(true)}
              title="Ouvrir le Souffleur & Livret Scénique Officiel"
              className="px-3.5 py-1 rounded-lg bg-blueElectric hover:bg-blueCyan text-white text-hud-min font-title font-bold flex items-center gap-1.5 shadow-glow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Livret & Souffleur</span>
            </button>
          </div>
        </div>

        {/* Parole exacte à prononcer */}
        <p className="text-hud-body text-white font-bold flex items-start gap-2.5">
          <Mic className="w-6 h-6 text-blueCyan shrink-0 mt-1" />
          <span>« {currentStep.speech} »</span>
        </p>

        {/* Conseil scénique discret */}
        <p className="text-hud-min text-blueIce mt-1">
          💡 Jeu : {currentStep.stageTip} — 🤝 Coéquipier : {currentStep.partnerAction}
        </p>
      </div>

      {/* Modale du Souffleur & Livret de Répétition Imprimable */}
      {isBookletOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-bgMain/95 backdrop-blur-xl overflow-y-auto p-6 sm:p-12 pointer-events-auto"
        >
          <div className="max-w-5xl mx-auto hud-panel p-8 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-blueCyan/40">
              <div>
                <h2 className="font-title text-hud-subtitle font-black text-white">
                  LIVRET DE RÉPÉTITION & SOUFFLEUR OFFICIEL
                </h2>
                <p className="text-hud-min text-blueIce">
                  Mahmoud Dammak (Présentateur 1) • Louay Kouki (Présentateur 2) • AURA (Microsoft Julie fr-FR)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-blueElectric text-white font-title text-hud-min font-bold flex items-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  <span>Imprimer / PDF</span>
                </button>
                <button
                  onClick={() => setIsBookletOpen(false)}
                  className="p-2.5 rounded-xl hud-panel text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {REHEARSAL_SCENES.map((scene) => (
                <div key={scene.sceneNumber} className="space-y-3">
                  <div className="border-b border-blueElectric pb-2">
                    <h3 className="font-title text-hud-body font-extrabold text-blueCyan">
                      {scene.sceneNumber} — {scene.title} ({scene.duration})
                    </h3>
                    <p className="text-hud-min text-blueIce">{scene.summary}</p>
                  </div>
                  <div className="space-y-3">
                    {scene.steps.map((st) => (
                      <div key={st.stepIndex} className="p-4 rounded-xl bg-bgMain/90 border border-blueCyan/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="font-title text-hud-min font-bold text-blueCyan">
                            {st.speakerLabel}
                          </span>
                          <span className="text-hud-min text-blueIce">{st.actionTag}</span>
                        </div>
                        <p className="text-hud-body font-bold text-white mb-1">
                          Parole : « {st.speech} »
                        </p>
                        <p className="text-hud-min text-[#E8EEF9]">
                          Conseil de jeu : {st.stageTip} | Coéquipier : {st.partnerAction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};