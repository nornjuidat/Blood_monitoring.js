const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blood_pressure_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

const userRoutes = require('./Routers/users_R');
const measurementRoutes = require('./Routers/measurements_R');

app.use('/users', userRoutes);
app.use('/measurements', measurementRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
