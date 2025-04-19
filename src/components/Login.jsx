import { useState } from 'react';
import { getUsers } from '../db';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user));
      navigate('/products');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-brand">Frame</h2>
        <p className="auth-sub">Bienvenid@ de nuevo</p>

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

        <button className="auth-button" onClick={handleLogin}>Iniciar sesión</button>

        <p className="auth-alt">¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
}
