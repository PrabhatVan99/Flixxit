const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const paymentRoutes = require('./routes/paymentRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Body parser middleware for JSON
app.use(express.urlencoded({ extended: true })); // Body parser middleware for URL encoded data

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5001', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
}));


// API routes
app.use('/api/users', userRoutes);

// Serve static assets
app.use(express.static(path.join(__dirname, '../frontend/src')));

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src', 'index.html'));
});

app.use('/api/payment', paymentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
