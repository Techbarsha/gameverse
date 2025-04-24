import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import GameCard from '../components/common/GameCard';
import { useGame } from '../context/GameContext';

const Games: React.FC = () => {
  const { games } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  
  const allCategories = Array.from(
    new Set(games.flatMap(game => game.categories))
  );
  
  const allModes = ['ai', 'offline', 'multiplayer'];
  
  const filteredGames = games.filter(game => {
    // Search term filter
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Categories filter
    const matchesCategories = selectedCategories.length === 0 || 
                             game.categories.some(category => selectedCategories.includes(category));
    
    // Modes filter
    const matchesModes = selectedModes.length === 0 || 
                        game.supportedModes.some(mode => selectedModes.includes(mode));
    
    return matchesSearch && matchesCategories && matchesModes;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleMode = (mode: string) => {
    setSelectedModes(prev => 
      prev.includes(mode)
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedModes([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Game Library</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-3/4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <button
            onClick={clearFilters}
            disabled={!searchTerm && selectedCategories.length === 0 && selectedModes.length === 0}
            className={`w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white flex items-center justify-center ${
              !searchTerm && selectedCategories.length === 0 && selectedModes.length === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-700'
            }`}
          >
            <Filter className="h-5 w-5 mr-2" />
            {searchTerm || selectedCategories.length > 0 || selectedModes.length > 0
              ? 'Clear Filters'
              : 'Filters'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {allCategories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="mr-3 h-4 w-4 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-300 cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Game Modes</h3>
              <div className="space-y-2">
                {allModes.map(mode => (
                  <div key={mode} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mode-${mode}`}
                      checked={selectedModes.includes(mode)}
                      onChange={() => toggleMode(mode)}
                      className="mr-3 h-4 w-4 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <label htmlFor={`mode-${mode}`} className="text-gray-300 capitalize cursor-pointer">
                      {mode}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No games found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;