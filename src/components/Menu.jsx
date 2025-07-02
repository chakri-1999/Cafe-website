import { useState, useEffect } from 'react';
import './Menu.css';
import Cart from './Cart';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        console.log('Fetching menu items...');
        const response = await fetch('http://localhost:5000/api/menu-items');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        console.log('Received menu items:', data);

        // Process the nested menu structure
        let processedItems = [];
        if (data[0] && data[0].menu) {
          Object.entries(data[0].menu).forEach(([category, items]) => {
            const categoryItems = items.map(item => ({
              ...item,
              category: category,
              price: parseFloat(item.price) || 0,
              description: item.description || 'No description available',
              image: item.image || 'default-image-url.jpg'
            }));
            processedItems = [...processedItems, ...categoryItems];
          });
        }
        
        console.log('Processed items:', processedItems);
        setMenuItems(processedItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = {
    all: '🍽️ All',
    coffee: '☕ Coffee',
    pastries: '🥐 Pastries',
    sandwiches: '🥪 Sandwiches'
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === item._id);
      if (existingItem) {
        return prevItems.map(i =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setSelectedItem(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Filter menu items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category.toLowerCase() === activeCategory);

  console.log('Filtered items:', filteredItems);
  console.log('Active category:', activeCategory);

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section id="menu" className="menu">
      <h2>Our Menu</h2>
      <button 
        className="cart-toggle"
        onClick={() => setIsCartOpen(true)}
      >
        🛒 Cart ({cartItemCount})
      </button>
      <div className="menu-categories">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`category-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className={`menu-item ${selectedItem === item._id ? 'selected' : ''}`}
              onClick={() => setSelectedItem(item._id === selectedItem ? null : item._id)}
            >
              <div className="menu-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3>{item.name || 'Unnamed Item'}</h3>
                  <span className="price">${(item.price || 0).toFixed(2)}</span>
                </div>
                <p>{item.description}</p>
                {selectedItem === item._id && (
                  <button 
                    className="order-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">No menu items found</div>
        )}
      </div>
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </section>
  );
};

export default Menu; 