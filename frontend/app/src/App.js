import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';


function App() {
  return (    
    <Router>
      <div>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
}


export default App;
