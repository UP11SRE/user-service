const usersEntity  = require('../entity/usersEntity'); // Assuming the User model is defined here


module.exports = {
    async findByEmail(email) {
        try {
          const user = await usersEntity.findOne({ where: { email } });
          return user;
        } catch (error) {
            console.log("error", error.message);
          throw new Error(error.message);
        }
      },

  async createUser(email, password, name, role) {
    try {
      const newUser = await User.create({ email, password, name, access : role });
      console.log("new user created sucessfully",newUser);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUserPassword(email, newPassword, name) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        user.password = newPassword;
        if(name){
        user.name = name;
        }
        await user.save();
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log("---i am error", error.message);
      throw new Error(error.message);
    }
  },

 
};
