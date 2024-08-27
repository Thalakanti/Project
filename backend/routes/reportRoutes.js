const express = require('express');
const router = express.Router();
const reportingController = require('../controllers/reportController');

// Route to get total stock value
router.get('/reports/total-stock-value', reportingController.getTotalStockValue);

// Route to get most sold products
router.get('/reports/most-sold-products', reportingController.getMostSoldProducts);

// Route to get least sold products
router.get('/reports/least-sold-products', reportingController.getLeastSoldProducts);

module.exports = router;
