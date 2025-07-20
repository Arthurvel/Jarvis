const express = require('express');
const Dir = require('../models/dir.model.js')
const router = express.Router();
const {getDirs, getDir, createDir, } = require('../controllers/dir.controller.js');

router.get('/',getDirs);
router.get('/:id', getDir);
router.post('/', createDir);

module.exports = router;

