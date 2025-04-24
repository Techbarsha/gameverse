import React from 'react';
import { User } from '../../types';
import { Trophy, Star, Gamepad2 } from 'lucide-react';

interface UserCardProps {
  user: User;
  isCurrentUser?: boolean;
  isFriend?: boolean;
  onAddFriend?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isCurrentUser = false,
  isFriend = false,
  onAddFriend
}) => {
  return (
    <div className="card p-4">
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={user.avatarUrl || 'https://i.pravatar.cc/150?img=1'} 
            alt={user.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary" 
          />
          <div className="absolute -bottom-1 -right-1 bg-success text-xs text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {user.level}
          </div>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{user.username}</h3>
            {!isCurrentUser && (
              <button
                onClick={onAddFriend}
                className={`text-xs px-3 py-1 rounded-full ${
                  isFriend
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-primary text-white'
                }`}
              >
                {isFriend ? 'Friends' : 'Add Friend'}
              </button>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <Trophy className="h-4 w-4 mr-1 text-warning" />
            <span>{user.achievements.length} Achievements</span>
            
            <span className="mx-2">•</span>
            
            <Gamepad2 className="h-4 w-4 mr-1 text-secondary" />
            <span>{user.stats.gamesPlayed} Games</span>
            
            <span className="mx-2">•</span>
            
            <Star className="h-4 w-4 mr-1 text-accent" />
            <span>{user.stats.gamesWon} Wins</span>
          </div>
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Level Progress</span>
            <span className="text-primary">{user.experience}/3000 XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full" 
              style={{ width: `${(user.experience / 3000) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;