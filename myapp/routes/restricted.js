const express = require('express');
const router = express.Router();
const chatModel = require('../database/models/chat.model');

router.get('/', function(req, res) {
  const chatHistory = chatModel.getHistory();
  res.render('restricted', { user: req.session.user, chatHistory });
});

module.exports = router;