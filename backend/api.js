
const tempData = [{
  id: '1',
  name: 'Test Name',
  image: null,
  expectedReleaseDate: '2023-01-10'
},{
  id: '2',
  name: 'Test Name 2',
  image: null,
  expectedReleaseDate: '2023-04-10'
}];

function gamesList(req, res){
  return res.send(tempData);
}

module.exports =  {gamesList}
