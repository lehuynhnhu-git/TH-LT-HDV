// middlewares/perDayDrug.js
function perDayDrug(req, res, next) {
    const { perDay } = req.body;

    // kiểm tra perDay
    if (!perDay || perDay <= 0 || perDay >= 90) {
        return res.status(400).send(`<script>alert('Drug perDay is required and should be more than 0 and less than 90.'); window.history.back();</script>`);
    }

    // nếu OK thì cho đi tiếp
    next();
}
module.exports = perDayDrug;