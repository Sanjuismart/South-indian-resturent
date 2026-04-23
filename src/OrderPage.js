import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Load Menu with Prices
  useEffect(() => {
    const storedItems = localStorage.getItem('restaurantMenu');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      // Add default price if not exists
      const itemsWithPrice = items.map(item => ({
        ...item,
        price: item.price || 150 // Default price if not set
      }));
      setMenuItems(itemsWithPrice);
    }
  }, []);

  // Add to Cart
  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  // Update Quantity
  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  // Remove from Cart
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Handle Customer Info Change
  const handleInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  
  // Calculate Total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Submit Order
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!customerInfo.name || !customerInfo.phone) return alert("Please fill in your details.");

    const newOrder = {
      id: Date.now(),
      customer: customerInfo,
      items: cart,
      totalAmount: calculateTotal(),
      status: 'Pending',
      date: new Date().toLocaleString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    localStorage.setItem('restaurantOrders', JSON.stringify([...existingOrders, newOrder]));

    setOrderSuccess(true);
    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '' });
  };

  if (orderSuccess) {
    return (
      <div className="success-page">
        <h1>Order Placed Successfully! 🎉</h1>
        <p>Thank you for ordering from Spice Garden.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1>Place Your Order</h1>
      
      <div className="order-layout">
        {/* Left Side: Menu Selection */}
        <div className="menu-selection">
          <h2>Select Items</h2>
          <div className="menu-grid">
            {menuItems.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.img} alt={item.name} />
                <div className="menu-info">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <p className="price-tag">₹{item.price}</p>
                  <button className="btn" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Cart & Checkout */}
        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <span>₹{item.price} x {item.quantity}</span>
                    </div>
                    <div className="cart-item-actions">
                      <button className="qty-btn" onClick={() => updateQuantity(index, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(index, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(index)}>x</button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="bill-summary">
                <div className="bill-row">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="bill-row">
                  <span>Tax (5%):</span>
                  <span>₹{(calculateTotal() * 0.05).toFixed(2)}</span>
                </div>
                <div className="bill-row total">
                  <span>Total:</span>
                  <span>₹{(calculateTotal() * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <h3>Delivery Details</h3>
                <input name="name" placeholder="Your Name" value={customerInfo.name} onChange={handleInfoChange} required />
                <input name="phone" placeholder="Phone Number" value={customerInfo.phone} onChange={handleInfoChange} required />
                <textarea name="address" placeholder="Delivery Address" value={customerInfo.address} onChange={handleInfoChange} required></textarea>
                <button type="submit" className="btn" style={{width: '100%'}}>Confirm Order</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default OrderPage;