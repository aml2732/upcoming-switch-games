var pool = require('./utility/database.js');

async function gamesList(req, res){
  let games = await pool.query('SELECT * FROM games');
  res.send(games.rows);
}

async function gamesNew(req, res){
  console.log('req.body', req.body);
  if(!req.body.name || !req.body.description ||!req.body.link){
    return res.status(500).send({status:'failure'})
  }
  if(req.body.image){
    console.log('typeof file', typeof req.body.image)
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

  let response = await pool.query(`SELECT img FROM thumbnails WHERE id=${id}`)
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

module.exports =  {gamesList, gamesNew, gamesEdit, gamesNewImage, gamesImageList, gamesGetSingleImage}
