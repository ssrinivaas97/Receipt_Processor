const express = require('express');
const { processReceipt, getReceiptPoints , getAllReceipts} = require('../controllers/receiptController');

const router = express.Router();

router.post('/process', processReceipt);
router.get('/:id/points', getReceiptPoints);
router.get('/allReceipts', getAllReceipts);

module.exports = router;
