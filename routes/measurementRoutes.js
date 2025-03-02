const express = require('express');
const router = express.Router();
const db = require('../db'); // וודא שהקובץ db.js קיים

// הוספת מדידה חדשה
router.post('/', async (req, res) => {
    try {
        const { userId, systolic, diastolic, pulse, date } = req.body;
        if (!userId || !systolic || !diastolic || !pulse || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await db.execute(
            'INSERT INTO measurements (user_id, systolic, diastolic, pulse, date) VALUES (?, ?, ?, ?, ?)',
            [userId, systolic, diastolic, pulse, date]
        );

        res.status(201).json({ message: 'Measurement added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// קבלת כל המדידות של משתמש מסוים
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await db.execute(
            'SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// ייצוא הנתיב
module.exports = router;
