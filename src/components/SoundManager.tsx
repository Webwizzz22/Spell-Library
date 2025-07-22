import React, { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { musicLibrary } from '../data/musicLibrary';

interface SoundManagerProps {
  enabled: boolean;
  currentLocation?: string;
  currentCharacter?: string;
  backgroundMusicEnabled?: boolean;
}

class EnhancedSoundLibrary {
  private sounds: { [key: string]: Howl } = {};
  private musicTracks: { [key: string]: Howl } = {};
  private currentMusic: Howl | null = null;
  private currentMusicId: string | null = null;
  private enabled: boolean = true;
  private musicEnabled: boolean = true;
  private masterVolume: number = 0.7;
  private musicVolume: number = 0.5;
  private sfxVolume: number = 0.8;

  constructor() {
    // Initialize sound effects
    this.sounds = {
      spellCast: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.3
      }),
      pageTransition: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.4
      }),
      achievement: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.6
      }),
      hover: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.2
      }),
      sortingHat: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.5
      }),
      wand: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.4
      }),
      doorOpen: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.3
      }),
      bookPage: new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: this.sfxVolume * 0.2
      })
    };

    // Initialize music tracks from our music library
    this.initializeMusicTracks();
  }

  private initializeMusicTracks() {
    musicLibrary.forEach(track => {
      // In a real implementation, you would load actual audio files
      // For now, we'll create placeholder Howl instances
      this.musicTracks[track.id] = new Howl({
        src: [track.url],
        loop: track.category === 'ambient' || track.category === 'location',
        volume: this.musicVolume * track.volume,
        onend: () => {
          if (track.category === 'character' || track.category === 'theme') {
            // Auto-play ambient music after character/theme music ends
            this.playAmbientMusic();
          }
        }
      });
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAllSounds();
    }
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.masterVolume);
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.musicTracks).forEach(track => {
      track.volume(this.musicVolume);
    });
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      sound.volume(this.sfxVolume * 0.3);
    });
  }

  play(soundName: string) {
    if (this.enabled && this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  playMusic(trackId: string, fadeIn: boolean = true) {
    if (!this.musicEnabled) return;

    const track = this.musicTracks[trackId];
    if (!track) return;

    // Stop current music first
    this.stopMusic(fadeIn);

    // Play new track
    this.currentMusic = track;
    this.currentMusicId = trackId;

    if (fadeIn) {
      track.volume(0);
      track.play();
      track.fade(0, this.musicVolume, 2000);
    } else {
      track.volume(this.musicVolume);
      track.play();
    }
  }

  stopMusic(fadeOut: boolean = true) {
    if (this.currentMusic) {
      if (fadeOut) {
        this.currentMusic.fade(this.currentMusic.volume(), 0, 1000);
        setTimeout(() => {
          if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
            this.currentMusicId = null;
          }
        }, 1000);
      } else {
        this.currentMusic.stop();
        this.currentMusic = null;
        this.currentMusicId = null;
      }
    }
  }

  playAmbientMusic() {
    if (this.currentMusicId !== 'magical-ambient') {
      this.playMusic('magical-ambient');
    }
  }

  playLocationTheme(locationId: string) {
    const locationMusic = musicLibrary.find(track => 
      track.associatedLocation === locationId
    );
    if (locationMusic) {
      this.playMusic(locationMusic.id);
    }
  }

  playCharacterTheme(characterId: string) {
    const characterMusic = musicLibrary.find(track => 
      track.associatedCharacter === characterId
    );
    if (characterMusic) {
      this.playMusic(characterMusic.id);
    }
  }

  crossfadeToTrack(newTrackId: string, duration: number = 3000) {
    if (!this.musicEnabled) return;

    const newTrack = this.musicTracks[newTrackId];
    if (!newTrack) return;

    if (this.currentMusic) {
      // Fade out current music
      this.currentMusic.fade(this.currentMusic.volume(), 0, duration / 2);
      
      // Start new music at low volume and fade in
      setTimeout(() => {
        newTrack.volume(0);
        newTrack.play();
        newTrack.fade(0, this.musicVolume, duration / 2);
        
        // Stop old music
        if (this.currentMusic) {
          this.currentMusic.stop();
        }
        
        this.currentMusic = newTrack;
        this.currentMusicId = newTrackId;
      }, duration / 2);
    } else {
      this.playMusic(newTrackId);
    }
  }

  private stopAllSounds() {
    Object.values(this.sounds).forEach(sound => sound.stop());
    this.stopMusic(false);
  }

  getCurrentTrack(): string | null {
    return this.currentMusicId;
  }

  isMusicPlaying(): boolean {
    return this.currentMusic?.playing() || false;
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