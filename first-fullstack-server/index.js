const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Adjust the path based on your project structure

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the auth routes with a base path of /api/auth
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
