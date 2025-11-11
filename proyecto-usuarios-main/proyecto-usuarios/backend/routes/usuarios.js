const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');

router.get('/', (req, res) => {
  const query = 'SELECT id, nombre, email, telefono, fecha_registro FROM usuarios ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message
      });
    }
    res.json(results);
  });
});

router.post('/', async (req, res) => {
  const { nombre, email, telefono, password } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nombre, email, telefono, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El email ya está registrado' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ 
        id: result.insertId, 
        nombre, 
        email, 
        telefono 
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la contraseña' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, password } = req.body;
  
  try {
    let query;
    let params;
    
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = 'UPDATE usuarios SET nombre=?, email=?, telefono=?, password=? WHERE id=?';
      params = [nombre, email, telefono, hashedPassword, id];
    } else {
      query = 'UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?';
      params = [nombre, email, telefono, id];
    }
    
    db.query(query, params, (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El email ya está registrado' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la contraseña' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;