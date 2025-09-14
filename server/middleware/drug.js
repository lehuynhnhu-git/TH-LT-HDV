const validateDrug = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;

    // Validation errors array to collect all errors
    const errors = [];

    // a. Name validation - length must be more than 5
    if (!name || name.trim().length <= 5) {
        errors.push("Name must be more than 5 characters long.");
    }

    // b. Dosage validation - format: XX-morning,XX-afternoon,XX-night (X is digit)
    const dosagePattern = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosage || !dosagePattern.test(dosage.trim())) {
        errors.push("Dosage must follow the format: XX-morning,XX-afternoon,XX-night (where X is a digit).");
    }

    // c. Card validation - must be more than 1000
    const cardNum = parseInt(card);
    if (!card || isNaN(cardNum) || cardNum <= 1000) {
        errors.push("Card must be more than 1000.");
    }

    // d. Pack validation - must be more than 0
    const packNum = parseInt(pack);
    if (!pack || isNaN(packNum) || packNum <= 0) {
        errors.push("Pack must be more than 0.");
    }

    // e. PerDay validation - must be more than 0 and less than 90
    const perDayNum = parseInt(perDay);
    if (!perDay || isNaN(perDayNum) || perDayNum <= 0 || perDayNum >= 90) {
        errors.push("PerDay must be more than 0 and less than 90.");
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        const errorMessage = errors.join(' ');
        return res.status(400).send(`<script>alert("${errorMessage}"); window.history.back();</script>`);
    }

    // If validation passes, proceed to the next middleware
    next();
};

module.exports = validateDrug;