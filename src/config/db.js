const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Number of connections to keep in the pool. Adjust based on your needs.
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'defaultUser',
  password: process.env.DB_PASSWORD || 'defaultPassword',
  database: process.env.DB_NAME || 'defaultDB',
});

module.exports = pool;