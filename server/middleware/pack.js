// middlewares/packDrug.js
function packDrug(req, res, next) {
    const { pack } = req.body;

    // kiểm tra pack
    if (!pack || pack <= 0) {
        return res.status(400).send(`<script>alert('Drug pack is required and should be more than 0.'); window.history.back();</script>`);
    }

    // nếu OK thì cho đi tiếp
    next();
}
module.exports = packDrug;