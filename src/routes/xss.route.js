const express = require('express');
const Xss = require('../models/xss.model.js')
const router = express.Router();
const {getXss, getXsss, createXss, } = require('../controllers/xss.controller.js');

router.get('/',getXsss);
router.get('/:id', getXss);
router.post('/', createXss);

module.exports = router;

