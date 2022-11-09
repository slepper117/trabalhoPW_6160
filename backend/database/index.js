import postgres from 'pg';
import logger from '../config/winston.js';
import dbconfig from '../config/database.js';

const { Pool } = postgres;

// Cria uma nova Pool de Clientes
const db = new Pool(dbconfig);

// Loga todas as queries feitas
async function query(text, params) {
  const start = Date.now();
  const res = await db.query(text, params);
  const duration = Date.now() - start;
  logger.log('sql', { text, duration, rows: res.rowCount });
  return res;
}

export default query;
