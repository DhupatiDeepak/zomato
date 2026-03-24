import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Enhanced Production Security/CORS
const corsOptions = {
    origin: true, // Allow all origins for now, or specify production domain
    credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP if it interferes with external images/scripts, or configure properly
}));

// Rate Limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

import path from 'path';
const __dirname = path.resolve();

// Static Folder for Uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        const uri = process.env.MONGO_URI || '';
        console.log('Using URI:', uri.includes('@') ? '***@' + uri.split('@')[1] : uri);
    })
    .catch((err) => {
        console.log('MongoDB Connection Error:', err.message);
        console.log('Attempted URI:', process.env.MONGO_URI);
    });

// Razorpay config route
app.get('/api/config/razorpay', (req, res) => {
    res.send(process.env.RAZORPAY_KEY_ID);
});

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
