const router = require('express').Router();
const Order = require('../models/orderModel');
const {isAuth} = require('../utils/utils');


router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    }
    else {
      res.status(404).send('Order not found');
    }
  }
  catch (e) {
    res.status(400).send({message: 'Error getting order'})
  }
});

router.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user.id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  const newOrderCreated = await newOrder.save();
  res.status(201).send({
    message: 'New Order Created',
    data: newOrderCreated
  })
});

module.exports = router;
