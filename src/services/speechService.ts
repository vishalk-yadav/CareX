export interface SpeechRecognitionResultState {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
}

// Minimal interface for webkitSpeechRecognition
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface WebkitSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export class SpeechRecognitionService {
  private recognition: WebkitSpeechRecognition | null = null;
  private isListening = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  public startListening(
    onTriggerDetected: () => void,
    onTranscriptUpdate: (text: string) => void,
    onError: (err: string) => void
  ): () => void {
    if (!this.isSupported()) {
      onError('Voice assistance is not supported in this browser. Please use the SOS button.');
      return () => {};
    }

    try {
      const SpeechRecognitionConstructor =
        (window as unknown as { SpeechRecognition?: new () => WebkitSpeechRecognition }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: new () => WebkitSpeechRecognition }).webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        onError('SpeechRecognition constructor unavailable');
        return () => {};
      }

      this.recognition = new SpeechRecognitionConstructor();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = 0; i < Object.keys(event.results).length; i++) {
          const item = event.results[i];
          if (item && item[0]) {
            currentTranscript += item[0].transcript.toLowerCase() + ' ';
          }
        }

        onTranscriptUpdate(currentTranscript.trim());

        // Check for trigger phrase: "carex emergency", "carex, emergency", or "emergency"
        const clean = currentTranscript.toLowerCase();
        if (
          clean.includes('carex emergency') ||
          clean.includes('carex, emergency') ||
          clean.includes('emergency sos') ||
          clean.includes('help me emergency')
        ) {
          onTriggerDetected();
          this.stopListening();
        }
      };

      this.recognition.onerror = (e) => {
        if (e.error !== 'no-speech') {
          onError(`Voice recognition error: ${e.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
      return () => this.stopListening();
    } catch (err: unknown) {
      onError((err as Error).message || 'Failed to initialize voice recognition');
      return () => {};
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechRecognitionService();
