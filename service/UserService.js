const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcryptjs');
const authMiddle = require('../AuthMidle');


module.exports = {
  async registerUser(email, password, role, name) {
    try {
      // Check if email already exists

      
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await UserRepository.createUser(email, hashedPassword, name, role);

      // Generate JWT token
      const token = await authMiddle.generateToken({ userId: newUser.userId, email: email, role: role });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async loginUser(email, password) {
    try {
      // Check if user exists
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // Generate JWT token
      const token = await authMiddle.generateToken({userId: user.userId, email: email, role: user.access});
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(email, newPassword, name) {
    try {
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await UserRepository.updateUserPassword(email, hashedPassword, name);
    } catch (error) {
      console.log("i am service", error);
      throw new Error(error.message);
    }
  },

  

};
