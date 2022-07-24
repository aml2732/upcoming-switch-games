import react, {useEffect, useState} from 'react';
import Tile from './Tile';
import './App.css';

function App() {
  const [data, setData] = useState([]);


  useEffect(()=>{
    fetch('/games/list')
    .then(res => res.json())
    .then((result)=>{
      setData(result);
    })
  }, [])

  return (
    <div className="App">
      {data.map((item)=>{return (<Tile data={item} key={`Tile-container-${item.id}`}/>)})}
    </div>
  );
}

export default App;
