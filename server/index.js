const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load products
const productsPath = path.join(__dirname, 'products.json');
let products = [];

try {
  const data = fs.readFileSync(productsPath, 'utf8');
  products = JSON.parse(data);
  console.log(`Loaded ${products.length} products.`);
} catch (err) {
  console.error('Error loading products.json:', err);
}

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Mock Auth Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Simple mock validation
  if (email && email.includes('@')) {
    res.json({
      success: true,
      user: {
        id: 'user_123',
        name: 'דנה כהן',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});