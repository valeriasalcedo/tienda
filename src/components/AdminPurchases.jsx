import { useEffect, useState } from 'react';
import { getPurchases } from '../db';
import '../styles/AdminPurchases.css';

export default function AdminPurchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchases().then(setPurchases);
  }, []);

  return (
    <div className="admin-purchases">
      <button onClick={() => window.history.back()} className="back-button">← Volver</button>
      <h2>Historial de Compras</h2>

      {purchases.length === 0 ? (
        <p>No hay compras registradas aún.</p>
      ) : (
        <div className="purchase-list">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="purchase-card">
              <div className="purchase-header">
                <p><strong>Usuario:</strong> {purchase.userEmail}</p>
                <p><strong>Fecha:</strong> {new Date(purchase.date).toLocaleString()}</p>
              </div>
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Estilo</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.style}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
