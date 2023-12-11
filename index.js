const express = require('express');
const app = express();
const ecommerceRoutes = require('./ecommerceRoutes');
const passwordStrengthRoutes = require('./passwordStrengthRoutes');

// Middleware and simulated database code...

// Use the router with a prefix
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/password', passwordStrengthRoutes);

// Error handling middleware...
const PORT = 3006; // Change this to a different port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://localhost:3006/api/password/check-password
// http://localhost:3005/api/products
// Middleware functions in Express follow a specific structure: (req, res, next) => { /* code */ } / / Global =  app.use() // Route Mw = app.get