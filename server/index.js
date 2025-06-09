import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import propertyRoutes from './routes/properties.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pg-management')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('PG Management API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});