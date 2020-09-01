const express = require('express');
const config = require('./utils/config');
const data = require('./data');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const User = require('./models/userModel');


const mongodbUrl = config.MONGODB_URL

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) =>
    console.log(`Error connecting mongoDB: ${error}`));

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use('/api/users', userRoute);

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


const port = process.env.PORT;
app.listen(5000, () => {
  console.log(`*** Server started on http://localhost:${port} ***`);
})