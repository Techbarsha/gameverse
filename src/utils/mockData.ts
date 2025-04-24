import { Game, User, Achievement, GameType } from '../types';

export const mockGames: Game[] = [
  {
    id: '1',
    type: 'ticTacToe',
    title: 'Tic Tac Toe',
    description: 'Classic game of X and O. Be the first to get three in a row!',
    imageUrl: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    supportedModes: ['ai', 'offline', 'multiplayer'],
    minPlayers: 2,
    maxPlayers: 2,
    categories: ['strategy', 'casual'],
    featured: true,
  },
  {
    id: '2',
    type: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Find all matches to win!',
    imageUrl: 'https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    supportedModes: ['ai', 'offline', 'multiplayer'],
    minPlayers: 1,
    maxPlayers: 4,
    categories: ['puzzle', 'casual'],
    featured: true,
  },
  {
    id: '3',
    type: 'quiz',
    title: 'Trivia Challenge',
    description: 'Test your knowledge with hundreds of trivia questions across various categories!',
    imageUrl: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    supportedModes: ['offline', 'multiplayer'],
    minPlayers: 1,
    maxPlayers: 8,
    categories: ['trivia', 'education'],
  },
  {
    id: '4',
    type: 'chess',
    title: 'Chess',
    description: 'The classic game of strategy. Challenge your mind and defeat your opponent!',
    imageUrl: 'https://images.pexels.com/photos/814133/pexels-photo-814133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    supportedModes: ['ai', 'offline', 'multiplayer'],
    minPlayers: 2,
    maxPlayers: 2,
    categories: ['strategy', 'board'],
  },
  {
    id: '5',
    type: 'uno',
    title: 'Color Cards',
    description: 'Match colors and numbers, and be the first to get rid of all your cards!',
    imageUrl: 'https://images.pexels.com/photos/6686155/pexels-photo-6686155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    supportedModes: ['ai', 'offline', 'multiplayer'],
    minPlayers: 2,
    maxPlayers: 8,
    categories: ['card', 'casual'],
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'First Victory',
    description: 'Win your first game',
    icon: 'trophy',
  },
  {
    id: 'a2',
    title: 'Social Butterfly',
    description: 'Add 5 friends to your network',
    icon: 'users',
  },
  {
    id: 'a3',
    title: 'Game Master',
    description: 'Win 10 games across any category',
    icon: 'award',
  },
  {
    id: 'a4',
    title: 'Quiz Whiz',
    description: 'Get a perfect score in a trivia game',
    icon: 'brain',
  },
  {
    id: 'a5',
    title: 'Dedicated Player',
    description: 'Play games for a total of 10 hours',
    icon: 'clock',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'GameMaster',
    email: 'gamemaster@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    level: 10,
    experience: 2500,
    achievements: [
      { ...mockAchievements[0], unlockedAt: new Date('2023-01-15') },
      { ...mockAchievements[2], unlockedAt: new Date('2023-02-20') },
    ],
    stats: {
      gamesPlayed: 45,
      gamesWon: 28,
      totalScore: 15240,
      gameStats: {
        ticTacToe: { played: 15, won: 10, highScore: 0, timePlayed: 3600 },
        memory: { played: 8, won: 5, highScore: 2000, timePlayed: 2400 },
        quiz: { played: 12, won: 8, highScore: 8500, timePlayed: 3200 },
        chess: { played: 5, won: 2, highScore: 0, timePlayed: 4500 },
        uno: { played: 5, won: 3, highScore: 1200, timePlayed: 3000 },
      },
    },
    friends: ['u2', 'u3'],
    createdAt: new Date('2022-12-01'),
  },
  {
    id: 'u2',
    username: 'StrategyPro',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    level: 8,
    experience: 1800,
    achievements: [
      { ...mockAchievements[0], unlockedAt: new Date('2023-01-10') },
    ],
    stats: {
      gamesPlayed: 30,
      gamesWon: 18,
      totalScore: 9800,
      gameStats: {
        ticTacToe: { played: 5, won: 3, highScore: 0, timePlayed: 1200 },
        memory: { played: 3, won: 1, highScore: 1500, timePlayed: 900 },
        quiz: { played: 7, won: 4, highScore: 6200, timePlayed: 2100 },
        chess: { played: 12, won: 8, highScore: 0, timePlayed: 7200 },
        uno: { played: 3, won: 2, highScore: 800, timePlayed: 1800 },
      },
    },
    friends: ['u1'],
    createdAt: new Date('2023-01-05'),
  },
  {
    id: 'u3',
    username: 'TriviaQueen',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    level: 7,
    experience: 1500,
    achievements: [
      { ...mockAchievements[0], unlockedAt: new Date('2023-02-05') },
      { ...mockAchievements[3], unlockedAt: new Date('2023-03-12') },
    ],
    stats: {
      gamesPlayed: 25,
      gamesWon: 15,
      totalScore: 12800,
      gameStats: {
        ticTacToe: { played: 2, won: 1, highScore: 0, timePlayed: 600 },
        memory: { played: 5, won: 3, highScore: 1800, timePlayed: 1500 },
        quiz: { played: 15, won: 10, highScore: 9500, timePlayed: 4500 },
        chess: { played: 1, won: 0, highScore: 0, timePlayed: 600 },
        uno: { played: 2, won: 1, highScore: 750, timePlayed: 1200 },
      },
    },
    friends: ['u1'],
    createdAt: new Date('2023-01-20'),
  },
];

export const getGamesByType = (type: GameType): Game[] => {
  return mockGames.filter(game => game.type === type);
};

export const getFeaturedGames = (): Game[] => {
  return mockGames.filter(game => game.featured);
};

export const getGamesByCategory = (category: string): Game[] => {
  return mockGames.filter(game => game.categories.includes(category));
};

export const getCurrentUser = (): User => {
  // In a real app, this would get the currently authenticated user
  return mockUsers[0];
};