import react, {useEffect, useState} from 'react';
import ListView from './ListView.js'
import Nav from './Nav.js'
import Filters from './Filters.js'
import './App.css';

function App() {

  return (
    <div className="App">
      <Nav/>
      <Filters/>
      <ListView/>
    </div>
  );
}

export default App;
