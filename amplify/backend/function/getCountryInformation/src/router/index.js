const express = require('express');
const router = express.Router();
const { getCountryInformation } = require('../controller');

router.get('/getCountryInformation', getCountryInformation);

module.exports = router;
