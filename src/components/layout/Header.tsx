import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, User, Trophy, LogOut, Users, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GameVerse
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/games" className="text-gray-300 hover:text-white transition-colors">
              Games
            </Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link to="/friends" className="text-gray-300 hover:text-white transition-colors">
              Friends
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=1'} 
                        alt={user?.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="hidden md:inline text-white">{user?.username}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                    <div className="p-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link to="/achievements" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        Achievements
                      </Link>
                      <Link to="/friends" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Friends
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;