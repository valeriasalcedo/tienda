import '../styles/Landing.css'
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.png"; 

import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">
          <img src={logo} alt="StyleHub Logo" className="logo-img" />
        </div>

        <nav className="landing-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>

        <div className="landing-icons">
          <input type="text" placeholder="Search" />

          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>

          <Link to="/login">
            <FaUserCircle className="icon" />
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="landing-hero-full">
        <div className="landing-overlay">
          <section className="landing-text">
            <h1>GET READY <br /> FOR POP UP <br /> MARKET</h1>
            <p className="landing-date">
              <strong>Friday, 26<sup>th</sup> Nov | at 12. Buitenzorg</strong>
            </p>
            <p className="landing-desc">
              Moda femenina en tendencia. Encuentra tu estilo en nuestra nueva colección para esta temporada.
            </p>
            <div className="landing-buttons">
              <button className="shop-now">Shop now</button>
              <button className="more-info">More information</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
