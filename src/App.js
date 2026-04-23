import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Restaurant from './Restaurant';
import OrderPage from './OrderPage';
import AdminDashboard from './AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">Spice Garden 🌿</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/order">Order Now</Link>
            <Link to="/admin">Admin Dashboard</Link>
           <iframe src="..." title="Restaurant Location Map" />
    
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
