const axios = require('axios');

module.exports = async function intercomAuth(req, res, next) {
  try {
    // Extract JWT token from header
    const token = req.headers.authorization.split(' ')[1];
    // Call Intercom service for authentication
    const response = await axios.post('https://intercom-service/authenticate', { token });
    if (response.data.success) {
      req.user = response.data.user;
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
