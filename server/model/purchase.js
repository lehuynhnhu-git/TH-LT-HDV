const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, default: 0 }, // nếu có giá, không có thì giữ 0
    total: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);