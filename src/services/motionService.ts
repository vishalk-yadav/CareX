// Real-world device accelerometer listener for fall-detection simulation & mobile devices

type FallCallback = () => void;

class MotionService {
  private isListening = false;
  private onFallDetected: FallCallback | null = null;
  private lastHighGTime = 0;

  public isAvailable(): boolean {
    return typeof window !== 'undefined' && 'DeviceMotionEvent' in window;
  }

  public async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    // iOS 13+ requires explicit permission request
    const DeviceMotionEventWithPermission = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceMotionEventWithPermission.requestPermission === 'function') {
      try {
        const response = await DeviceMotionEventWithPermission.requestPermission();
        return response === 'granted';
      } catch {
        return false;
      }
    }

    return true; // Non-iOS or older devices grant by default
  }

  public startListening(callback: FallCallback): boolean {
    if (!this.isAvailable() || this.isListening) return false;

    this.onFallDetected = callback;
    this.isListening = true;

    window.addEventListener('devicemotion', this.handleMotion);
    return true;
  }

  public stopListening(): void {
    if (!this.isListening) return;

    window.removeEventListener('devicemotion', this.handleMotion);
    this.isListening = false;
    this.onFallDetected = null;
  }

  private handleMotion = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

    // Calculate magnitude in m/s^2 (normal gravity is ~9.8 m/s^2)
    const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    const now = Date.now();

    // Sudden spike in acceleration (> 26 m/s^2 indicates a hard drop or impact)
    if (magnitude > 26) {
      this.lastHighGTime = now;
    } else if (this.lastHighGTime > 0 && now - this.lastHighGTime < 800) {
      // Followed by relative immobility/rest (< 6 m/s^2 or close to impact settle)
      if (magnitude < 8) {
        this.lastHighGTime = 0;
        if (this.onFallDetected) {
          this.onFallDetected();
        }
      }
    }
  };
}

export const motionService = new MotionService();
