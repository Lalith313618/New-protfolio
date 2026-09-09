const express = require('express');
const router = express.Router();
const experienceCtrl = require('../controllers/experience.controller');

router.get('/', experienceCtrl.getExperience);

module.exports = router;