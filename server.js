const express = require('express');
const app = express();
const path = require('path');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const users = [
  {
    id: 1,
    first_name: 'Emelyne',
    last_name: 'Bannister',
    email: 'ebannister0@youtube.com',
    gender: 'Female',
  },
];

app.use(express.static(path.join(__dirname, './client/build')));

app.get('/api/products', getProducts);
app.get('/api/users', (req, res) => {
  res.json(users);
});
app.get('/api/products/:id', getProduct);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
