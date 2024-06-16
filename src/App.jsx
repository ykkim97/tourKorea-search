import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Home from './Home';
import axios from "axios";

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
