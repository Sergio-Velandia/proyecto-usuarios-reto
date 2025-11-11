import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5003/api/auth/login', {
        email,
        password
      });

      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      onLogin(user);
    } catch (err) {
      setError(err?.response?.data?.error || 'Error en autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="card login-card">
        <div className="logo">
          <div className="logo-icon">ES</div>
          <div>
            <div className="brand">Executive Solutions</div>
            <div className="brand-subtitle">Panel de Administración</div>
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="input-group">
            <label className="input-label">Correo Electrónico</label>
            <input
              className="input"
              type="email"
              placeholder="usuario@empresa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: '#f1f5f9', 
          borderRadius: '10px',
          fontSize: '13px',
          color: '#64748b'
        }}>
          <strong>Credenciales de prueba:</strong><br />
          Email: admin@empresa.com<br />
          Contraseña: password
        </div>
      </div>
    </div>
  );
}
