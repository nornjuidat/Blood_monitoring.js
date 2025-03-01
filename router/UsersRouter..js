const express = require('express');
const db = require('../db');
const usersRoutes = express.Router();
usersRoutes.get('/', (req, res) => {
    db.query('SELECT id, name FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});