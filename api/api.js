var express = require('express');
var router = express.Router();
var chatbot = require('./chatbot');

router.use('/chatbot', chatbot);

module.exports = router;