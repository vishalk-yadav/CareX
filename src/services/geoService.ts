import type { EmergencyLocation } from '../types';

const DEFAULT_FALLBACK_LOCATION: EmergencyLocation = {
  latitude: 28.4595,
  longitude: 77.0266,
  accuracyMeters: 18,
  address: 'DLF Cyber City, Sector 24',
  city: 'Gurugram',
  state: 'Haryana',
  country: 'India',
  timestamp: new Date().toISOString()
};

export async function fetchCurrentPosition(): Promise<EmergencyLocation> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      ...DEFAULT_FALLBACK_LOCATION,
      timestamp: new Date().toISOString()
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        const accuracy = Math.round(pos.coords.accuracy || 15);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { signal: controller.signal, headers: { 'Accept-Language': 'en' } }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const street = addr.road || addr.suburb || addr.neighbourhood || 'Near Current Location';
            const city = addr.city || addr.town || addr.municipality || 'Local Area';
            const state = addr.state || '';
            const country = addr.country || '';

            resolve({
              latitude: lat,
              longitude: lng,
              accuracyMeters: accuracy,
              address: `${street}, ${city}`,
              city: city,
              state: state,
              country: country,
              timestamp: new Date().toISOString()
            });
            return;
          }
        } catch {}

        resolve({
          latitude: lat,
          longitude: lng,
          accuracyMeters: accuracy,
          address: `GPS Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          city: 'Local Area',
          state: '',
          country: '',
          timestamp: new Date().toISOString()
        });
      },
      (error) => {
        console.warn('Geolocation failed or denied:', error.message);
        resolve({
          ...DEFAULT_FALLBACK_LOCATION,
          timestamp: new Date().toISOString()
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 10000
      }
    );
  });
}

export function generateGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function generateEmergencyShareText(location: EmergencyLocation, patientName: string): string {
  const mapsLink = generateGoogleMapsUrl(location.latitude, location.longitude);
  return `🚨 EMERGENCY ALERT FROM ${patientName.toUpperCase()} via CareX!
I need immediate assistance.
📍 My Live Location: ${location.address} (${location.city})
🗺️ Map: ${mapsLink}
Accuracy: ±${location.accuracyMeters}m
Timestamp: ${new Date(location.timestamp).toLocaleTimeString()}`;
}

export async function shareLocation(
  location: EmergencyLocation,
  patientName: string
): Promise<{ success: boolean; method: 'web-share' | 'clipboard' | 'unsupported'; error?: string }> {
  const text = generateEmergencyShareText(location, patientName);
  const title = `🚨 CareX SOS Emergency - ${patientName}`;
  const url = generateGoogleMapsUrl(location.latitude, location.longitude);

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return { success: true, method: 'web-share' };
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        return { success: false, method: 'web-share', error: 'User cancelled share dialog' };
      }
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    } catch {
      return { success: false, method: 'unsupported', error: 'Clipboard write failed' };
    }
  }

  return { success: false, method: 'unsupported' };
}
