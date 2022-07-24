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
  console.log('req.body', req.body);
  if(!req.body.id || !req.body.image){
    return res.status(500).send({status:'failure'})
  }
  console.log('typeof file', typeof req.body.image)
  res.send({status: "success"});
}

module.exports =  {gamesList, gamesNew, gamesEdit}
