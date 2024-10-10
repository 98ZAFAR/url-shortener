const express = require('express');
const {handleGenerateShortUrl, handleGetAnalitycs} = require('../controller/urlController');
const urlRoute = express.Router();


urlRoute.post("/", handleGenerateShortUrl);
urlRoute.get("/analytics/:shortId", handleGetAnalitycs);

module.exports = {
    urlRoute,
}