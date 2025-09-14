// middlewares/nameDrug.js
function nameDrug(req, res, next) {
    const { name } = req.body;

    // kiểm tra name
    if (!name || name.length <= 5) {
        return res.status(400).send(`<script>alert('Drug name is required and should be at least 5 characters.'); window.history.back();</script>`);
    }

    // nếu OK thì cho đi tiếp
    next();
}
module.exports = nameDrug;