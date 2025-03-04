const { isBefore, isSameDay } = require('date-fns');
const db_pool = require('../config/db');

async function executeQuery(query, params = []) {
    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(query, params);
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database operation failed.');
    }
}

async function AddMeasures(req, res, next) {
    try {
        const { user_id, date, sys_high, dia_low, pulse } = req.body;
        if (!user_id || !date || !sys_high || !dia_low || !pulse) {
            throw new Error('All fields are required.');
        }

        const query = `INSERT INTO measures (user_id, date, sys_high, dia_low, pulse) VALUES (?, ?, ?, ?, ?)`;
        const result = await executeQuery(query, [user_id, date, sys_high, dia_low, pulse]);

        req.insertId = result.insertId;
        req.success = true;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function GetMeasures(req, res, next) {
    try {
        const query = `SELECT * FROM measures`;
        req.all_measures = await executeQuery(query);
        req.success = req.all_measures.length > 0;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function UpdateMeasures(req, res, next) {
    try {
        const { idx, date, sys_high, dia_low, pulse } = req.body;
        if (!idx || !date || !sys_high || !dia_low || !pulse) {
            throw new Error('All fields are required.');
        }

        const query = `UPDATE measures SET date = ?, sys_high = ?, dia_low = ?, pulse = ? WHERE id = ?`;
        await executeQuery(query, [date, sys_high, dia_low, pulse, idx]);

        req.success = true;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function DeleteMeasures(req, res, next) {
    try {
        const { idx } = req.body;
        if (!idx) throw new Error('ID is required.');

        const query = `DELETE FROM measures WHERE id = ?`;
        await executeQuery(query, [idx]);

        req.success = true;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function GetMeasuresByUId(req, res, next) {
    try {
        const { user_id, startDate, endDate } = req.body;
        if (!user_id) throw new Error('User ID is required.');

        let query = `SELECT * FROM measures WHERE user_id = ?`;
        const params = [user_id];

        if (startDate && endDate && (isBefore(startDate, endDate) || isSameDay(startDate, endDate))) {
            query += ` AND date BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        req.measuresByUId = await executeQuery(query, params);
        req.success = req.measuresByUId.length > 0;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function GetMeasuresAvg(req, res, next) {
    try {
        const { user_id, startDate, endDate } = req.body;
        if (!user_id) throw new Error('User ID is required.');

        let query = `SELECT AVG(sys_high) AS sysAvg, AVG(dia_low) AS diaAvg, AVG(pulse) AS pulseAvg FROM measures WHERE user_id = ?`;
        const params = [user_id];

        if (startDate && endDate && (isBefore(startDate, endDate) || isSameDay(startDate, endDate))) {
            query += ` AND date BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        req.measuresAvg = await executeQuery(query, params);
        req.success = req.measuresAvg.length > 0;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function CriticalMeasures(req, res, next) {
    try {
        const measuresAvg = req.measuresAvg[0];
        const measuresByUId = req.measuresByUId;

        measuresByUId.forEach(measure => {
            measure.critical = (
                measure.sys_high > measuresAvg.sysAvg * 1.2 || measure.sys_high < measuresAvg.sysAvg * 0.8 ||
                measure.dia_low > measuresAvg.diaAvg * 1.2 || measure.dia_low < measuresAvg.diaAvg * 0.8 ||
                measure.pulse > measuresAvg.pulseAvg * 1.2 || measure.pulse < measuresAvg.pulseAvg * 0.8
            );
        });

        req.criticalData = measuresByUId;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

async function AvgMeasuresByMonth(req, res, next) {
    try {
        const { month, year } = req.body;
        if (!month || !year || month < 1 || month > 12) throw new Error('Invalid month or year.');

        const query = `SELECT user_id, AVG(sys_high) AS sysAvg, AVG(dia_low) AS diaAvg, AVG(pulse) AS pulseAvg FROM measures WHERE MONTH(date) = ? AND YEAR(date) = ? GROUP BY user_id`;
        req.AvgMeasuresByMonth = await executeQuery(query, [month, year]);
        req.success = req.AvgMeasuresByMonth.length > 0;
    } catch (err) {
        req.success = false;
        console.error(err);
    }
    next();
}

module.exports = {
    AddMeasures,
    GetMeasures,
    UpdateMeasures,
    DeleteMeasures,
    GetMeasuresByUId,
    GetMeasuresAvg,
    CriticalMeasures,
    AvgMeasuresByMonth
};
