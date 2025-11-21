import React from 'react'
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Coin from './pages/Coin/Coin.jsx'
import Footer from './components/Footer/Footer.jsx'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/Coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App