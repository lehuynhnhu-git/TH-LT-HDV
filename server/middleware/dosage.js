function dosageDrug(req, res, next) {
    const { dosage } = req.body;
    const dosagePattern = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosagePattern.test(dosage)) {
        return res.status(400).send('<script>alert("Dosage must follow format: XX-morning,XX-afternoon,XX-night"); window.history.back();</script>');
    }
    next();
}

module.exports = dosageDrug;