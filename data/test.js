const process = require('process');
const { Pool, Client } = require('pg');

const createCategorySchema = `CREATE TABLE IF NOT EXISTS category(
  ID serial not null primary key,
  NAME TEXT NOT NULL,
  DESCRIPTION TEXT NOT NULL,
  IMG LO,
  LINKTO TEXT NOT NULL,
  RELEASEDATE DATE
);`;

const initialData = [
  `INSERT INTO category (NAME, DESCRIPTION, IMG, LINKTO, RELEASEDATE)
  VALUES ('Live A Live', 'Live A Live is split into seven chapters, covering prehistoric, ancient Chinese, feudal Japanese, Wild West, present day, near future, and distant future eras. In each scenario, the protagonist confronts a powerful enemy whose name is or incorporates the word "Odio"', NULL, 'https://www.nintendo.com/store/products/live-a-live-switch/', '2022-07-07');`,
  `INSERT INTO category (NAME, DESCRIPTION, IMG, LINKTO, RELEASEDATE)
  VALUES ('Endling - Extinction is Forever', 'Will a mother fox, the last of its kind, be able to save its 3 cubs?', NULL, 'https://www.nintendo.com/store/products/endling-extinction-is-forever-switch/', '2022-07-19');`,
  `INSERT INTO category (NAME, DESCRIPTION, IMG, LINKTO, RELEASEDATE)
  VALUES ('Bayonetta 3', 'It's a hack and slash in a world where angels known as Lumen Sages collide in conflict with Umbra Witches', NULL, 'https://www.nintendo.com/store/products/bayonetta-3-switch/', '2022-10-28');`,
  `INSERT INTO category (NAME, DESCRIPTION, IMG, LINKTO, RELEASEDATE)
  VALUES ('Hogwarts Legacy', 'An immersive, open-world action RPG set in the world first introduced in the Harry Potter books', NULL, 'https://www.hogwartslegacy.com/en-us/faq', NULL);`
];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {

  console.log('begin checks...')
  //Is Database Up?
  let { rows } = await pool.query('SELECT NOW()');
  if(rows && rows.length){ console.log(`A successful database connection has been established...`); }

  //Create table if it doesn't exist
  let res = await pool.query(createCategorySchema);
  console.log("Created table:category if it didn't already exist...")

  //Populate table
  for(item of initialData){
    await pool.query(item);
  }

  //Fetch to confirm data entry successful
  res = await pool.query('SELECT * FROM category');
  console.log(res.rows)
  if(res.rows.length>0){console.log('Success...')}


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
