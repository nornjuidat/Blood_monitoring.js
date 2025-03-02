const express = require('express');
const path = require('path');
const cors = require('cors');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// Middleware לטיפול בהרשאות CORS (אם תרצה לגשת ל-API ממקור אחר)
app.use(cors());

// Middleware לקריאת JSON בבקשות POST
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // תמיכה בטפסים

// הגדרת תיקייה סטטית לקבצי ה-HTML, CSS ו-JS שבתוך `View`
app.use(express.static(path.join(__dirname, 'View')));

// נתיב ברירת מחדל – טוען את עמוד הבית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'home.html'));
});

// הגדרת Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blood Pressure Tracker API',
            version: '1.0.0',
            description: 'API לניהול משתמשים ומדידות לחץ דם',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/*.js'], // קבצי הנתיבים עם התיעוד
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// טעינת הנתיבים של ה-API
const userRoutes = require('./routes/userRoutes');
const measurementRoutes = require('./routes/measurementRoutes');

app.use('/api/users', userRoutes);
app.use('/api/measurements', measurementRoutes);

// Middleware לטיפול בשגיאות
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'משהו השתבש בשרת!' });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
