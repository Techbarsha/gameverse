// User types
export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  stats: UserStats;
  friends: string[]; // User IDs
  createdAt: Date;
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  gameStats: Record<GameType, GameStat>;
}

export interface GameStat {
  played: number;
  won: number;
  highScore: number;
  timePlayed: number; // in seconds
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// Game types
export type GameType = 'ticTacToe' | 'memory' | 'quiz' | 'chess' | 'uno';
export type GameMode = 'ai' | 'offline' | 'multiplayer';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Game {
  id: string;
  type: GameType;
  title: string;
  description: string;
  imageUrl: string;
  supportedModes: GameMode[];
  minPlayers: number;
  maxPlayers: number;
  categories: string[];
  featured?: boolean;
}

export interface GameState {
  gameId: string;
  gameType: GameType;
  mode: GameMode;
  difficulty?: Difficulty;
  players: GamePlayer[];
  currentPlayerIndex: number;
  status: 'waiting' | 'playing' | 'paused' | 'completed';
  winner?: string; // Player ID
  startedAt: Date;
  lastUpdatedAt: Date;
  board?: any; // Game-specific board state
}

export interface GamePlayer {
  id: string;
  username: string;
  avatarUrl?: string;
  score: number;
  isReady: boolean;
  isActive: boolean;
  isAI?: boolean;
}

// Room types
export interface GameRoom {
  id: string;
  name: string;
  gameType: GameType;
  hostId: string;
  players: GamePlayer[];
  spectators: string[]; // User IDs
  maxPlayers: number;
  isPrivate: boolean;
  password?: string;
  status: 'waiting' | 'playing' | 'completed';
  createdAt: Date;
}

// Leaderboard types
export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl?: string;
  score: number;
  rank: number;
}

export interface Leaderboard {
  gameType?: GameType;
  timeFrame: 'daily' | 'weekly' | 'monthly' | 'allTime';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}