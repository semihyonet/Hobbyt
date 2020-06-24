const express = require("express");

const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');

router.get('/', requireAuth, (req, res) => {
    res.send(`Your username: ${req.user.username}`);
  });

module.exports = router