class SoundAndVoiceEngine {
  private ctx: AudioContext | null = null;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  public enabled = true; // Activé par défaut pour entendre AURA (Microsoft Julie)

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Priorité absolue à Microsoft Julie (fr-FR), sinon Hortense, Denise ou Google français
        this.preferredVoice =
          voices.find((v) => v.name.toLowerCase().includes('julie') && v.lang.includes('fr')) ||
          voices.find((v) => v.name.toLowerCase().includes('hortense') && v.lang.includes('fr')) ||
          voices.find((v) => v.name.toLowerCase().includes('denise') && v.lang.includes('fr')) ||
          voices.find((v) => v.name.toLowerCase().includes('google') && v.lang.includes('fr')) ||
          voices.find((v) => v.lang.startsWith('fr')) ||
          null;
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopSpeech();
    } else {
      this.playChime();
    }
    return this.enabled;
  }

  // Carillon harmonique doux avant la prise de parole d'AURA
  public playChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.06, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.55);
    });
  }

  public playSlideWhooshAndBass() { this.playSlideTransition(); }
  playSlideTransition() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.14);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  public playBeep(freq = 880, duration = 0.06) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  // Fait parler AURA avec la voix Microsoft Julie (fr-FR)
  public speakAura(text: string, onStart?: () => void, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();

    if (!this.enabled) {
      onEnd?.();
      return;
    }

    this.playChime();
    const cleanText = text.replace(/[«»*]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 280);
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundAndVoiceEngine();