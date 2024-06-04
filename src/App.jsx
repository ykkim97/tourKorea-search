import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './Home';

function App() {
  // totalCount of datas
  const [totalLength, setTotalLength] = useState(1);
  
  return (
    <div style={{ display : 'flex', flexDirection : "column" }}>
      <Home 
        totalLength={totalLength}
        setTotalLength={setTotalLength}
      />
      <Footer />
    </div>
  )
}

export default App
