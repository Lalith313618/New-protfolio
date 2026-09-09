const express = require('express');
const router = express.Router();
const educationCtrl = require('../controllers/education.controller');

router.get('/', educationCtrl.getEducation);

module.exports = router;