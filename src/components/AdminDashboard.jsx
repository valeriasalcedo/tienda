import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('activeUser'));
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administrador</h1>
      <div className="admin-actions">
        <button onClick={() => navigate('/admin/products')}>Gestionar Productos</button>
        <button onClick={() => navigate('/admin/providers')}>Gestionar Proveedores</button>
        <button onClick={() => navigate('/admin/orders')}>Ver Compras</button>
      </div>
    </div>
  );
}
