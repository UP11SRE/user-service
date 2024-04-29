const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const authMiddle = require('../AuthMidle');

router.use(express.urlencoded({ extended: true }));

// Routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.put('/update', authMiddle.authenticateToken, UserController.updateUser);

module.exports = router;
