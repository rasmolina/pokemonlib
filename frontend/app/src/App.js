import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import HomePage from './components/HomePage';


function App() {
  return (    
    <Router>
      <div>
        <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
}


export default App;
