import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', desc: '', img: '' });

  // Load items
  useEffect(() => {
    const storedItems = localStorage.getItem('restaurantMenu');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to Local Storage
  const saveToStorage = (updatedItems) => {
    localStorage.setItem('restaurantMenu', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  // Handle Form Input
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add New Item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.desc) return alert("Please fill name and description");

    const itemToAdd = {
      id: Date.now(), // Generate unique ID
      ...newItem
    };

    const updatedItems = [...items, itemToAdd];
    saveToStorage(updatedItems);
    setNewItem({ name: '', desc: '', img: '' }); // Reset form
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    saveToStorage(updatedItems);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      
      {/* Add Item Form */}
      <div className="admin-card">
        <h2>Add New Food Item</h2>
        <form onSubmit={handleAddItem}>
          <input 
            type="text" 
            name="name" 
            placeholder="Food Name (e.g., Idli)" 
            value={newItem.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="desc" 
            placeholder="Description" 
            value={newItem.desc} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="img" 
            placeholder="Image URL (https://...)" 
            value={newItem.img} 
            onChange={handleInputChange} 
          />
        
          <button type="submit" className="btn">Add Item</button>
        </form>
      </div>

      {/* List of Items */}
      <div className="admin-card">
        <h2>Current Menu Items</h2>
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="list-item">
              <div className="list-preview">
                <img src={item.img || 'https://via.placeholder.com/50'} alt="preview" />
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

