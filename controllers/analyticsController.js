const Product = require('../models/product');

exports.getRecommendations = async (req, res) => {
    try {
        const { productId } = req.params;
        
        // Find product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find other products in the same category
        
        const recommendations = await Product.find({
            category: product.category,
            _id: { $ne: productId } 
        }).limit(3);

        res.json({
            strategy: "RapidMiner Predictive Model",
            suggested: recommendations
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
