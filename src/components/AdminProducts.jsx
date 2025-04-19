import { useState, useEffect } from 'react';
import { addProduct, getProducts, deleteProduct, updateProduct, getProviders } from '../db';
import '../styles/AdminProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    price: '',
    image: '',
    category: '',
    style: '',
    quantity: '',
    provider: ''
  });

  const user = JSON.parse(localStorage.getItem('activeUser'));
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getProviders().then(setProviders);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      uploadedBy: user?.email || 'desconocido'
    };
  
    if (form.id) {
      await updateProduct(product);
    } else {
      delete product.id; // <- importante si está null
      await addProduct(product);
    }
  
    setForm({ id: null, name: '', price: '', image: '', category: '', style: '', quantity: '', provider: '' });
    getProducts().then(setProducts);
  };
  

  const handleEdit = (product) => {
    setForm(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getProducts().then(setProducts);
  };

  return (
    <div className="admin-products">
      <button onClick={() => window.history.back()} className="back-button">← Volver</button>
      <h2>{form.id ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required />
        <input name="style" value={form.style} onChange={handleChange} placeholder="Estilo" required />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Cantidad" required />
        <select name="provider" value={form.provider} onChange={handleChange} required>
          <option value="">Selecciona un proveedor</option>
          {providers.map(p => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">{form.id ? 'Guardar cambios' : 'Añadir producto'}</button>
      </form>

      <h2>Productos existentes</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Estilo</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Proveedor</th>
            <th>Subido por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.image && <img src={product.image} alt={product.name} className="product-table-img" />}</td>
              <td>{product.name}</td>
              <td>{product.style}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.provider}</td>
              <td>{product.uploadedBy}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)} className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}