const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; 

module.exports = {
  async generateToken(payload) {
    try {
      const token = jwt.sign({ payload }, secretKey, { expiresIn: '24h' });
      return token;
    } catch (error) {
      throw new Error('Failed to generate token');
    }
  },

  async authenticateToken(req, res, next) {
    try {
        // Gather the jwt access token from the request header
        const auth = req.headers.authorization && req.headers.authorization.split(" ");
        console.log("---token", auth[1], secretKey);

        if (!auth || !auth[1]) {
            return res.status(401).json({ message: 'Authentication token is required' });
        }

        // Verify the token
        const decoded = jwt.verify(auth[1], secretKey);
        console.log("decoded sucessful", decoded);

        // If token is valid, save decoded token to request object for later use
        req.user = decoded;
        next(); // Pass the request to the next middleware
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

};
