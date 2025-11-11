import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API = 'http://localhost:5003/api/usuarios';
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (err) {
      showMessage('error', 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        showMessage('success', 'Usuario actualizado correctamente');
      } else {
        await axios.post(API, form);
        showMessage('success', 'Usuario creado correctamente');
      }
      
      setEditId(null);
      setForm({ nombre: '', email: '', telefono: '' });
      getUsers();
    } catch (err) {
      showMessage('error', err?.response?.data?.error || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API}/${id}`);
      showMessage('success', 'Usuario eliminado correctamente');
      getUsers();
    } catch (err) {
      showMessage('error', 'Error al eliminar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ 
      nombre: user.nombre, 
      email: user.email, 
      telefono: user.telefono || '' 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ nombre: '', email: '', telefono: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="app-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Gestión de Usuarios</h1>
            <p className="dashboard-subtitle">
              Administra y controla los usuarios del sistema
            </p>
          </div>
          <div className="user-info">
            <div className="user-avatar">{getInitials(currentUser.nombre || 'U')}</div>
            <div className="user-details">
              <h3>{currentUser.nombre}</h3>
              <p>{currentUser.email}</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {message.text && (
          <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </div>
        )}

        <div className="form-card">
          <h3>{editId ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Nombre Completo *</label>
                <input
                  className="input"
                  placeholder="Juan Pérez"
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Correo Electrónico *</label>
                <input
                  className="input"
                  type="email"
                  placeholder="juan@empresa.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
  <label className="input-label">
    Contraseña {editId ? '(dejar vacío para no cambiar)' : '*'}
  </label>
  <input
    className="input"
    type="password"
    placeholder="••••••••"
    value={form.password}
    onChange={e => setForm({ ...form, password: e.target.value })}
    required={!editId}
  />
</div>

              <div className="input-group">
                <label className="input-label">Teléfono</label>
                <input
                  className="input"
                  placeholder="3001234567"
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                />
              </div>
            </div>

            <div className="form-actions">
              {editId && (
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}
              <button 
                type="submit" 
                className="btn btn-sm" 
                disabled={loading}
              >
                {loading ? 'Guardando...' : (editId ? 'Actualizar Usuario' : 'Crear Usuario')}
              </button>
            </div>
          </form>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h3>Lista de Usuarios ({users.length})</h3>
          </div>
          <div className="table-container">
            {loading && users.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                Cargando usuarios...
              </div>
            ) : users.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                No hay usuarios registrados
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <span className="badge badge-primary">#{u.id}</span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.telefono || '-'}</td>
                      <td>
                        <span className="badge badge-success">Activo</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => handleEdit(u)}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(u.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;