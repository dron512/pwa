import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
      
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
