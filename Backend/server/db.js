
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moody',
  password: "new_password",
  port: 5432, 
});

module.exports = pool;
