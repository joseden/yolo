const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Database configuration
const dbName = 'yolo'; // Match docker-compose database name


const mongoUri = process.env.MONGO_URI || 'mongodb://admin:secret@localhost:27017/yolo?authSource=admin';

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

let db = mongoose.connection;

// Check for DB Errors
db.on('error', (error) => {
    console.error('Database error:', error);
});

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());

// File upload middleware
app.use(upload.array()); 

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', database: db.readyState === 1 ? 'Connected' : 'Disconnected' });
});

// API Routes
app.use('/api/products', productRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});