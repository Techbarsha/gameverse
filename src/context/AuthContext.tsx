import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would check for an existing session
    const checkAuth = async () => {
      try {
        // Simulate an API call to check authentication
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, let's automatically log in as the first user
        setUser(mockUsers[0]);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, find a user with the matching email
      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      setUser(foundUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a new user
      const newUser: User = {
        id: `u${mockUsers.length + 1}`,
        username,
        email,
        level: 1,
        experience: 0,
        achievements: [],
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          gameStats: {
            ticTacToe: { played: 0, won: 0, highScore: 0, timePlayed: 0 },
            memory: { played: 0, won: 0, highScore: 0, timePlayed: 0 },
            quiz: { played: 0, won: 0, highScore: 0, timePlayed: 0 },
            chess: { played: 0, won: 0, highScore: 0, timePlayed: 0 },
            uno: { played: 0, won: 0, highScore: 0, timePlayed: 0 },
          },
        },
        friends: [],
        createdAt: new Date(),
      };
      
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};