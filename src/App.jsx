import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
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
      {/* Toast Message Container */}
      <ToastContainer />
    </div>
  )
}

export default App
