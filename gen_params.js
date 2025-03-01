const db = require('./db');
const createUsers = () => {
    const users = [
        { name: 'אדם כהן' },
        { name: 'דנה לוי' },
        { name: 'יוסי מזרחי' }
    ];
    users.forEach(user => {
        db.query('INSERT INTO users (name) VALUES (?)', [user.name], (err) => {
            if (err) console.error('Error inserting user:', err);
        });
    });
};