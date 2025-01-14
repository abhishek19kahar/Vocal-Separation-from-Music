import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Css/Navbar';
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'


function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/' element={<Navigate to="/login  "/>} />
      <Route path='login' element={<Login/>} />
      <Route path='signup' element={<Signup/>} />
      <Route path='navbar' element={<Navbar/>} />
      <Route path='home' element={<Home/>} />
      <Route path='about' element={<About/>} />
      <Route path='services' element={<Services/>} />
      <Route path='contact' element={<Contact/>} />
      </Routes>
    </div>
  );
}

export default App;
