const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// @TODO when not development add instance variable to new Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  // instance: process.env.DB_INSTANCE_NAME,
});

module.exports = {
  pool,
};
