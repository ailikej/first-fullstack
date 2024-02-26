const { Pool } = require('pg');
const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'first_fullstack_app',
  password: 'yourPassword',
  port: 5432,
});

module.exports = pool;
