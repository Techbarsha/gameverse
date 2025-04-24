import React, { useEffect } from 'react';
import { X, Circle, RefreshCw, ArrowLeft } from 'lucide-react';
import { GameState } from '../../types';
import { useGame } from '../../context/GameContext';

interface TicTacToeGameProps {
  gameState: GameState;
  onExit: () => void;
}

const TicTacToeGame: React.FC<TicTacToeGameProps> = ({ gameState, onExit }) => {
  const { makeMove } = useGame();
  
  const currentPlayer = gameState.currentPlayerIndex === 0 ? 'X' : 'O';
  const board = gameState.board || Array(9).fill(null);
  
  const isPlayerTurn = currentPlayer === 'X' || gameState.mode === 'offline';
  
  // Check for winner
  const calculateWinner = (squares: Array<'X' | 'O' | null>): [string | null, number[]] => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]];
      }
    }
    return [null, []];
  };

  const [winner, winningLine] = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);
  const isGameOver = winner !== null || isDraw;

  // AI move
  useEffect(() => {
    if (gameState.mode === 'ai' && currentPlayer === 'O' && !isGameOver) {
      const timer = setTimeout(() => {
        const emptySquares = board
          .map((square, index) => square === null ? index : null)
          .filter((index): index is number => index !== null);
        
        if (emptySquares.length > 0) {
          const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          makeMove(randomSquare);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.mode, currentPlayer, isGameOver, board, makeMove]);

  const handleClick = (index: number) => {
    if (board[index] || !isPlayerTurn || isGameOver) {
      return;
    }
    
    makeMove(index);
  };

  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine.includes(index);
    
    return (
      <button
        className={`
          w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center
          ${isPlayerTurn && !board[index] && !isGameOver ? 'hover:bg-gray-600' : ''}
          ${isWinningSquare ? 'bg-success bg-opacity-20' : ''}
        `}
        onClick={() => handleClick(index)}
      >
        {board[index] === 'X' && <X className="h-10 w-10 text-primary" />}
        {board[index] === 'O' && <Circle className="h-10 w-10 text-secondary" />}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-md mb-8">
        <button
          onClick={onExit}
          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Exit Game
        </button>
        
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-gray-400">Mode:</span>
          <span className="font-medium">
            {gameState.mode.charAt(0).toUpperCase() + gameState.mode.slice(1)}
          </span>
          
          {gameState.mode === 'ai' && gameState.difficulty && (
            <>
              <span className="text-gray-400 mx-1">•</span>
              <span className="font-medium capitalize">{gameState.difficulty}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="relative">
        <div className="mb-6 flex justify-center items-center">
          <div className="flex items-center mr-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPlayer === 'X' ? 'bg-primary bg-opacity-20 ring-2 ring-primary' : 'bg-gray-800'}`}>
              <X className="h-6 w-6 text-primary" />
            </div>
            <span className="ml-2 font-medium">Player</span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPlayer === 'O' ? 'bg-secondary bg-opacity-20 ring-2 ring-secondary' : 'bg-gray-800'}`}>
              <Circle className="h-6 w-6 text-secondary" />
            </div>
            <span className="ml-2 font-medium">
              {gameState.mode === 'ai' ? 'AI' : 'Player 2'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 bg-gray-800 p-3 rounded-xl">
          {board.map((_, index) => renderSquare(index))}
        </div>
        
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-800 bg-opacity-95 rounded-xl p-6 shadow-lg text-center">
              {winner ? (
                <div>
                  <div className="flex justify-center mb-4">
                    {winner === 'X' ? (
                      <X className="h-16 w-16 text-primary" />
                    ) : (
                      <Circle className="h-16 w-16 text-secondary" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {winner === 'X' ? 'Player' : gameState.mode === 'ai' ? 'AI' : 'Player 2'} Wins!
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4">It's a Draw!</h2>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light flex items-center mx-auto"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToeGame;