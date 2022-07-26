import './Tile.css'

function Tile({data}) {
  console.log('data.id', data.id)
  return (
    <div key={`tile-${data.id}`} className="tile" style={{backgroundImage:  `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.20)), url('/games/image/${data.id}')`}}>
      <div className="hidden-till-tile-flipped">
        <a href={data.linkto} target="_blank"  rel="noreferrer">More info</a>
        <p>{data.description}</p>
      </div>
      <div className="title-text-container">{data.name}</div>
    </div>
  );
}

export default Tile;
