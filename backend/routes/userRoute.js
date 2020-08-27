const express = require('express');
const User = require('../models/userModel')

const router = express.Router();
router.post('/signin', async (req, res) => {
  const user = req.body;
  const signinUser = await User.findOne({
    email: user.email,
    password: user.password
  })

  if (signinUser) {
    res.send({
      __id: signinUser.id,
      name:signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })
  }
  else {
    res.status(401).send({message: 'Invalid email or password'});
  }
})
router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Nadav',
      email: 'nadavyerushalmi@gmail.com',
      password: '1234',
      isAdmin: true
    })

    const newUser = await user.save();
    res.send(newUser.toJSON());
  } catch (e) {
    res.send({message: e.message});
  }
})

module.exports = router;

