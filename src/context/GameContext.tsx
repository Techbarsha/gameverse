import React, { createContext, useContext, useState } from 'react';
import { Game, GameState, GameType, GameMode, Difficulty, GamePlayer } from '../types';
import { mockGames } from '../utils/mockData';

interface GameContextType {
  games: Game[];
  currentGame: Game | null;
  gameState: GameState | null;
  isLoading: boolean;
  selectGame: (gameId: string) => void;
  startGame: (gameId: string, mode: GameMode, difficulty?: Difficulty) => void;
  joinGame: (gameId: string, roomId: string) => void;
  leaveGame: () => void;
  makeMove: (move: any) => void;
}

const GameContext = createContext<GameContextType>({
  games: [],
  currentGame: null,
  gameState: null,
  isLoading: false,
  selectGame: () => {},
  startGame: () => {},
  joinGame: () => {},
  leaveGame: () => {},
  makeMove: () => {},
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games] = useState<Game[]>(mockGames);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId) || null;
    setCurrentGame(game);
    setGameState(null);
  };

  const createInitialGameState = (
    game: Game,
    mode: GameMode,
    difficulty?: Difficulty
  ): GameState => {
    const players: GamePlayer[] = [
      {
        id: 'player1',
        username: 'Player 1',
        score: 0,
        isReady: true,
        isActive: true,
      },
    ];

    if (mode === 'ai') {
      players.push({
        id: 'ai',
        username: 'AI Opponent',
        score: 0,
        isReady: true,
        isActive: true,
        isAI: true,
      });
    } else if (mode === 'offline') {
      players.push({
        id: 'player2',
        username: 'Player 2',
        score: 0,
        isReady: true,
        isActive: true,
      });
    }

    return {
      gameId: game.id,
      gameType: game.type,
      mode,
      difficulty,
      players,
      currentPlayerIndex: 0,
      status: 'playing',
      startedAt: new Date(),
      lastUpdatedAt: new Date(),
      board: game.type === 'ticTacToe' ? Array(9).fill(null) : undefined,
    };
  };

  const startGame = (gameId: string, mode: GameMode, difficulty?: Difficulty) => {
    setIsLoading(true);
    try {
      const game = games.find(g => g.id === gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      const initialState = createInitialGameState(game, mode, difficulty);
      setCurrentGame(game);
      setGameState(initialState);
    } catch (error) {
      console.error('Failed to start game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinGame = (gameId: string, roomId: string) => {
    setIsLoading(true);
    try {
      const game = games.find(g => g.id === gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      const initialState = createInitialGameState(game, 'multiplayer');
      setCurrentGame(game);
      setGameState(initialState);
    } catch (error) {
      console.error('Failed to join game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveGame = () => {
    setCurrentGame(null);
    setGameState(null);
  };

  const makeMove = (move: any) => {
    if (!gameState || !currentGame) return;

    const newState = { ...gameState };
    
    // Update game-specific state
    switch (currentGame.type) {
      case 'ticTacToe':
        if (typeof move === 'number') {
          const board = [...(newState.board || [])];
          board[move] = newState.currentPlayerIndex === 0 ? 'X' : 'O';
          newState.board = board;
          newState.currentPlayerIndex = newState.currentPlayerIndex === 0 ? 1 : 0;
        }
        break;
        
      case 'memory':
        // Memory game handles its own state
        break;
        
      default:
        break;
    }

    newState.lastUpdatedAt = new Date();
    setGameState(newState);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        currentGame,
        gameState,
        isLoading,
        selectGame,
        startGame,
        joinGame,
        leaveGame,
        makeMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};