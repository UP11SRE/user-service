const UserService = require('../service/UserService');
const intercomAuth = require('../intercomAuth');


module.exports = {
  async registerUser(req, res) {
    try {
      console.log("i got the call from api gateway");
      const { email, password,  role, name } = req.body;
      const token = await UserService.registerUser(email, password, role, name);
      res.json({ message: 'User created', token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
        const { password, name } = req.body;
        const email = req.user.payload.email;


        await UserService.updateUser(email, password, name);
        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ message: error.message });
    }
}


};
