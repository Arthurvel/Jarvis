const express = require('express');
const sqlmap = require('../models/sqlmap.model.js');
const router = express.Router();
const {getSqlMap} = require('../controllers/sqlmap.controller.js');
const fs = require('fs');

router.get('/',getSqlMap);

module.exports = router;

