// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración de variables de entorno
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

// Endpoint para consultar todos los abonados
app.get('/api/abonados', (req, res) => {
    const sql = 'SELECT * FROM abonado';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint para manejar el inicio de sesión con verificación de plan de pago
app.post('/api/login', (req, res) => {
    const { abonado, desbloqueo, planPago } = req.body;

    const sql = `
        SELECT a.estado, a.plan_pago
        FROM abonado a
        WHERE a.id = ? AND a.desbloqueo = ? AND a.plan_pago = ?
    `;

    db.query(sql, [abonado, desbloqueo, planPago], (err, results) => {
        if (err) {
            console.error("Error en la consulta de la base de datos:", err);
            return res.status(500).json({ error: 'Error en el servidor al ejecutar la consulta' });
        }

        if (results.length > 0) {
            console.log("Usuario, desbloqueo y plan de pago correctos:", results[0]);
            res.json({ success: true, estado: results[0].estado, plan_pago: results[0].plan_pago });
        } else {
            console.warn("No se encontraron coincidencias para los datos proporcionados");
            res.json({ success: false, message: 'Número, desbloqueo o plan de pago incorrecto' });
        }
    });
});

// Endpoint para obtener todos los planes de pago
app.get('/api/planes', (req, res) => {
    const sql = 'SELECT id, nombre FROM plan_de_pago';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los planes de pago:', err);
            return res.status(500).json({ error: 'Error al obtener los planes de pago' });
        }
        res.json(results);
    });
});

// Endpoint para obtener información del abonado para AuthScreen
app.get('/api/abonado/:id', (req, res) => {
    const abonadoId = req.params.id;

    const sql = `
        SELECT a.operador, a.LAC, a.estado, a.desbloqueo, a.plan_pago, 
               f.nombre AS Frecuencia, 
               r.nombre AS Alcaldia, 
               o.nombre AS OperadorNombre
        FROM abonado a
        JOIN frecuencia f ON a.frecuencia = f.id
        JOIN registro r ON a.registro = r.id
        JOIN operador o ON a.operador = o.id
        WHERE a.id = ?
    `;

    db.query(sql, [abonadoId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
        }
        
        if (results.length > 0) {
            res.json(results[0]); // Retorna solo el primer resultado
        } else {
            res.status(404).json({ error: 'Abonado no encontrado' });
        }
    });
});

// Endpoint para obtener los servicios disponibles
app.get('/api/servicios', (req, res) => {
    const sql = 'SELECT id, nombre FROM servicio';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint para validar servicio con restricciones de marca y plan de pago
app.post('/api/validar-servicio', (req, res) => {
    const { abonadoId, servicioId } = req.body;

    console.log("Datos recibidos para validación:", { abonadoId, servicioId });

    if (!abonadoId || !servicioId) {
        console.error("Faltan datos para validar el servicio");
        return res.status(400).json({ error: 'Faltan datos para validar el servicio' });
    }

    const sqlPlanPago = `
        SELECT a.plan_pago, a.marca, s.nombre AS servicioNombre
        FROM abonado a
        JOIN servicio s ON s.id = ?
        WHERE a.id = ?
    `;

    db.query(sqlPlanPago, [servicioId, abonadoId], (err, results) => {
        if (err) {
            console.error('Error en la consulta de la base de datos:', err);
            return res.status(500).json({ error: 'Error en la autenticación' });
        }

        if (results.length > 0) {
            const { plan_pago, marca, servicioNombre } = results[0];
            console.log("Plan de pago, marca y servicio obtenidos:", { plan_pago, marca, servicioNombre });

            let message = 'Accediste al servicio, esta en cobertura LTE.';
            if (plan_pago === 2 && ['100', '101', '110', '111'].includes(servicioId)) {
                message = 'Tu plan de pago no te permite acceder al servicio';
            } else if (plan_pago === 3 && ['110', '111'].includes(servicioId)) {
                message = 'Tu plan de pago no te permite acceder al servicio';
            }

            // Condición adicional para denegar LTE en marcas 4 y 5
            if (marca === 4 || marca === 5 && servicioNombre === 'LTE') {
                message = 'Tu teléfono no te permite utilizar el servicio LTE';
            }

            res.json({ message, acceso: !message.includes('no te permite'), marca });
        } else {
            console.warn("Usuario o servicio no encontrado");
            res.status(404).json({ error: 'Usuario o servicio no encontrado' });
        }
    });
});

// Iniciar el servidor en el puerto especificado en .env o 5001 como predeterminado
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
