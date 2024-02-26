const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// User registration endpoint
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const newUser = await pool.query(
      "INSERT INTO users (username, email, passwordhash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error during user registration.");
  }
});


// User login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].passwordhash);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Assuming you have an ACCESS_TOKEN_SECRET environment variable for JWT
    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error during login.");
  }
});

module.exports = router;
