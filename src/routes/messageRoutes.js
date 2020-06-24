const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Message = mongoose.model('Message');

const router = express.Router();

router.use(requireAuth);

router.get('/messages', async (req, res) => {
  const messages = await Message.find({});

  res.send(messages);
});

router.post('/messages', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res
      .status(422)
      .send({ error: 'You must provide Content' });
  }

  try {
    const aMessage = new Message({senderId: req.user._id, senderName:req.user.username, content:content});
    await aMessage.save();
    res.send(aMessage);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;