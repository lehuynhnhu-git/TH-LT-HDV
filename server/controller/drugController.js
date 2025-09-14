const Purchase = require('../models/purchase');
const mongoose = require('mongoose');

exports.purchase = async(req, res, next) => {
    const { id } = req.params;
    const qty = parseInt(req.body.quantity, 10);

    if (!Number.isFinite(qty) || qty <= 0) {
        const err = new Error('Quantity must be a positive integer.');
        err.status = 400;
        throw err; // đẩy lên error handler
    }

    // Dùng transaction để tránh race condition khi nhiều người mua cùng lúc
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async() => {
            const drug = await Drug.findById(id).session(session);
            if (!drug) {
                const e = new Error('Drug not found');
                e.status = 404;
                throw e;
            }

            if (drug.pack < qty) {
                const e = new Error(`Insufficient stock. Available: ${drug.pack}`);
                e.status = 400;
                throw e;
            }

            // Nếu có giá: giả sử drug.price; nếu chưa có, giữ 0
            const unitPrice = drug.price || 0;
            const total = unitPrice * qty;

            // Trừ tồn
            drug.pack -= qty;
            await drug.save({ session });

            // Lưu bản ghi purchase
            await Purchase.create(
                [{ drug: drug._id, quantity: qty, unitPrice, total }], { session }
            );
        });

        // Thành công → điều hướng về trang chi tiết hoặc danh sách
        return res.redirect(`/drugs/${req.params.id}?purchased=1`);
    } catch (err) {
        // ném lỗi cho error handler hiển thị trang error
        throw err;
    } finally {
        session.endSession();
    }
};