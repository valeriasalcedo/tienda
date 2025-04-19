import { useEffect, useState } from 'react';
import { getProviders, addProvider, updateProvider, deleteProvider } from '../db';
import '../styles/AdminProviders.css';

export default function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    company: '',
    contact: '',
    email: ''
  });

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    const data = await getProviders();
    setProviders(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provider = {
      ...form,
      contact: form.contact.trim(),
      email: form.email.trim()
    };

    // Si el id es null, lo eliminamos para evitar error de IndexedDB
    if (!form.id) {
      delete provider.id;
      await addProvider(provider);
    } else {
      await updateProvider(provider);
    }

    setForm({ id: null, name: '', company: '', contact: '', email: '' });
    await loadProviders();
  };

  const handleEdit = (provider) => {
    setForm(provider);
  };

  const handleDelete = async (id) => {
    await deleteProvider(id);
    await loadProviders();
  };

  return (
    <div className="admin-providers">
      <button onClick={() => window.history.back()} className="back-button">← Volver</button>

      <h2 className="form-title">{form.id ? 'Editar Proveedor' : 'Añadir Proveedor'}</h2>

      <form className="provider-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Empresa"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contacto"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          {form.id ? 'Guardar Cambios' : 'Añadir proveedor'}
        </button>
      </form>

      <h2 className="list-title">Lista de Proveedores</h2>
      <table className="provider-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.name}</td>
              <td>{prov.company}</td>
              <td>{prov.contact}</td>
              <td>{prov.email}</td>
              <td>
                <button onClick={() => handleEdit(prov)}>Editar</button>
                <button onClick={() => handleDelete(prov.id)} className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
