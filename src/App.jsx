import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './Home';

function App() {
  const [searchRegion, setSearchRegion] = useState([]);
  const [totalLength, setTotalLength] = useState(1);
  const [region, setRegion] = useState('서울');
  return (
    <div style={{ display : 'flex', flexDirection : "column" }}>
      <Home 
        region={region}
        setRegion={setRegion}
        searchRegion={searchRegion}
        setSearchRegion={setSearchRegion}
        totalLength={totalLength}
        setTotalLength={setTotalLength}
      />
      <Footer />
    </div>
  )
}

export default App
