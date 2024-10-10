const express = require('express');
const URL = require('../model/urlModel');
const router = express.Router();

router.get('/home', async(req, res)=>{
    const allURL = await URL.find({});
    return res.render('home', {
        urls:allURL
    });
});

router.get('/signup', async(req, res)=>{
    return res.render('signup');
});

router.get('/login', async(req, res)=>{
    return res.render('login');
});
module.exports = router;