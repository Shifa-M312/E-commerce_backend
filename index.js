const analyticsRoutes = require('./routes/analyticsRoutes');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConnection'); 
const authRoutes = require('./routes/authenticationRoutes');
const productRoutes = require('./routes/productRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
connectDB();

// --- MIDDLEWARE 
app.use(cors()); 
app.use(express.json()); 

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);

// --- TEST ROUTE ---
app.get('/', (req, res) => {
    res.send("🚀 Backend server is running successfully!");
});

// --- ERROR HANDLING ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is alive at http://localhost:${PORT}`);
});
