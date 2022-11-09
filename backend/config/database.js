import dotenv from 'dotenv';

dotenv.config();

const dbconfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

export default dbconfig;
