import { useEffect } from 'react';
import { deleteCartItem, getCartItems } from '../db';
import Navbar from '../components/Navbar';
import '../styles/Thanks.css';

export default function Thanks() {
  useEffect(() => {
    const clearCart = async () => {
      const items = await getCartItems();
      for (const item of items) {
        await deleteCartItem(item.id);
      }
    };
    clearCart();
  }, []);

  return (
    <>
      <Navbar cartCount={0} />
      <div className="thanks-page-container">
        <div className="thanks-content-box">
          <h1 className="thanks-title">Thank you for your purchase!</h1>
          <p className="thanks-message">Your order has been placed successfully.</p>
          <a href="/products" className="thanks-back-button">Back to Store</a>
        </div>
      </div>
    </>
  );
}
