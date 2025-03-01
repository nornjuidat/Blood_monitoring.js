CREATE DATABASE IF NOT EXISTS blood_pressure_db;
USE blood_pressure_db;

CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS measurements (
                                            id INT AUTO_INCREMENT PRIMARY KEY,
                                            user_id INT,
                                            systolic INT NOT NULL,
                                            diastolic INT NOT NULL,
                                            pulse INT NOT NULL,
                                            date DATETIME DEFAULT CURRENT_TIMESTAMP,
                                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

INSERT INTO users (name) VALUES ('משתמש 1'), ('משתמש 2');

INSERT INTO measurements (user_id, systolic, diastolic, pulse, date) VALUES
     (1, 120, 80, 70, '2025-03-01 08:00:00'),
     (1, 140, 90, 75, '2025-03-02 09:00:00'),
    (2, 130, 85, 72, '2025-03-01 10:00:00');
