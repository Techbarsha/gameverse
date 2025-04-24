import React from 'react';
import { Achievement } from '../../types';
import { Award, Lock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  
  return (
    <div className={`card p-4 ${isUnlocked ? 'border-l-4 border-success' : 'border-l-4 border-gray-700 opacity-70'}`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-full ${isUnlocked ? 'bg-success bg-opacity-20' : 'bg-gray-700'}`}>
          {isUnlocked ? (
            <Award className="h-6 w-6 text-success" />
          ) : (
            <Lock className="h-6 w-6 text-gray-500" />
          )}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{achievement.title}</h3>
            {isUnlocked && (
              <span className="text-xs text-success">
                Unlocked: {achievement.unlockedAt?.toLocaleDateString()}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
          
          {!isUnlocked && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-gray-400 text-xs mt-1">Progress: 30%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;