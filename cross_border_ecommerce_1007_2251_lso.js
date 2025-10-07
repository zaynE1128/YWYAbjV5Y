// 代码生成时间: 2025-10-07 22:51:46
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware for CORS
app.use(cors());
// Middleware for parsing JSON body
app.use(express.json());

// Mock database for products
const products = [
  { id: 1, name: 'Product A', price: 100, currency: 'USD' },
  { id: 2, name: 'Product B', price: 200, currency: 'EUR' },
  // ... other products
];

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Route to get all products
app.get('/products', (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Route to get a single product
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id.toString() === id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route to add a new product
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    currency: req.body.currency
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Route to update an existing product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id.toString() === id);
  if (productIndex > -1) {
    products[productIndex] = {
      id: parseInt(id),
      name: req.body.name,
      price: req.body.price,
      currency: req.body.currency
    };
    res.status(200).json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route to delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id.toString() === id);
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Cross-border e-commerce server listening at http://localhost:${port}`);
});
