import { useState } from 'react';
import { addUser } from '../db';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) return alert('Completa todos los campos');
    const newUser = { email, password}; 
    const id = await addUser(newUser);
    localStorage.setItem('activeUser', JSON.stringify({ ...newUser, id }));
    navigate('/products');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-brand">Frame</h2>
        <p className="auth-sub">Crea una cuenta</p>
        <input
          type="text"
          placeholder="Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleRegister}>Registrarme</button>

        <p className="auth-alt">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
}
