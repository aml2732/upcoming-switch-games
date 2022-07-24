import './Tile.css'

function Tile({data}) {
  console.log('data.id', data.id)
  return (
    <div key={`tile-${data.id}`} className="tile" >

      <div className="title-text-container">{data.name}</div>
    </div>
  );
}

export default Tile;
