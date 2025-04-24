import React from 'react';
import { User } from '../../types';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardTableProps {
  users: User[];
  gameType?: string;
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'allTime';
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  users,
  gameType,
  timeFrame = 'allTime',
}) => {
  // Sort users by total score or game-specific score
  const sortedUsers = [...users].sort((a, b) => {
    if (gameType) {
      const aScore = a.stats.gameStats[gameType as keyof typeof a.stats.gameStats]?.highScore || 0;
      const bScore = b.stats.gameStats[gameType as keyof typeof b.stats.gameStats]?.highScore || 0;
      return bScore - aScore;
    }
    return b.stats.totalScore - a.stats.totalScore;
  });

  return (
    <div className="card overflow-hidden">
      <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 className="font-bold text-lg flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-warning" />
          {gameType ? `${gameType} Leaderboard` : 'Global Leaderboard'}
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <button
            className={`px-3 py-1 rounded-full ${
              timeFrame === 'daily' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Daily
          </button>
          <button
            className={`px-3 py-1 rounded-full ${
              timeFrame === 'weekly' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded-full ${
              timeFrame === 'monthly' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded-full ${
              timeFrame === 'allTime' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            All Time
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Games
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Win Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => {
              const gameStats = gameType
                ? user.stats.gameStats[gameType as keyof typeof user.stats.gameStats]
                : { played: user.stats.gamesPlayed, won: user.stats.gamesWon, highScore: user.stats.totalScore };
              
              const winRate = gameStats?.played > 0
                ? Math.round((gameStats.won / gameStats.played) * 100)
                : 0;
              
              return (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                  } hover:bg-gray-700`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index < 3 ? (
                      <div className={`
                        p-1 rounded-full inline-flex items-center justify-center w-8 h-8
                        ${index === 0 ? 'bg-yellow-500' : ''}
                        ${index === 1 ? 'bg-gray-400' : ''}
                        ${index === 2 ? 'bg-amber-700' : ''}
                      `}>
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <span className="text-gray-400 font-medium">{index + 1}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
                        alt={user.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-gray-400 text-xs">Level {user.level}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-primary">{gameStats?.highScore.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">{gameStats?.played}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-success h-1.5 rounded-full"
                          style={{ width: `${winRate}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-gray-300">{winRate}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;