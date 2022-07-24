import './Tile.css'

function Tile({data}) {
  console.log('data.id', data.id)
  return (
    <div key={`tile-${data.id}`} className="tile" style={{backgroundImage:  `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.60)), url('/games/image/${data.id}')`}}>

      <div className="title-text-container">{data.name}</div>
    </div>
  );
}

export default Tile;
