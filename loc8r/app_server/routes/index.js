const express = require('express');
const router = express.Router();
const CtrlMain = require('../controllers/main');

/* Get homepage */
router.get('/', CtrlMain.index);

module.exports = router;           