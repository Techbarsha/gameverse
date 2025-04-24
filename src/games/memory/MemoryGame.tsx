import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Timer, Trophy } from 'lucide-react';
import { GameState } from '../../types';
import { useGame } from '../../context/GameContext';

interface MemoryGameProps {
  gameState: GameState;
  onExit: () => void;
}

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_SYMBOLS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭'];

const MemoryGame: React.FC<MemoryGameProps> = ({ gameState, onExit }) => {
  const { makeMove } = useGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !isGameOver) {
      timer = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  const initializeGame = () => {
    const shuffledCards = [...CARD_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        value: symbol,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameTime(0);
    setGameStarted(false);
    setIsGameOver(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const card = cards[cardId];
    
    // Prevent clicking if:
    // - Card is already flipped or matched
    // - Two cards are already flipped
    // - Clicking the same card
    if (
      card.isFlipped ||
      card.isMatched ||
      flippedCards.length === 2 ||
      flippedCards.includes(cardId)
    ) {
      return;
    }

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[cardId].isFlipped = true;
    setCards(updatedCards);

    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].value === cards[secondCard].value) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstCard].isMatched = true;
          updatedCards[secondCard].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            if (newMatchedPairs === CARD_SYMBOLS.length / 2) {
              setIsGameOver(true);
              makeMove({ moves, time: gameTime });
            }
            return newMatchedPairs;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstCard].isFlipped = false;
          updatedCards[secondCard].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Exit Game
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Timer className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">{formatTime(gameTime)}</span>
            </div>
            
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">{moves} Moves</span>
            </div>
            
            <button
              onClick={initializeGame}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square rounded-xl text-4xl
                transition-all duration-300 transform
                ${card.isFlipped || card.isMatched
                  ? 'bg-primary bg-opacity-20 rotate-0'
                  : 'bg-gray-700 hover:bg-gray-600 rotate-y-180'
                }
                ${card.isMatched ? 'opacity-50 cursor-default' : 'cursor-pointer'}
              `}
              disabled={card.isMatched}
            >
              {(card.isFlipped || card.isMatched) && card.value}
            </button>
          ))}
        </div>

        {isGameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-8 text-center max-w-md mx-4">
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl text-gray-300 mb-6">
                You completed the game in {moves} moves and {formatTime(gameTime)}!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={initializeGame}
                  className="btn btn-primary flex items-center"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Play Again
                </button>
                <button
                  onClick={onExit}
                  className="btn bg-gray-700 text-white hover:bg-gray-600"
                >
                  Exit Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;