import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Map Component
const MapLocation = () => (
  <div className="map-container">
    {/* Replace the src below with your actual Google Maps Embed Link */}
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0605976912416!2d77.6192598735878!3d12.903825016363555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14e8febdde69%3A0x5ba1320f4a747fde!2sCharana%20Nilayam%2C%2049%2C%20Virat%20Nagar%2C%20Bommanahalli%2C%20Bengaluru%2C%20Karnataka%20560068!5e0!3m2!1sen!2sin!4v1773128032922!5m2!1sen!2sin"  
      width="100%" 
      height="300" 
      style={{border:0}} 
      allowFullScreen="" 
      loading="lazy"
    ></iframe>
  </div>
);

const Restaurant = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('restaurantMenu');
    if (storedItems) setMenuItems(JSON.parse(storedItems));
  }, []);

  return (
    <div className="restaurant-container">
      <section className="hero">
        <h1>Authentic South Indian Flavors</h1>
        <p>Experience the taste of tradition.</p>
        <Link to="/order" className="btn">Order Now</Link>
      </section>

      <section className="menu-section">
        <h2 className="section-title">Our Menu</h2>
        <div className="menu-grid">
          {menuItems.length === 0 ? (
            <p>No items available.</p>
          ) : (
            menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <img src={item.img} alt={item.name} />
                <div className="menu-info">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>📞 +91 8762374480</p>
          <p>📍 49, 1st cross 13 main road BHCS land,
Viratnagar,
Bommanahalli,
Bangalore-560068.</p>
        </div>
        <MapLocation />
      </section>
    </div>
  );
};

export default Restaurant;