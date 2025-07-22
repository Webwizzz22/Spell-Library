export interface User {
  id: string;
  name: string;
  house: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin';
  level: number;
  totalXP: number;
  joinedAt: Date;
  avatar?: string;
  favoriteCharacters?: string[];
  visitedLocations?: string[];
  discoveredSpells?: string[];
}

export interface Spell {
  id: string;
  name: string;
  topic: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  house: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin';
  icon: string;
  content: SpellContent;
  prerequisites?: string[];
  estimatedTime: string;
}

export interface SpellContent {
  theory: string;
  example: string;
  practice: string;
  quiz: QuizQuestion[];
  magicalFacts: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SpellProgress {
  spellId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
  attempts: number;
  xpEarned?: number;
  timeSpent?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface Character {
  id: string;
  name: string;
  house?: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin';
  bloodStatus: 'pureblood' | 'halfblood' | 'muggleborn' | 'muggle' | 'unknown';
  role: 'student' | 'professor' | 'auror' | 'ministry' | 'death_eater' | 'order_member' | 'other';
  yearOfBirth?: number;
  patronus?: string;
  boggart?: string;
  wand?: {
    wood: string;
    core: string;
    length: string;
  };
  description: string;
  imageUrl: string;
  quotes: string[];
  facts: string[];
  relationships: {
    character: string;
    relationship: string;
  }[];
  appearances: {
    books: string[];
    movies: string[];
  };
  actor?: string;
  theme?: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'school' | 'shop' | 'residence' | 'ministry' | 'magical_place' | 'muggle_place';
  description: string;
  imageUrl: string;
  significance: string;
  notableEvents: string[];
  residents?: string[];
  theme?: string;
  interactiveElements?: {
    type: 'hover' | 'click' | 'scroll';
    element: string;
    effect: string;
  }[];
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  location: string;
  characters: string[];
  requiredSpells?: string[];
  rewards: {
    xp: number;
    achievements?: string[];
  };
  completed: boolean;
  unlocked: boolean;
}