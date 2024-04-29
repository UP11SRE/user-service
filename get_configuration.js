const { execSync } = require('child_process');
execSync('npm install axios');
const axios = require('axios');

// Install npm dependencies
try {
  execSync('npm install');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}


// Configuration service API endpoint (replace with your actual URL)
const CONFIG_API_URL = "https://centralized-management.onrender.com/api/v1/configuration";

// Environment (dev, test, prod)
const ENVIRONMENT = "dev";

// Service name
const SERVICE_NAME = "user";

// Error handling function
const error_exit = (message) => {
  console.error("Error:", message);
  process.exit(1);
};

// Get configuration from API
axios.post(CONFIG_API_URL, { environment: ENVIRONMENT, service: SERVICE_NAME })
  .then(response => {
    
    const configuration = response.data;

    // Check if configuration is empty
    if (!configuration) {
      error_exit(`Failed to parse configuration for service: ${SERVICE_NAME}`);
    }
  
    // Export configuration to environment variables (adjust variable names as needed)
    process.env.DB_PASSWORD = configuration.DB_PASSWORD;
    process.env.DB_URL = configuration.DB_URL;
    process.env.PORT = configuration.PORT;
    process.env.DB_NAME = configuration.DB_NAME;
    process.env.DB_HOST = configuration.DB_HOST;
    process.env.JWT_SECRET = configuration.JWT_SECRET;

    console.log(`Configuration retrieved for environment: ${ENVIRONMENT}, service: ${SERVICE_NAME}`);

    // Start your microservice process (replace with your actual command)
    require('./main.js');
  })
  .catch(error => {
    error_exit(`Failed to retrieve configuration from API: ${error.message}`);
  });
