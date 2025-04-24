import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, Clock, Trophy, Star, 
  ArrowLeft, Play, User, Brain, 
  Award 
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { mockGames, mockUsers } from '../utils/mockData';
import TicTacToeGame from '../games/tic-tac-toe/TicTacToeGame';
import MemoryGame from '../games/memory/MemoryGame';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectGame, currentGame, gameState, startGame, leaveGame } = useGame();
  const { user, isAuthenticated } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'ai' | 'offline' | 'multiplayer'>('ai');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  useEffect(() => {
    if (id) {
      selectGame(id);
    }
  }, [id, selectGame]);

  const handleStartGame = () => {
    if (currentGame) {
      startGame(currentGame.id, selectedMode, selectedMode === 'ai' ? difficulty : undefined);
    }
  };

  const handleExitGame = () => {
    leaveGame();
  };

  if (!currentGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading game details...</p>
        </div>
      </div>
    );
  }

  // Render the active game if there's a game state
  if (gameState) {
    if (currentGame.type === 'ticTacToe') {
      return (
        <div className="container mx-auto px-4 py-8">
          <TicTacToeGame gameState={gameState} onExit={handleExitGame} />
        </div>
      );
    }
    
    if (currentGame.type === 'memory') {
      return (
        <div className="container mx-auto px-4 py-8">
          <MemoryGame gameState={gameState} onExit={handleExitGame} />
        </div>
      );
    }
    
    // For other game types, show a placeholder
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>{currentGame.title} game is in progress!</p>
          <button
            onClick={handleExitGame}
            className="mt-4 btn btn-primary"
          >
            Exit Game
          </button>
        </div>
      </div>
    );
  }

  // Display the top players for this game
  const topPlayers = mockUsers.sort((a, b) => {
    const aScore = a.stats.gameStats[currentGame.type]?.highScore || 0;
    const bScore = b.stats.gameStats[currentGame.type]?.highScore || 0;
    return bScore - aScore;
  }).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/games" className="inline-flex items-center mb-6 text-gray-300 hover:text-white">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Games
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={currentGame.imageUrl}
                alt={currentGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-bold">{currentGame.title}</h1>
                <div className="flex mt-2 space-x-3">
                  {currentGame.categories.map(category => (
                    <span key={category} className="px-3 py-1 bg-gray-700 bg-opacity-70 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{currentGame.minPlayers}-{currentGame.maxPlayers} Players</span>
                </div>
                
                <div className="flex items-center mb-2 sm:mb-0">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span>~15 min</span>
                </div>
                
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-gray-400 mr-2" />
                  <span>High Score: 2,450</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-300">{currentGame.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">How to Play</h2>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300">
                    {currentGame.type === 'ticTacToe' && (
                      <>
                        The game is played on a 3x3 grid. Players take turns placing their mark (X or O) in empty cells.
                        The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins.
                        If all cells are filled and no player has three in a row, the game is a draw.
                      </>
                    )}
                    {currentGame.type === 'memory' && (
                      <>
                        Find matching pairs of cards by flipping them over. Remember the positions of the cards you've seen.
                        The game is over when all pairs have been found. Try to complete the game in as few moves as possible.
                      </>
                    )}
                    {currentGame.type === 'quiz' && (
                      <>
                        Answer questions from various categories. Each correct answer earns you points.
                        Try to answer as many questions as you can within the time limit to achieve a high score.
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Game Modes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {currentGame.supportedModes.includes('ai') && (
                    <button
                      className={`p-4 rounded-lg border-2 flex items-center ${
                        selectedMode === 'ai'
                          ? 'border-primary bg-primary bg-opacity-10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedMode('ai')}
                    >
                      <div className="p-3 rounded-full bg-primary bg-opacity-20 mr-3">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">AI Mode</h3>
                        <p className="text-sm text-gray-400">Play against AI</p>
                      </div>
                    </button>
                  )}
                  
                  {currentGame.supportedModes.includes('offline') && (
                    <button
                      className={`p-4 rounded-lg border-2 flex items-center ${
                        selectedMode === 'offline'
                          ? 'border-secondary bg-secondary bg-opacity-10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedMode('offline')}
                    >
                      <div className="p-3 rounded-full bg-secondary bg-opacity-20 mr-3">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Offline Mode</h3>
                        <p className="text-sm text-gray-400">Play locally</p>
                      </div>
                    </button>
                  )}
                  
                  {currentGame.supportedModes.includes('multiplayer') && (
                    <button
                      className={`p-4 rounded-lg border-2 flex items-center ${
                        selectedMode === 'multiplayer'
                          ? 'border-accent bg-accent bg-opacity-10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedMode('multiplayer')}
                    >
                      <div className="p-3 rounded-full bg-accent bg-opacity-20 mr-3">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Multiplayer</h3>
                        <p className="text-sm text-gray-400">Play online</p>
                      </div>
                    </button>
                  )}
                </div>
                
                {selectedMode === 'ai' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Select Difficulty</h3>
                    <div className="flex space-x-4">
                      <button
                        className={`px-4 py-2 rounded ${
                          difficulty === 'easy'
                            ? 'bg-success text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setDifficulty('easy')}
                      >
                        Easy
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          difficulty === 'medium'
                            ? 'bg-warning text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setDifficulty('medium')}
                      >
                        Medium
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          difficulty === 'hard'
                            ? 'bg-error text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setDifficulty('hard')}
                      >
                        Hard
                      </button>
                    </div>
                  </div>
                )}
                
                {selectedMode === 'multiplayer' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Multiplayer Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="btn bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center">
                        <Users className="h-5 w-5 mr-2" />
                        Join Random Game
                      </button>
                      <button className="btn bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center">
                        <Users className="h-5 w-5 mr-2" />
                        Create Private Game
                      </button>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleStartGame}
                  className="btn btn-primary w-full py-3 text-lg flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-warning" />
              Top Players
            </h2>
            
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center">
                  <div className="flex-shrink-0 w-10 text-center">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      index === 2 ? 'text-amber-700' : ''
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-shrink-0 ml-2">
                    <img
                      src={player.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
                      alt={player.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="font-medium">{player.username}</div>
                    <div className="text-sm text-gray-400">
                      Level {player.level}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-primary">
                      {player.stats.gameStats[currentGame.type]?.highScore.toLocaleString() || 0}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Star className="h-3 w-3 mr-1 text-warning" />
                      <span>
                        {player.stats.gameStats[currentGame.type]?.won || 0} wins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              to="/leaderboard"
              className="mt-4 text-primary text-sm hover:underline block text-center"
            >
              View Full Leaderboard
            </Link>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-secondary" />
              Game Achievements
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <h3 className="font-medium">First Victory</h3>
                <p className="text-sm text-gray-400">Win your first game</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-success h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h3 className="font-medium">Perfect Game</h3>
                <p className="text-sm text-gray-400">Win without letting your opponent score</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h3 className="font-medium">Dedicated Player</h3>
                <p className="text-sm text-gray-400">Play 50 games</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h3 className="font-medium">Unbeatable</h3>
                <p className="text-sm text-gray-400">Win 10 games in a row</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            
            <Link
              to="/achievements"
              className="mt-4 text-primary text-sm hover:underline block text-center"
            >
              View All Achievements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;