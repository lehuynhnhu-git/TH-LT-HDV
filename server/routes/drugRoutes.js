const express = require('express');
const router = express.Router();

const drugController = require('../controller/drugController');
// nếu cần, có thể dùng middleware validate số lượng purchase riêng

router.post('/drugs/:id/purchase', drugController.purchase);

module.exports = router;