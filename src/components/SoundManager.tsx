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

  constructor() {
    console.log('SoundManager initialized successfully');
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    console.log(`Sound enabled: ${enabled}`);
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    console.log(`Music enabled: ${enabled}`);
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    console.log(`Master volume set to: ${this.masterVolume}`);
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    console.log(`Music volume set to: ${this.musicVolume}`);
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    console.log(`SFX volume set to: ${this.sfxVolume}`);
  }

  play(soundName: string) {
    if (this.enabled) {
      console.log(`Playing sound: ${soundName}`);
    }
  }

  playMusic(trackId: string, fadeIn: boolean = true) {
    if (this.musicEnabled) {
      console.log(`Playing music: ${trackId}, fadeIn: ${fadeIn}`);
    }
  }

  stopMusic(fadeOut: boolean = true) {
    console.log(`Stopping music, fadeOut: ${fadeOut}`);
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
    return false;
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