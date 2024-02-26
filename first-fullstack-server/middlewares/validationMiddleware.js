const { body, validationResult } = require('express-validator');

// Validation for User Registration
exports.userValidationRules = () => {
  return [
    // username must be an email
    body('email', 'Invalid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    // Optional: Add more validations as needed
  ];
};

// Validation for Creating a Post
exports.postValidationRules = () => {
  return [
    // title must not be empty
    body('title', 'Title is required').not().isEmpty(),
    // content must not be empty
    body('content', 'Content is required').not().isEmpty(),
    // Optional: Add more validations as needed
  ];
};

// Middleware for checking the result of validation
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
