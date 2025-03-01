const db = require('../db');

const userMiddleware = {};

userMiddleware.checkUserExists = (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: 'User ID is required' });

    db.query('SELECT id FROM users WHERE id = ?', [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        next();
    });
};

module.exports = userMiddleware;
