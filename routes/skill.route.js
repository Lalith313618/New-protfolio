const express = require('express');
const router = express.Router();
const skillCtrl = require('../controllers/skill.controller');

router.get('/', skillCtrl.getSkills);

module.exports = router;