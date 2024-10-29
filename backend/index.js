const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurar las variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Crear la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

// Endpoint para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
    const { abonado, contraseña } = req.body;

    const sql = 'SELECT * FROM abonado WHERE id = ? AND contraseña = ?';
    db.query(sql, [abonado, contraseña], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            res.json({ success: true, message: 'Acceso permitido', estado: user.estado, operador: user.operador });
        } else {
            res.json({ success: false, message: 'Número o contraseña incorrectos' });
        }
    });
});

// Endpoint para obtener los datos completos del abonado
app.get('/api/abonado/:id', (req, res) => {
    const abonadoId = req.params.id;

    const sql = `
        SELECT a.operador, f.nombre AS Frecuencia
        FROM abonado a
        JOIN frecuencia f ON a.frecuencia = f.id
        WHERE a.id = ?
    `;

    db.query(sql, [abonadoId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }
        
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Abonado no encontrado' });
        }
    });
});

// Iniciar el servidor en el puerto especificado en .env o 5001 como predeterminado
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
