// Safe audio utilities to prevent atob errors

export const createSafeAudio = (src: string): HTMLAudioElement | null => {
  try {
    // Don't create audio if src is invalid
    if (!src || src.includes('data:') || src.includes('blob:')) {
      console.warn('Skipping invalid audio source:', src);
      return null;
    }
    
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = 0.5;
    
    // Only set valid sources
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('./')) {
      audio.src = src;
    }
    
    return audio;
  } catch (error) {
    console.warn('Failed to create audio:', error);
    return null;
  }
};

export const safeAudioPlay = (audio: HTMLAudioElement | null): void => {
  if (!audio) return;
  
  try {
    audio.play().catch(error => {
      console.warn('Audio play failed (user interaction required):', error);
    });
  } catch (error) {
    console.warn('Audio play error:', error);
  }
};

// Prevent any atob calls that might cause errors
export const isValidBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};
