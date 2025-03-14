import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectSeats from './pages/SelectSeats';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;