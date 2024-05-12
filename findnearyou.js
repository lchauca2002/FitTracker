require('dotenv').config();
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;


router.get('/', (req, res) => {
    res.render('Map/findnearyou', { mapBoxToken });
});

module.exports = router;
