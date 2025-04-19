import { useEffect, useState } from 'react';
import { getCartItems, deleteCartItem, addPurchase } from '../db';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const items = await getCartItems();
    setCartItems(items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await deleteCartItem(id);
    fetchCart();
  };

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('activeUser'));
    if (!user || cartItems.length === 0) return;

    const purchase = {
      userId: user.id,
      userEmail: user.email,
      date: new Date().toISOString(),
      items: cartItems
    };

    await addPurchase(purchase);

    for (const item of cartItems) {
      await deleteCartItem(item.id);
    }

    navigate('/thanks');
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item, index) => (
                <div key={item.id} className="product-card-cart">
                  <div className={`product-card-header color-${(index % 5) + 1}`}>
                    <div className="bookmark">★</div>
                  </div>
                  <div className="product-card-body">
                    <h4>{item.name}</h4>
                    <p>{item.style}</p>
                    <p>${item.price}</p>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
