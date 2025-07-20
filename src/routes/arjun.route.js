const express = require('express');
const SqlMap = require('../models/arjun.model.js')
const router = express.Router();
const {getArjuns, getArjun, createArjun, } = require('../controllers/arjun.controller.js');

router.get('/',getArjuns);
router.get('/:id', getArjun);
router.post('/', createArjun);

module.exports = router;

