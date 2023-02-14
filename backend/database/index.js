import postgres from 'pg';
import logger from '../config/winston.js';
import dbconfig from '../config/database.js';

const { Pool } = postgres;

// Creates a new Pool
const db = new Pool(dbconfig);

// Logs all queries made
async function query(text, params) {
  const start = Date.now();
  const res = await db.query(text, params);
  const duration = Date.now() - start;
  logger.log('sql', { text, duration, rows: res.rowCount });
  return res;
}

export default query;
