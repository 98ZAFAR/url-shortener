const express = require('express');
const URL = require('../model/urlModel');
const router = express.Router();

router.get('/home', async(req, res)=>{
    const allURL = await URL.find({});
    return res.render('home', {
        urls:allURL
    });
});

module.exports = router;