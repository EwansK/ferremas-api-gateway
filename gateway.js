// gateway.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Test route to verify Express is working
app.get('/test', (req, res) => {
  res.json({ message: 'API Gateway is working' });
});

// Proxy to Product Service
app.all('/api/products/*', (req, res) => {
  console.log('Proxying products request:', req.path);
  const productUrl = req.path.replace('/api/products', '/products');
  const targetUrl = `http://product-service:4001${productUrl}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
  
  fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(err => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  });
});

app.all('/api/products', (req, res) => {
  console.log('Proxying products request:', req.path);
  const targetUrl = `http://product-service:4001/products${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
  
  fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(err => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  });
});

app.listen(4000, '0.0.0.0', () => {
  console.log('API Gateway running on http://0.0.0.0:4000');
});
