const express = require('express');
const routerFactory = require('./routerFactory');

const router = express.Router();

router.use("/fact", routerFactory("Facts"));
router.use("/fakect", routerFactory("Fakects"));

module.exports = router;