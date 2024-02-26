const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // If no token, return Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // If token is not valid or expired, return Forbidden
        }

        req.user = user; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
