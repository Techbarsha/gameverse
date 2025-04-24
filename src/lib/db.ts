import { createClient } from '@libsql/client';

const db = createClient({
  url: 'file:gameverse.db',
});

export async function initializeDatabase() {
  // Create users table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      avatar_url TEXT,
      level INTEGER DEFAULT 1,
      experience INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create games table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      min_players INTEGER DEFAULT 1,
      max_players INTEGER DEFAULT 4,
      supported_modes TEXT NOT NULL,
      categories TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create game_stats table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS game_stats (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      game_id TEXT NOT NULL,
      games_played INTEGER DEFAULT 0,
      games_won INTEGER DEFAULT 0,
      high_score INTEGER DEFAULT 0,
      time_played INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (game_id) REFERENCES games(id)
    )
  `);

  // Create achievements table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create user_achievements table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, achievement_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (achievement_id) REFERENCES achievements(id)
    )
  `);

  // Create friends table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS friends (
      user_id TEXT NOT NULL,
      friend_id TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, friend_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (friend_id) REFERENCES users(id)
    )
  `);

  // Create game_sessions table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS game_sessions (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      mode TEXT NOT NULL,
      difficulty TEXT,
      status TEXT DEFAULT 'playing',
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ended_at DATETIME,
      winner_id TEXT,
      FOREIGN KEY (game_id) REFERENCES games(id),
      FOREIGN KEY (winner_id) REFERENCES users(id)
    )
  `);

  // Create session_players table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS session_players (
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      moves INTEGER DEFAULT 0,
      time_played INTEGER DEFAULT 0,
      PRIMARY KEY (session_id, user_id),
      FOREIGN KEY (session_id) REFERENCES game_sessions(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
}

export async function getUserById(id: string) {
  return await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [id]
  });
}

export async function createUser(user: {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
}) {
  return await db.execute({
    sql: `
      INSERT INTO users (id, username, email, password_hash, avatar_url)
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [user.id, user.username, user.email, user.passwordHash, user.avatarUrl]
  });
}

export async function updateGameStats(stats: {
  userId: string;
  gameId: string;
  gamesPlayed: number;
  gamesWon: number;
  highScore: number;
  timePlayed: number;
}) {
  return await db.execute({
    sql: `
      INSERT INTO game_stats (user_id, game_id, games_played, games_won, high_score, time_played)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, game_id) DO UPDATE SET
        games_played = games_played + excluded.games_played,
        games_won = games_won + excluded.games_won,
        high_score = MAX(high_score, excluded.high_score),
        time_played = time_played + excluded.time_played,
        updated_at = CURRENT_TIMESTAMP
    `,
    args: [
      stats.userId,
      stats.gameId,
      stats.gamesPlayed,
      stats.gamesWon,
      stats.highScore,
      stats.timePlayed
    ]
  });
}

export async function getLeaderboard(gameId: string, timeframe: 'daily' | 'weekly' | 'monthly' | 'allTime') {
  let dateFilter = '';
  switch (timeframe) {
    case 'daily':
      dateFilter = 'AND DATE(gs.started_at) = DATE("now")';
      break;
    case 'weekly':
      dateFilter = 'AND DATE(gs.started_at) >= DATE("now", "-7 days")';
      break;
    case 'monthly':
      dateFilter = 'AND DATE(gs.started_at) >= DATE("now", "-30 days")';
      break;
    default:
      dateFilter = '';
  }

  return await db.execute({
    sql: `
      SELECT 
        u.id,
        u.username,
        u.avatar_url,
        MAX(sp.score) as high_score,
        COUNT(DISTINCT gs.id) as games_played,
        SUM(CASE WHEN gs.winner_id = u.id THEN 1 ELSE 0 END) as games_won
      FROM users u
      JOIN session_players sp ON sp.user_id = u.id
      JOIN game_sessions gs ON gs.id = sp.session_id
      WHERE gs.game_id = ? ${dateFilter}
      GROUP BY u.id
      ORDER BY high_score DESC
      LIMIT 100
    `,
    args: [gameId]
  });
}

export default db;