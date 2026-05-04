const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Search 
router.get('/', getProducts);

//  Create a Product 
router.post('/', protect, createProduct);

module.exports = router;
