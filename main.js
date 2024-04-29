const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const sequelize = require('./client/sequelize'); // Correct import for Sequelize
const usersEntity = require('./entity/usersEntity');
require('dotenv').config();


// Middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send("Welcome"); // Combine status() and send() calls
});

app.use('/api/users', userRouter);


const port = process.env.PORT;

// Asynchronous function to authenticate Sequelize and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Synchronize models with the database (if needed)
     await sequelize.sync(); // Uncomment this line if you want to synchronize models with the database
     User = usersEntity;

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the function to start the server
startServer();
