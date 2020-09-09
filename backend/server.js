const express = require('express');
const config = require('./utils/config');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');


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
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)


const port = process.env.PORT;
app.listen(5000, () => {
  console.log(`*** Server started on http://localhost:${port} ***`);
})