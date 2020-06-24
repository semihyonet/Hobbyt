const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
//This middleware checks the JSONToken send as the Authorization. It strips the Bearer and decrypts the token with the 'SECRET_KEY' 
module.exports = (req, res, next) => {
  console.log(TOKEN_KEY)

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'Please log in...' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, TOKEN_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'Please log in...' });
    }
    console.log(payload)
    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
