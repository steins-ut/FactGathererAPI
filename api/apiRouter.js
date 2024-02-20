const express = require('express');
const v0Router = require('./v0/v0Router');

const router = express.Router();

router.use('/v0', v0Router);

module.exports = router;

