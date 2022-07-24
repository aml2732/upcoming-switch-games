const express = require('express')
var bodyParser = require('body-parser')

const getPort = (port) => {return parseInt(port);}
const port = getPort(process.env.PORT || 5001)
const path = require('path');
const api = require('../backend/api.js');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send('Admin tool Hello World!')
})

app.get('/games/list', api.gamesList)

app.post('/games/:id/edit', api.gamesEdit);

app.post('/games/new', api.gamesNew)

app.post('/games/newimage', api.gamesNewImage)

app.get('/', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'adminView.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
