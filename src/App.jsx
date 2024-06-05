import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Home from './Home';
import axios from "axios";
import useAreaCode from './store/areaCode/useAreaCode';

function App() {
  // totalCount of datas
  const [totalLength, setTotalLength] = useState(1);
  // const { areaCodeData, fetchAreaCode } = useAreaCode();

  // useEffect(() => {
  //   fetchAreaCode();
  // }, [])

  // useEffect(() => {
  //   console.log(areaCodeData, "areaCodeData")
  // }, [areaCodeData])

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
