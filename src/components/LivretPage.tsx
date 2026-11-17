import React, { useEffect } from 'react';
import { Printer } from 'lucide-react';
import { SLIDES_DATA, SpeakerRole } from '../data/slides';
import { PRESENTATION_CONFIG, KEY_MEMORABLE_PHRASES } from '../data/config';

const getBookletSpeakerBadge = (role: SpeakerRole) => {
  if (role === 'LOUAY') {
    return {
      label: PRESENTATION_CONFIG.presenter1Badge,
      className: 'bg-[#1E40AF] text-white border border-[#1E3A8A]',
    };
  }
  if (role === 'MAHMOUD') {
    return {
      label: PRESENTATION_CONFIG.presenter2Badge,
      className: 'bg-[#0F172A] text-white border border-[#334155]',
    };
  }
  return {
    label: PRESENTATION_CONFIG.assistantBookletBadge,
    className: 'bg-[#0284C7] text-white border border-[#0369A1]',
  };
};

export const LivretPage: React.FC = () => {
  const totalPages = SLIDES_DATA.length + 2; // Page 1 (Garde) + 18 Scènes + Page Finale (Aide-mémoire)

  useEffect(() => {
    document.title = "Livret de Répétition et Guide Scénique Officiel — L'IA en 2030";
    document.body.style.overflow = 'auto';
    document.body.style.backgroundColor = '#E2E8F0';
    return () => {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#05070D';
    };
  }, []);

  const PageHeader: React.FC = () => (
    <div className="flex items-center justify-between border-b-2 border-[#1E3A8A] pb-2 mb-4 text-[11px] font-semibold text-[#1E3A8A]">
      <span>LA PRÉSENTATION — Guide Scénique Officiel (Louay Kouki & Mahmoud Dammak)</span>
      <span>L'INTELLIGENCE ARTIFICIELLE EN 2030</span>
    </div>
  );

  const PageFooter: React.FC<{ pageNum: number }> = ({ pageNum }) => (
    <div className="flex items-center justify-between border-t border-slate-300 pt-2 mt-6 text-[11px] text-slate-600">
      <span>Présentation Interactive 3D • {PRESENTATION_CONFIG.appUrl}</span>
      <span className="font-bold text-[#0F172A]">
        Page {pageNum} / {totalPages}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 py-8 px-4 print:p-0 print:bg-white">
      {/* Barre d'action en haut d'écran (masquée à l'impression) */}
      <div className="no-print max-w-[210mm] mx-auto mb-6 bg-[#0A1020] text-white p-5 rounded-2xl shadow-xl border border-blueCyan flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-title text-blueCyan uppercase tracking-wider block">
            DOCUMENT OFFICIEL A4 PRÊT À IMPRIMER
          </span>
          <h1 className="font-title text-xl font-bold">
            Livret de Répétition — Louay Kouki & Mahmoud Dammak
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/LIVRET_DE_REPETITION_IA_2030.pdf"
            download="LIVRET_DE_REPETITION_IA_2030.pdf"
            className="px-5 py-3 rounded-xl bg-[#0A1020] border border-blueCyan hover:border-white text-white font-title text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blueCyan" />
            <span>Fichier PDF Direct</span>
          </a>
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-xl bg-[#1E6BFF] hover:bg-[#3DA5FF] text-white font-title text-base font-extrabold shadow-lg flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimer / Exporter</span>
          </button>
        </div>
      </div>

      {/* CONTENEUR DES PAGES A4 */}
      <div className="max-w-[210mm] mx-auto space-y-8 print:space-y-0">
        {/* ==================== PAGE 1 : PAGE DE GARDE, VUE D'ENSEMBLE & COMMANDES ==================== */}
        <section className="bg-white p-8 shadow-md print:shadow-none print:p-0 flex flex-col justify-between min-h-[270mm]">
          <div>
            <PageHeader />
            <div className="text-center my-4">
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                LA PRÉSENTATION « L'INTELLIGENCE ARTIFICIELLE EN 2030 »
              </h1>
              <p className="text-sm font-semibold text-[#1E40AF] mt-1">
                « {PRESENTATION_CONFIG.subTitle} »
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
                LIVRET DE RÉPÉTITION ET GUIDE SCÉNIQUE OFFICIEL
              </p>
            </div>

            {/* Tableau d'en-tête officiel */}
            <table className="w-full border-collapse border border-slate-300 text-xs mb-5">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="bg-slate-100 font-bold text-[#1E3A8A] p-2.5 w-1/4">
                    PRÉSENTATEURS
                  </td>
                  <td className="p-2.5 font-semibold text-slate-900">
                    Louay Kouki (Présentateur 1) • Mahmoud Dammak (Présentateur 2)
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="bg-slate-100 font-bold text-[#1E3A8A] p-2.5">
                    ASSISTANTE VOCALE
                  </td>
                  <td className="p-2.5 text-slate-900">
                    AURA, voix invisible intégrée • Voix humaine chaleureuse :{' '}
                    <strong>Microsoft Julie (fr-FR)</strong>
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="bg-slate-100 font-bold text-[#1E3A8A] p-2.5">
                    DURÉE & NIVEAU
                  </td>
                  <td className="p-2.5 text-slate-900">{PRESENTATION_CONFIG.durationLabel}</td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-bold text-[#1E3A8A] p-2.5">
                    APPLICATION EN DIRECT
                  </td>
                  <td className="p-2.5 font-semibold text-[#1E40AF]">
                    Application web 3D • {PRESENTATION_CONFIG.appUrl}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 1. Vue d'Ensemble & Déroulement Général */}
            <h2 className="text-sm font-extrabold text-[#1E3A8A] border-b border-[#1E3A8A] pb-1 mb-2">
              1. Vue d'Ensemble & Déroulement Général
            </h2>
            <p className="text-xs leading-relaxed text-slate-800 mb-5">
              Ce livret donne à Louay Kouki (Présentateur 1) et Mahmoud Dammak (Présentateur 2) la
              conduite exacte de leur présentation orale. Chaque réplique correspond rigoureusement
              au texte affiché dans le prompteur de l'application. Les indications de clic
              permettent de synchroniser les paroles avec les animations 3D sans la moindre
              hésitation.
            </p>

            {/* 2. Guide des Commandes et Gestuelle Interactive */}
            <h2 className="text-sm font-extrabold text-[#1E3A8A] border-b border-[#1E3A8A] pb-1 mb-2">
              2. Guide des Commandes et Gestuelle Interactive
            </h2>
            <table className="w-full border-collapse border border-slate-300 text-xs mb-5">
              <thead>
                <tr className="bg-slate-100 text-[#1E3A8A] border-b border-slate-300 text-left">
                  <th className="p-2 w-1/4">ACTION</th>
                  <th className="p-2 w-1/3">COMMANDE SOURIS / CLAVIER</th>
                  <th className="p-2">EFFET & BONNE PRATIQUE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-[#1E40AF]">AVANCER D'UNE ÉTAPE</td>
                  <td className="p-2 font-semibold">Clic GAUCHE, Flèche Droite → ou Espace</td>
                  <td className="p-2">Passe à la réplique ou à la scène suivante.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-red-700">RECULER (ANNULATION)</td>
                  <td className="p-2 font-semibold">Clic DROIT ou Flèche Gauche ←</td>
                  <td className="p-2">Revient immédiatement à l'étape précédente.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-amber-700">REDÉMARRER LA SCÈNE</td>
                  <td className="p-2 font-semibold">Touche R</td>
                  <td className="p-2">Remet la scène active à l'étape 0 et coupe l'audio.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-[#1E40AF]">PLEIN ÉCRAN</td>
                  <td className="p-2 font-semibold">Touche F</td>
                  <td className="p-2">Active le plein écran et le mode public épuré.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-emerald-700">SOUFFLEUR SÉPARÉ</td>
                  <td className="p-2 font-semibold">Touche P</td>
                  <td className="p-2">Ouvre le souffleur synchronisé dans une fenêtre séparée.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-slate-700">MODE PUBLIC</td>
                  <td className="p-2 font-semibold">Touche H</td>
                  <td className="p-2">Masque tous les boutons et indicateurs de régie.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold text-slate-700">TEXTE CLAIR</td>
                  <td className="p-2 font-semibold">Touche T</td>
                  <td className="p-2">Désactive les effets visuels sur les titres.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700">PERFORMANCE</td>
                  <td className="p-2 font-semibold">Touche L</td>
                  <td className="p-2">Allège les particules 3D sur ordinateur modeste.</td>
                </tr>
              </tbody>
            </table>

            {/* Les 4 Règles d'Or du Direct */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 text-xs space-y-1">
              <p className="font-extrabold text-amber-900 mb-1">LES 4 RÈGLES D'OR DU DIRECT :</p>
              <p>
                <strong>1. Attendre la voix de l'assistante :</strong> Ne jamais cliquer pendant
                qu'elle parle.
              </p>
              <p>
                <strong>2. Récupération en cas d'erreur :</strong> Si on clique deux fois trop
                vite, faire immédiatement un clic droit.
              </p>
              <p>
                <strong>3. Le contact avec le public :</strong> Regarder la classe avec le sourire,
                ne pas garder les yeux fixés sur l'écran.
              </p>
              <p>
                <strong>4. Rester synchronisés :</strong> Le coéquipier attend son signal avant de
                parler.
              </p>
            </div>
          </div>
          <PageFooter pageNum={1} />
        </section>

        {/* ==================== PAGES 2 À 19 : UNE PAGE PAR SCÈNE (18 SCÈNES) ==================== */}
        {SLIDES_DATA.map((slide, sIdx) => (
          <section
            key={slide.id}
            className="print-page-break bg-white p-8 shadow-md print:shadow-none print:p-0 flex flex-col justify-between min-h-[270mm]"
          >
            <div>
              <PageHeader />
              <div className="border-b-2 border-[#1E40AF] pb-2 mb-4">
                <h2 className="text-lg font-extrabold text-[#0F172A]">
                  {slide.sceneNumber} — {slide.title}
                </h2>
                <p className="text-xs font-semibold text-[#1E40AF]">
                  Durée : {slide.duration} • {slide.summary}
                </p>
              </div>

              <div className="space-y-3">
                {slide.steps.map((st, stepIdx) => {
                  const badge = getBookletSpeakerBadge(st.speaker);
                  return (
                    <div
                      key={st.id}
                      className="print-step-row border border-slate-300 rounded-md overflow-hidden grid grid-cols-12 text-xs"
                    >
                      <div className="col-span-3 bg-slate-50 p-3 border-r border-slate-300 flex flex-col justify-center items-center text-center">
                        <span
                          className={`px-2.5 py-1 rounded text-[11px] font-extrabold tracking-wide ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="col-span-9 p-3 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-1">
                          <span className="font-bold text-slate-900">
                            Étape {stepIdx} : {st.title}
                          </span>
                          <span
                            className={`font-extrabold ${
                              st.waitAudio ? 'text-amber-700' : 'text-emerald-700'
                            }`}
                          >
                            {st.clickIndication}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[#0F172A] leading-snug">
                          Parole : « {st.speech} »
                        </p>
                        <p className="text-slate-700 italic">
                          <strong>Conseil de jeu :</strong> {st.stageTip}
                        </p>
                        <p className="text-slate-700 italic">
                          <strong>Action du coéquipier :</strong> {st.partnerAction}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <PageFooter pageNum={sIdx + 2} />
          </section>
        ))}

        {/* ==================== PAGE 20 : AIDE-MÉMOIRE EXPRESS & PROTOCOLE DE SÉCURITÉ ==================== */}
        <section className="print-page-break bg-white p-8 shadow-md print:shadow-none print:p-0 flex flex-col justify-between min-h-[270mm]">
          <div>
            <PageHeader />
            <h2 className="text-base font-extrabold text-[#0F172A] border-b-2 border-[#1E40AF] pb-1 mb-3">
              4. AIDE-MÉMOIRE EXPRESS — LE JOUR DE LA PRÉSENTATION
            </h2>

            <table className="w-full border-collapse border border-slate-300 text-[11px] mb-4">
              <thead>
                <tr className="bg-[#0F172A] text-white text-left">
                  <th className="p-1.5">SCÈNE & TITRE</th>
                  <th className="p-1.5">QUI COMMENCE ?</th>
                  <th className="p-1.5">MOMENT DU CLIC</th>
                  <th className="p-1.5">RÈGLE CRITIQUE À RETENIR</th>
                </tr>
              </thead>
              <tbody>
                {SLIDES_DATA.map((s) => {
                  const firstSpeaker = s.steps[0]?.speaker;
                  const starterLabel =
                    firstSpeaker === 'LOUAY'
                      ? 'Louay Kouki'
                      : firstSpeaker === 'MAHMOUD'
                      ? 'Mahmoud Dammak'
                      : 'Assistante (AURA)';
                  return (
                    <tr key={s.id} className="border-b border-slate-200">
                      <td className="p-1.5 font-bold text-slate-900">
                        {String(s.id).padStart(2, '0')}. {s.shortName} ({s.duration.replace(' secondes', 's')})
                      </td>
                      <td className="p-1.5 font-semibold text-[#1E40AF]">{starterLabel}</td>
                      <td className="p-1.5 text-slate-700">Après chaque réplique</td>
                      <td className="p-1.5 font-medium text-slate-900">{s.criticalRule}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Phrases Clés Mémorisables des Deux Orateurs */}
            <h3 className="text-xs font-extrabold text-[#1E3A8A] uppercase mb-2">
              Phrases Clés Mémorisables des Deux Orateurs :
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4 text-[11px]">
              <div className="border border-slate-300 rounded p-2.5 bg-slate-50 space-y-1">
                <p className="font-extrabold text-[#1E40AF]">
                  LOUAY KOUKI (PRÉSENTATEUR 1) :
                </p>
                {KEY_MEMORABLE_PHRASES.louay.map((p, i) => (
                  <p key={i} className="italic text-slate-800">
                    • « {p} »
                  </p>
                ))}
              </div>
              <div className="border border-slate-300 rounded p-2.5 bg-slate-50 space-y-1">
                <p className="font-extrabold text-[#0F172A]">
                  MAHMOUD DAMMAK (PRÉSENTATEUR 2) :
                </p>
                {KEY_MEMORABLE_PHRASES.mahmoud.map((p, i) => (
                  <p key={i} className="italic text-slate-800">
                    • « {p} »
                  </p>
                ))}
              </div>
            </div>

            {/* 5. Protocole de Sécurité en cas d'imprévu */}
            <div className="bg-slate-100 border-l-4 border-[#0F172A] p-3 text-xs space-y-1">
              <p className="font-extrabold text-[#0F172A]">
                5. PROTOCOLE DE SÉCURITÉ EN CAS D'IMPRÉVU :
              </p>
              <p>
                • <strong>Clic trop rapide ou saut d'étape :</strong> Faire immédiatement un{' '}
                <strong>Clic DROIT</strong> (ou touche Flèche Gauche ←) pour revenir en arrière.
              </p>
              <p>
                • <strong>Désynchronisation complète :</strong> Appuyer sur la touche{' '}
                <strong>R</strong> pour réinitialiser la scène au début sans stress.
              </p>
              <p>
                • <strong>Audio muet :</strong> Les sous-titres s'affichent toujours en haut de
                l'écran, lire la phrase d'AURA directement.
              </p>
            </div>
          </div>
          <PageFooter pageNum={totalPages} />
        </section>
      </div>
    </div>
  );
};
