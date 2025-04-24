import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Users, Award, Trophy, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/common/GameCard';
import UserCard from '../components/common/UserCard';
import { mockGames, mockUsers, getFeaturedGames } from '../utils/mockData';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const featuredGames = getFeaturedGames();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameVerse:
              </span>{" "}
              Your Ultimate Gaming Destination
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dive into a world of multiplayer games, challenges, and competitions.
              Play with friends or challenge AI opponents in a variety of exciting games.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/games"
                className="btn btn-primary flex items-center"
              >
                <Gamepad2 className="h-5 w-5 mr-2" />
                Browse Games
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="btn bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500"
                >
                  Create Account
                </Link>
              )}
            </div>
            
            <div className="flex mt-12 space-x-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-gray-400">Games</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-3">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-gray-400">Players</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-3">
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-gray-400">Games Played</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Welcome Section (if authenticated) */}
      {isAuthenticated && user && (
        <section className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <UserCard user={user} isCurrentUser={true} />
              </div>
              
              <div className="md:col-span-2">
                <div className="card p-6 h-full">
                  <h2 className="text-xl font-bold mb-4">Your Statistics</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Games Played</div>
                      <div className="text-2xl font-bold">{user.stats.gamesPlayed}</div>
                      <div className="mt-2 text-xs text-success">↑ 12% from last week</div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Win Rate</div>
                      <div className="text-2xl font-bold">
                        {Math.round((user.stats.gamesWon / user.stats.gamesPlayed) * 100) || 0}%
                      </div>
                      <div className="mt-2 text-xs text-success">↑ 5% from last week</div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Total Score</div>
                      <div className="text-2xl font-bold">{user.stats.totalScore.toLocaleString()}</div>
                      <div className="mt-2 text-xs text-success">↑ 2,540 points</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mt-6 mb-3">Recent Achievements</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.achievements.map(achievement => (
                      <div key={achievement.id} className="flex items-center bg-gray-700 rounded-lg p-3">
                        <div className="p-2 rounded-full bg-success bg-opacity-20">
                          <Award className="h-5 w-5 text-success" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-xs text-gray-400">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Games Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Games</h2>
            <Link
              to="/games"
              className="text-primary flex items-center hover:underline"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Game Categories Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Game Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {['Strategy', 'Puzzle', 'Card', 'Board', 'Trivia', 'Casual', 'Action', 'Education'].map(category => (
              <Link
                key={category}
                to={`/games?category=${category.toLowerCase()}`}
                className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-3 w-12 h-12 mx-auto rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">{category}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {Math.floor(Math.random() * 20) + 5} Games
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Top Players</h2>
            <Link
              to="/leaderboard"
              className="text-primary flex items-center hover:underline"
            >
              View Leaderboard
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                isFriend={user.id === 'u2'}
                onAddFriend={() => console.log('Add friend:', user.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Fun?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create an account today and start playing with friends, competing in tournaments,
            and climbing the leaderboards!
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/games"
                className="btn bg-white text-primary hover:bg-gray-100"
              >
                Play Now
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn bg-white text-primary hover:bg-gray-100"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="btn bg-gray-800 bg-opacity-30 text-white hover:bg-opacity-40"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;