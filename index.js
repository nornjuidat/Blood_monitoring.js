const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'View')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'home.html'));
});

const userRoutes = require('./routes/userRoutes');
const measurementRoutes = require('./routes/measurementRoutes');

app.use('/api/users', userRoutes);
app.use('/api/measurements', measurementRoutes);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
