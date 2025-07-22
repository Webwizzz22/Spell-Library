export interface MusicTrack {
  id: string;
  name: string;
  category: 'character' | 'location' | 'ambient' | 'spell' | 'theme';
  url: string;
  duration: number;
  description: string;
  associatedCharacter?: string;
  associatedLocation?: string;
  mood: 'mysterious' | 'heroic' | 'dark' | 'magical' | 'nostalgic' | 'epic' | 'peaceful';
  volume: number;
}

export const musicLibrary: MusicTrack[] = [
  // Character Themes
  {
    id: 'hedwigs-theme',
    name: "Hedwig's Theme",
    category: 'character',
    url: '/audio/hedwigs-theme.mp3',
    duration: 246,
    description: 'The iconic main theme of Harry Potter, representing wonder and magic',
    associatedCharacter: 'harry-potter',
    mood: 'magical',
    volume: 0.7
  },
  {
    id: 'hermiones-theme',
    name: "Hermione's Theme",
    category: 'character',
    url: '/audio/hermiones-theme.mp3',
    duration: 180,
    description: 'A thoughtful and intelligent melody representing wisdom and friendship',
    associatedCharacter: 'hermione-granger',
    mood: 'nostalgic',
    volume: 0.6
  },
  {
    id: 'snapes-theme',
    name: "Snape's Theme",
    category: 'character',
    url: '/audio/snapes-theme.mp3',
    duration: 210,
    description: 'A haunting melody that captures complexity and hidden depths',
    associatedCharacter: 'severus-snape',
    mood: 'mysterious',
    volume: 0.8
  },
  {
    id: 'voldemorts-theme',
    name: "Voldemort's Theme",
    category: 'character',
    url: '/audio/voldemorts-theme.mp3',
    duration: 190,
    description: 'Dark and menacing tones representing evil and power',
    associatedCharacter: 'voldemort',
    mood: 'dark',
    volume: 0.9
  },
  {
    id: 'dumbledores-theme',
    name: "Dumbledore's Theme",
    category: 'character',
    url: '/audio/dumbledores-theme.mp3',
    duration: 220,
    description: 'Wise and warm melody representing guidance and hope',
    associatedCharacter: 'albus-dumbledore',
    mood: 'peaceful',
    volume: 0.7
  },

  // Location Themes
  {
    id: 'hogwarts-theme',
    name: 'Hogwarts Castle',
    category: 'location',
    url: '/audio/hogwarts-theme.mp3',
    duration: 300,
    description: 'Majestic theme for the magical school',
    associatedLocation: 'hogwarts',
    mood: 'epic',
    volume: 0.8
  },
  {
    id: 'diagon-alley-theme',
    name: 'Diagon Alley',
    category: 'location',
    url: '/audio/diagon-alley.mp3',
    duration: 240,
    description: 'Bustling marketplace atmosphere with magical undertones',
    associatedLocation: 'diagon-alley',
    mood: 'magical',
    volume: 0.6
  },
  {
    id: 'forbidden-forest-theme',
    name: 'Forbidden Forest',
    category: 'location',
    url: '/audio/forbidden-forest.mp3',
    duration: 280,
    description: 'Dark and mysterious forest ambiance',
    associatedLocation: 'forbidden-forest',
    mood: 'mysterious',
    volume: 0.7
  },
  {
    id: 'great-hall-theme',
    name: 'Great Hall',
    category: 'location',
    url: '/audio/great-hall.mp3',
    duration: 200,
    description: 'Grand and welcoming atmosphere of the Great Hall',
    associatedLocation: 'great-hall',
    mood: 'magical',
    volume: 0.6
  },

  // Ambient Tracks
  {
    id: 'magical-ambient',
    name: 'Magical Ambience',
    category: 'ambient',
    url: '/audio/magical-ambient.mp3',
    duration: 600,
    description: 'Gentle magical sounds for background atmosphere',
    mood: 'peaceful',
    volume: 0.4
  },
  {
    id: 'quidditch-match',
    name: 'Quidditch Match',
    category: 'ambient',
    url: '/audio/quidditch-match.mp3',
    duration: 320,
    description: 'Exciting sports atmosphere with crowd cheers',
    mood: 'epic',
    volume: 0.8
  },

  // Spell Sounds
  {
    id: 'spell-cast',
    name: 'Spell Casting',
    category: 'spell',
    url: '/audio/spell-cast.mp3',
    duration: 3,
    description: 'Generic spell casting sound effect',
    mood: 'magical',
    volume: 0.7
  },
  {
    id: 'apparition',
    name: 'Apparition',
    category: 'spell',
    url: '/audio/apparition.mp3',
    duration: 2,
    description: 'Teleportation sound effect',
    mood: 'magical',
    volume: 0.8
  },
  {
    id: 'patronus-cast',
    name: 'Patronus Casting',
    category: 'spell',
    url: '/audio/patronus.mp3',
    duration: 4,
    description: 'The sound of casting a Patronus charm',
    mood: 'heroic',
    volume: 0.6
  }
];

export const getTracksByCategory = (category: string) => {
  return musicLibrary.filter(track => track.category === category);
};

export const getTracksByMood = (mood: string) => {
  return musicLibrary.filter(track => track.mood === mood);
};

export const getCharacterTheme = (characterId: string) => {
  return musicLibrary.find(track => track.associatedCharacter === characterId);
};

export const getLocationTheme = (locationId: string) => {
  return musicLibrary.find(track => track.associatedLocation === locationId);
};
