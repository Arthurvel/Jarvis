const express = require('express');
const SqlMap = require('../models/sqlMap.Model.js')
const router = express.Router();
const {getSqlMaps, getSqlMap, createSqlMap, } = require('../controllers/sqlMap.Controller.js');

router.get('/',getSqlMaps);
router.get('/:id', getSqlMap);
router.post('/', createSqlMap);

module.exports = router;

