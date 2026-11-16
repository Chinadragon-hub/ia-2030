export interface SyncPayload {
  type: 'STATE_UPDATE' | 'COMMAND';
  slideIndex?: number;
  stepIndex?: number;
  elapsedSeconds?: number;
  isAuraSpeaking?: boolean;
  command?: 'NEXT' | 'PREV' | 'RESTART' | 'GOTO_SLIDE';
  targetSlide?: number;
}

class SyncManager {
  private channel: BroadcastChannel | null = null;
  private listeners: ((payload: SyncPayload) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('ia_2030_sync');
      this.channel.onmessage = (event) => {
        this.listeners.forEach((fn) => fn(event.data));
      };
    }
  }

  send(payload: SyncPayload) {
    if (this.channel) {
      try {
        this.channel.postMessage(payload);
      } catch (e) {
        console.warn('Sync postMessage failed', e);
      }
    }
  }

  subscribe(callback: (payload: SyncPayload) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }
}

export const syncManager = new SyncManager();
