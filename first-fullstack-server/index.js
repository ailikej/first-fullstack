require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Add this line
const authRoutes = require('./routes/authRoutes'); // Adjust the path based on your project structure
const postRoutes = require('./routes/postRoutes'); // Ensure this path matches your file structure


const app = express();

// This will allow all origins
app.use(cors());

const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the auth routes with a base path of /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Now postRoutes is defined

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
