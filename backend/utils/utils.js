const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = (user) => {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, config.JWT_SECRET, {
    expiresIn: '48h'
  });
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({message: 'Invalid Token'})
      }
      req.user = decode;
      next();
    });
  }
  res.status(401).send({message: 'Token is not supplied'})
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({message: 'Admin token is not valid'})
}

module.exports = {getToken, isAuth, isAdmin};