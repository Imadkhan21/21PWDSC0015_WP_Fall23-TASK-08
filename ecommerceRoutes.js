const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3005;
const bcrypt = require('bcrypt');
  
// Middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const isLoggedIn = true; // Simulated authentication
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);

// Simulated Database (In reality, use a database like MongoDB)
const products = [
  { id: 1, name: 'Product 1', price: 25 },
  { id: 2, name: 'Product 2', price: 30 },
  { id: 3, name: 'Product 3', price: 40 }
];

// Routes
router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/cart/add/:productId', authenticateUser, (req, res) => {
  const productId = parseInt(req.params.productId);
  const selectedProduct = products.find(product => product.id === productId);
  if (selectedProduct) {
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simulated login logic (In reality, validate user credentials)
  if (username === 'user' && bcrypt.compareSync(password, hashedPasswordFromDatabase)) {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

// Use the router with a prefix
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Simulated user data (for testing purposes)
const users = [
    {
      username: 'user',
      // Hashed password for "password123"
      passwordHash: 'Imadkhan123@',
    },
  ];

module.exports = router;