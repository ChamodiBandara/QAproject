require('dotenv').config();  // Load environment variables
const express = require('express'); // Express framework
const cors = require('cors'); // CORS middleware
const connectDB = require('./Config/db.js'); // MongoDB connection

// Import route files
const eventsRoute = require('./routes/events');
const adminRoute = require('./routes/admin'); // Keep if you still have admin routes

const app = express(); // Create Express app

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/events", eventsRoute); // Event CRUD routes
app.use("/api/admin", adminRoute);   // Admin routes (optional)

// Health check route
app.get('/', (req, res) => res.send('University Event Management API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
