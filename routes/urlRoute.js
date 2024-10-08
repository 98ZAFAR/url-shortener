const express = require('express');
const {handleGenerateShortUrl} = require('../controller/urlController');
const urlRoute = express.Router();


urlRoute.post("/", handleGenerateShortUrl);

module.exports = {
    urlRoute,
}