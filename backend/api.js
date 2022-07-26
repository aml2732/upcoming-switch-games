var pool = require('./utility/database.js');

async function gamesList(req, res){
  let games = await pool.query('SELECT * FROM games');
  res.send(games.rows);
}

function escapeSingleQuote(str){
  return str.replace(/'/g, "\'")
}

async function gamesNew(req, res){
  console.log('req.body', req.body);
  if(!req.body.name || !req.body.description ||!req.body.link){
    return res.status(500).send({status:'failure'})
  }
  let insertStatement = `INSERT INTO games (NAME, DESCRIPTION, LINKTO, RELEASEDATE) VALUES ($1, $2, $3, $4) RETURNING id`
  console.log('string to insert', insertStatement)
  let newGame = await pool.query(insertStatement, [req.body.name, req.body.description, req.body.link, req.body.releasedate])
  console.log('newGame: ', newGame)

  if(req.files){
    console.log('has a file')
    console.log('-- file ', req.files)
    let idToReference = newGame.rows[0].id;
    console.log('-- idToReference', idToReference)
    let filesResponse = await pool.query(`INSERT INTO thumbnails (GAMEID, IMG) VALUES (${idToReference}, $1)`, [req.files.file]);
    console.log('what was filesResponse? ', filesResponse)
  }
  res.send({status: "success"});
}


async function gamesEdit(req, res){
  console.log('req.body', req.body);
  res.send({status: "success"});
}

async function gamesNewImage(req, res){
  console.log("reached games New Image");
  if(!req.body.id || !req.files){
    return res.status(500).send({status:'failure'})
  }
  let response = await pool.query(`INSERT INTO thumbnails (GAMEID, IMG) VALUES (${req.body.id},$1)`, [req.files.file]);

  res.send({status: "success"});
}

async function gamesImageList(req, res){
  console.log('attempting to fetch gamesImageList...')
  let response = await pool.query('SELECT * FROM thumbnails');
  res.send(response.rows)
}

async function gamesGetSingleImage(req, res){
  console.log('fetch a single image and return it as... well,...an image...')
  if(!req.params.id){return res.status(500).send({status:"failure"})}
  let id = parseInt(req.params.id);

  let response = await pool.query(`SELECT img FROM thumbnails WHERE GAMEID=${id}`)
  if(response.rows && response.rows.length>0){
    let buff = Buffer.from(response.rows[0].img);
    let stringifiedRaw = buff.toString();
    let jsonified = JSON.parse(stringifiedRaw);
    let mimeType = jsonified.mimetype;
    res.set('Content-Type', mimeType);
    let img = Buffer.from(jsonified.data, 'base64');
    return res.send(img);
  }else{
    res.status(500).send({status: 'failure'})
  }
}

async function gamesDelete(req, res){
  console.log('got to games delete...')
  if(!req.params.id){
    return res.status(500).send({status:"failure"})
  }
  await pool.query(`DELETE FROM thumbnails WHERE GAMEID=${req.params.id}`)
  await pool.query(`DELETE FROM games WHERE id=${req.params.id}`);
  res.send({status: "success"})
}

module.exports =  {gamesList, gamesNew, gamesEdit, gamesNewImage, gamesImageList, gamesGetSingleImage, gamesDelete}
