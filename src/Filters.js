import react, {useEffect, useState} from 'react';
import './Filters.css'


function Filters() {

  return (
    <div className="filters">
      <select>
        <option>Release Date ASC</option>
        <option>Release Date DESC</option>
        <option>Title A-to-Z</option>
        <option>Title Z-to-A</option>
      </select>
    </div>
  );
}

export default Filters;
