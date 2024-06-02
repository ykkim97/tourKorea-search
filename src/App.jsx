import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './Home';

function App() {
  const [searchRegion, setSearchRegion] = useState([]);
  return (
    <div>
      <Nav 
        searchRegion={searchRegion}
        setSearchRegion={setSearchRegion}
      />
      <Home 
        searchRegion={searchRegion}
        setSearchRegion={setSearchRegion}
      />
      <Footer />
    </div>
  )
}

export default App
