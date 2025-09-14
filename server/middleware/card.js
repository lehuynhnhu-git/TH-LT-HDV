// middlewares/cardDrug.js
function cardDrug(req, res, next) {
    const { card } = req.body;

    // kiểm tra card
    if (!card || card <= 1000) {
        return res.status(400).send(`<script>alert('Drug card is required and should be more than 1000.'); window.history.back();</script>`);
    }

    // nếu OK thì cho đi tiếp
    next();
}
module.exports = cardDrug;