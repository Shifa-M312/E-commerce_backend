const Product = require('../models/product');

//  Create a Product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//  Get All Products 
exports.getProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;
        let query = {};

        
        if (search) query.name = { $regex: search, $options: 'i' };
        
        
        if (category) query.category = category;

        let result = Product.find(query);

       
        if (sort) result = result.sort(sort);

        const products = await result;
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
