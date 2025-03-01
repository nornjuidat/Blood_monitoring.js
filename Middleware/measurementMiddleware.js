const measurementMiddleware = {};

measurementMiddleware.validateMeasurement = (req, res, next) => {
    const { systolic, diastolic, pulse } = req.body;

    if (!systolic || !diastolic || !pulse) {
        return res.status(400).json({ error: 'All measurement values are required' });
    }
    if (systolic < 50 || systolic > 250 || diastolic < 30 || diastolic > 150 || pulse < 30 || pulse > 200) {
        return res.status(400).json({ error: 'Invalid measurement values' });
    }

    next();
};

module.exports = measurementMiddleware;
