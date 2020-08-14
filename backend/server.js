const express = require('express')
const data = require('./data');
const app = express();
app.use(express.static('public'));


app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(product => product.__id === Number(productId));
  product
    ? res.json(product)
    : res.status(404).json({message: "Product not found."});
})
app.get('/api/products', (req, res) => {
  res.json(data.products)
})


const port = 5000;
app.listen(5000, () => {
  console.log(`*** Server started at http://localhost:${port} ***`);
})