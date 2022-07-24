const process = require('process');
const { Pool, Client } = require('pg');

//Setup Database connection Pool
console.log(`Database_url: ${process.env.DATABASE_URL}`)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

//Note: pool.query is a shorthand to quickly query db; No need to manually release the client; this is handled for you.
//Note: do not use pool.query if you need to maintain transactional integrity
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
})

// Handle node graceful closure of all processes
process.on('SIGINT', () => {
  console.log('(Ctrl-C) Shutdown signal received.');
  pool.end();
  process.exit(1);
});

module.exports = pool;
