import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create the pool using a connection string if provided
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

export default pool;
