const express = require('express');
const db = require('../db');
const usersRoutes = express.Router();
usersRoutes.get('/', (req, res) => {
    db.query('SELECT id, name FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
usersRoutes.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: results.insertId, name });
    });
});

module.exports = usersRoutes;
