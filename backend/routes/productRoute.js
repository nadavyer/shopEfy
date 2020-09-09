const Product = require('../models/productModel');
const {isAuth} = require('../utils/utils');
const {isAdmin} = require('../utils/utils');
const router = require('express').Router();


router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  product
    ? res.json(product)
    : res.status(404).json({message: "Product not found."});
});

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(productId, productData, {new: true});


  if (updatedProduct) {
    return res.status(200).send({message: 'Product updated', data: updatedProduct});
  }
  res.status(500).send({message: 'Error updating product'})
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({message: 'New product created', data: newProduct});
  }
  res.status(500).send({message: 'Error creating product'})
});


router.delete('/:id',isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findById(productId);
  if (deletedProduct) {
    try {
      await deletedProduct.remove();
      res.status(200).send({message: 'Product deleted'});
    }
    catch (e) {
      res.status(400).send({error: 'Error delete product'});
    }
  }
  else {
    res.status(400).send({error: 'Error delete product'});
  }
});

module.exports = router;

