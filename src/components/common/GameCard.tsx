import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Clock } from 'lucide-react';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/games/${game.id}`} className="game-card group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        {game.featured && (
          <div className="absolute top-2 right-2 bg-accent px-2 py-1 rounded text-xs font-bold">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{game.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{game.description}</p>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{game.minPlayers}-{game.maxPlayers}</span>
          </div>
          
          <div className="flex space-x-2">
            {game.supportedModes.includes('ai') && (
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">AI</span>
            )}
            {game.supportedModes.includes('offline') && (
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">Offline</span>
            )}
            {game.supportedModes.includes('multiplayer') && (
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">Multiplayer</span>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <Award className="h-4 w-4 mr-1 text-secondary" />
            <span>Top Score: 2,450</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-4 w-4 mr-1 text-primary" />
            <span>~15 min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;