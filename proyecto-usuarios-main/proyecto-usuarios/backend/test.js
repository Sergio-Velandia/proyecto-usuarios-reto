// test.js
console.log('Probando rutas...');

try {
    const db = require('./config/database');
    console.log('✅ database.js cargado correctamente');
} catch (error) {
    console.log('❌ Error cargando database.js:', error.message);
}

try {
    const usuarios = require('./routes/usuarios');
    console.log('✅ usuarios.js cargado correctamente');
} catch (error) {
    console.log('❌ Error cargando usuarios.js:', error.message);
}