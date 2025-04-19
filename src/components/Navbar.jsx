import { useEffect, useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'; 
export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('activeUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    setUser(null);
    navigate('/');
  };

  return (
    <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="landing-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" /> 
        </Link>
      </div>
      <nav className="landing-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <div className="landing-icons">
        <input type="text" placeholder="Search" />
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <div className="user-menu">
          <FaUserCircle className="icon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="user-dropdown">
              {user ? (
                <>
                  <p className="user-email">{user.email}</p>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowMenu(false)}>Iniciar sesión</Link>
                  <Link to="/register" onClick={() => setShowMenu(false)}>Registrarse</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
