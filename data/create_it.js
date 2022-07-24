const process = require('process');
const { Pool, Client } = require('pg');

const supportLo = `CREATE EXTENSION LO;`

const creategamesSchema = `CREATE TABLE IF NOT EXISTS games(
  ID serial not null primary key,
  NAME TEXT NOT NULL,
  DESCRIPTION TEXT NOT NULL,
  LINKTO TEXT NOT NULL,
  RELEASEDATE DATE
);`;

//removed: IMG LO,

const initialData = [
  `INSERT INTO games (NAME, DESCRIPTION, LINKTO, RELEASEDATE)
  VALUES ('Live A Live', 'Live A Live is split into seven chapters, covering prehistoric, ancient Chinese, feudal Japanese, Wild West, present day, near future, and distant future eras. In each scenario, the protagonist confronts a powerful enemy whose name is or incorporates the word "Odio"', 'https://www.nintendo.com/store/products/live-a-live-switch/', '2022-07-07');`,
  `INSERT INTO games (NAME, DESCRIPTION, LINKTO, RELEASEDATE)
  VALUES ('Endling - Extinction is Forever', 'Will a mother fox, the last of its kind, be able to save its 3 cubs?', 'https://www.nintendo.com/store/products/endling-extinction-is-forever-switch/', '2022-07-19');`,
  `INSERT INTO games (NAME, DESCRIPTION, LINKTO, RELEASEDATE)
  VALUES ('Bayonetta 3', 'It is a hack and slash in a world where angels known as Lumen Sages collide in conflict with Umbra Witches', 'https://www.nintendo.com/store/products/bayonetta-3-switch/', '2022-10-28');`,
  `INSERT INTO games (NAME, DESCRIPTION, LINKTO, RELEASEDATE)
  VALUES ('Hogwarts Legacy', 'An immersive, open-world action RPG set in the world first introduced in the Harry Potter books', 'https://www.hogwartslegacy.com/en-us/faq', NULL);`
];

const createGameThumbnailsSchema= `CREATE TABLE IF NOT EXISTS thumbnails(
  ID serial not null primary key,
  GAMEID INT NOT NULL,
  IMG BYTEA NOT NULL,
  FOREIGN KEY(GAMEID) REFERENCES games(id)
);`

//I don't have superuser permissions for this :(
/*
const initialThumbnail = `INSERT INTO thumbnails (GAMEID, IMG)
VALUES(2, pg_read_file('./royaltyFreeDefaultImage.jpg')::bytea);
`
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {

  console.log('begin checks...')
  //Is Database Up?
  let { rows } = await pool.query('SELECT NOW()');
  if(rows && rows.length){ console.log(`A successful database connection has been established...`); }

  //await pool.query(supportLo) //Only run once, then script vomits if not commented out and run again.

  //Create table if it doesn't exist
  let res = await pool.query(creategamesSchema);
  console.log("Created table:games if it didn't already exist...")


  //Populate table
  for(item of initialData){
    await pool.query(item);
  }

  //Fetch to confirm data entry successful
  res = await pool.query('SELECT * FROM games');
  console.log(res.rows)
  if(res.rows.length>0){console.log('Success...')}

  await pool.query(createGameThumbnailsSchema)
  console.log("Created thumbnails table if it didn't already exist...")

  /*await pool.query(initialThumbnail);
  console.log('inserted one file into thumbnail table...')
  */


})().then(res => {
  console.log('shutting down connections...')
  pool.end();
  process.exit(1);
})
.catch(err =>{
  console.log('An error occurred...')
  console.log(err);
  return setImmediate(() => {
    throw err
  })

  console.log('shutting down connections...')
  pool.end();
  process.exit(1);
})
