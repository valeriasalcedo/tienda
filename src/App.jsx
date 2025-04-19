import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Products from './components/Products';
import ProductImporter from './components/ProductImporter';
import Cart from './components/Cart';
import Thanks from './components/Thanks';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';
import AdminProviders from './components/AdminProviders';
import AdminPurchases from './components/AdminPurchases'; // 👈 nuevo

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/import" element={<ProductImporter />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="/admin/orders" element={<AdminPurchases />} />
      </Routes>
    </Router>
  );
}
