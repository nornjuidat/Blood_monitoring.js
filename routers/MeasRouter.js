const express = require('express');
const db = require('../db');
const measurementsRoutes = express.Router();
measurementsRoutes.post('/', (req, res) => {
    const { user_id, systolic, diastolic, pulse, date } = req.body;
    if (!user_id || !systolic || !diastolic || !pulse || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.query('INSERT INTO measurements (user_id, systolic, diastolic, pulse, date) VALUES (?, ?, ?, ?, ?)',
        [user_id, systolic, diastolic, pulse, date], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: results.insertId, user_id, systolic, diastolic, pulse, date });
        });
});