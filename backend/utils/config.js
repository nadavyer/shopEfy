require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'somesecretthingie';

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET
}