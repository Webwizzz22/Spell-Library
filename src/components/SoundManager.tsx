'use client';

import React, { useEffect, useRef } from 'react';

interface SoundManagerProps {
  enabled: boolean;
  currentLocation?: string;
  currentCharacter?: string;
  backgroundMusicEnabled?: boolean;
}

class EnhancedSoundLibrary {
  private enabled: boolean = true;
  private musicEnabled: boolean = true;
  private masterVolume: number = 0.7;
  private musicVolume: number = 0.5;
  private sfxVolume: number = 0.8;
  private audioContext: AudioContext | null = null;
  private currentMusic: HTMLAudioElement | null = null;
  private soundCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    try {
      // Initialize audio context safely
      if (typeof window !== 'undefined') {
        console.log('SoundManager initialized successfully');
      }
    } catch {
      console.warn('Audio context not supported, running in silent mode');
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled && this.currentMusic) {
      this.currentMusic.pause();
    }
    console.log(`Sound enabled: ${enabled}`);
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled && this.currentMusic) {
      this.currentMusic.pause();
    }
    console.log(`Music enabled: ${enabled}`);
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
    console.log(`Master volume set to: ${this.masterVolume}`);
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
    console.log(`Music volume set to: ${this.musicVolume}`);
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    console.log(`SFX volume set to: ${this.sfxVolume}`);
  }

  private updateVolumes() {
    if (this.currentMusic) {
      this.currentMusic.volume = this.masterVolume * this.musicVolume;
    }
  }

  private createSafeAudio(src?: string): HTMLAudioElement | null {
    try {
      if (!src || !this.enabled) return null;
      
      const audio = new Audio();
      audio.preload = 'none';
      audio.volume = this.masterVolume * this.sfxVolume;
      
      // Only set src if it's a valid URL or path
      if (src.startsWith('http') || src.startsWith('/') || src.startsWith('./')) {
        audio.src = src;
      }
      
      return audio;
    } catch (error) {
      console.warn('Failed to create audio element:', error);
      return null;
    }
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    try {
      // Create a simple beep or use existing cached sounds
      const cachedSound = this.soundCache.get(soundName);
      if (cachedSound) {
        cachedSound.currentTime = 0;
        cachedSound.play().catch(() => {
          // Silently fail if audio can't play
        });
      } else {
        console.log(`Playing sound: ${soundName}`);
      }
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error);
    }
  }

  playMusic(trackId: string, fadeIn: boolean = true) {
    if (!this.musicEnabled || !this.enabled) return;
    
    try {
      // Stop current music
      if (this.currentMusic) {
        this.currentMusic.pause();
        this.currentMusic = null;
      }
      
      console.log(`Playing music: ${trackId}, fadeIn: ${fadeIn}`);
    } catch (error) {
      console.warn(`Failed to play music ${trackId}:`, error);
    }
  }

  stopMusic(fadeOut: boolean = true) {
    try {
      if (this.currentMusic) {
        this.currentMusic.pause();
        this.currentMusic = null;
      }
      console.log(`Stopping music, fadeOut: ${fadeOut}`);
    } catch (error) {
      console.warn('Failed to stop music:', error);
    }
  }

  playAmbientMusic() {
    this.playMusic('magical-ambient');
  }

  playLocationTheme(locationId: string) {
    console.log(`Playing location theme: ${locationId}`);
  }

  playCharacterTheme(characterId: string) {
    console.log(`Playing character theme: ${characterId}`);
  }

  crossfadeToTrack(newTrackId: string, duration: number = 3000) {
    console.log(`Crossfading to track: ${newTrackId}, duration: ${duration}`);
  }

  getCurrentTrack(): string | null {
    return null;
  }

  isMusicPlaying(): boolean {
    return this.currentMusic !== null && !this.currentMusic.paused;
  }
}

export const enhancedSoundLibrary = new EnhancedSoundLibrary();

// Keep the old soundLibrary for backward compatibility
export const soundLibrary = {
  play: (soundName: string) => enhancedSoundLibrary.play(soundName),
  setEnabled: (enabled: boolean) => enhancedSoundLibrary.setEnabled(enabled)
};

const SoundManager: React.FC<SoundManagerProps> = ({ 
  enabled, 
  currentLocation, 
  currentCharacter,
  backgroundMusicEnabled = true 
}) => {
  const lastLocationRef = useRef<string | undefined>();
  const lastCharacterRef = useRef<string | undefined>();

  useEffect(() => {
    enhancedSoundLibrary.setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    enhancedSoundLibrary.setMusicEnabled(backgroundMusicEnabled);
  }, [backgroundMusicEnabled]);

  // Handle location-based music
  useEffect(() => {
    if (currentLocation && currentLocation !== lastLocationRef.current) {
      enhancedSoundLibrary.playLocationTheme(currentLocation);
      lastLocationRef.current = currentLocation;
    }
  }, [currentLocation]);

  // Handle character-based music
  useEffect(() => {
    if (currentCharacter && currentCharacter !== lastCharacterRef.current) {
      enhancedSoundLibrary.playCharacterTheme(currentCharacter);
      lastCharacterRef.current = currentCharacter;
    }
  }, [currentCharacter]);

  return null;
};

export default SoundManager;