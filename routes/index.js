const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/teams', require('./teams'));

module.exports = router;
