var pool = require('./utility/database.js');

async function gamesList(req, res){
  let games = await pool.query('SELECT * FROM games');
  console.log('games', games);
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
  console.log('req.body.id', req.body.id);
  console.log('req.files', req.files)
  if(!req.body.id || !req.files){
    return res.status(500).send({status:'failure'})
  }
  console.log("req.files.file ", req.files.file)
  let response = await pool.query(`INSERT INTO thumbnails (GAMEID, IMG) VALUES (${req.body.id},$1)`, [req.files.file]);
  console.log("reseponse", response)

  res.send({status: "success"});
}

async function gamesImageList(req, res){
  console.log('attempting to fetch gamesImageList...')
  let response = await pool.query('SELECT * FROM thumbnails');
  res.send(response.rows)
}

async function gamesGetSingleImage(req, res){
  console.log('fetch a single image and return it as... well,...an image...')
  console.log("req.params", req.params)
  if(!req.params.id){return res.status(500).send({status:"failure"})}
  console.log('got here 1')
  let id = parseInt(req.params.id);
  console.log('got here 2')

  let response = await pool.query(`SELECT img FROM thumbnails WHERE id=${id}`)
  if(response.rows && response.rows.length>0){
    let buff = Buffer.from(response.rows[0].img);
    let stringifiedRaw = buff.toString();
    let jsonified = JSON.parse(stringifiedRaw);
    let mimeType = jsonified.mimetype;
    //console.log("stringifiedRaw", stringifiedRaw);
    console.log("parsejson", JSON.parse(stringifiedRaw))
    res.set('Content-Type', mimeType);
    //res.set('Content-Length', jsonified.size)
    let img = Buffer.from(jsonified.data, 'base64');
    return res.send(img);
    //Maybe look here to continue trying to make this work: https://stackoverflow.com/questions/62708802/how-to-convert-buffer-into-image-using-nodejs
    //Or maybe this: https://stackoverflow.com/questions/28440369/rendering-a-base64-png-with-express
  }else{
    res.status(500).send({status: 'failure'})
  }
  /*res.writeHead(200, {
    'Content-Type': 'image',
    'Content-Length': img.length
  });
  res.end(img);*/
}

module.exports =  {gamesList, gamesNew, gamesEdit, gamesNewImage, gamesImageList, gamesGetSingleImage}
