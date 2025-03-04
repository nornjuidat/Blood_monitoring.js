// 📌 התקנת התלויות (אם עדיין לא עשית)
// npm i express body-parser ejs htmlspecialchars mysql2 slashes@2.0.0 swagger-autogen swagger-ui-express

const PORT = 3000;
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require("swagger-ui-express");
const swaggerOutputFile = "./swagger-output.json";
const routes = ["./routes/userRoutes.js", "./routes/measurementRoutes.js"]; // ודא ששם הקבצים תקין

// 📌 הגדרת ה-doc לפני הקריאה ל-swaggerAutogen
const doc = {
    info: {
        title: "My API",
        description: "blood_pressure",
    },
    host: `localhost:${PORT}`,
};

swaggerAutogen(swaggerOutputFile, routes, doc).then(() => {
    const swaggerDocument = require(swaggerOutputFile);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

    // 📌 Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());

    // 📌 חיבור למסד נתונים
    let db_M = require("./db");
    global.db_pool = db_M.pool;

    // 📌 ניהול קבצים סטטיים
    app.use(express.static(path.join(__dirname, "View")));

    // 📌 נתיבי HTML
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "View/home.html"));
    });
    app.get("/patients", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "View/allusers.html"));
    });
    app.get("/measure", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "View/addMeasures.html"));
    });

    const userRoutes = require("./routes/userRoutes");
    app.use("/", userRoutes);

    const measurementRoutes = require("./routes/measurementRoutes");
    app.use("/", measurementRoutes);

    // 📌 הפעלת השרת
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
    });
});
