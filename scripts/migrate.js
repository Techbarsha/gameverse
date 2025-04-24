import { initializeDatabase } from '../src/lib/db.js';

async function migrate() {
  try {
    console.log('Starting database migration...');
    await initializeDatabase();
    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Database migration failed:', error);
    process.exit(1);
  }
}

migrate();