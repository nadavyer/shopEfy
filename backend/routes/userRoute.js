const User = require('../models/userModel');
const {getToken} = require('../utils/utils');
const router = require('express').Router();


router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  const newUser = await user.save()

  if (newUser) {
    res.send({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({message: 'Invalid user data'});
  }
})
router.post('/signin', async (req, res) => {
  const user = req.body;
  const SigninUser = await User.findOne({
    email: user.email,
    password: user.password
  })

  if (SigninUser) {
    res.send({
      id: SigninUser.id,
      name: SigninUser.name,
      email: SigninUser.email,
      isAdmin: SigninUser.isAdmin,
      token: getToken(SigninUser)
    })
  } else {
    res.status(401).send({message: 'Invalid email or password'});
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    });
  } else {
    res.status(404).send({msg: 'User Not Found'});
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

