const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contact.controller');

router.get('/', contactCtrl.getContact);
router.post('/message', contactCtrl.sendMessage);

module.exports = router;