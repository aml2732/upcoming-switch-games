const express = require('express')
const getPort = (port) => {return parseInt(port);}
const port = getPort(process.env.PORT || 5000)
const path = require('path');
const basePath =  path.resolve(__dirname, '..', 'build');
const api = require('./api')

const app = express()
app.use(express.static(basePath));


app.get('/ping', (req, res) => {
  res.send('Hello World!')
})

app.get('/games/list', api.gamesList)
app.get('/games/image/:id', api.gamesGetSingleImage)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(basePath, 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
