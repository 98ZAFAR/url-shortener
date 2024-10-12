const express = require('express');
const URL = require('../model/urlModel');
const { restrictTo } = require('../middleware/authorize');
const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async(req, res)=>{
    const allURL = await URL.find({});
    return res.render('home', {
        urls:allURL
    });
});

router.get('/home', restrictTo(['NORMAL', 'ADMIN']),async(req, res)=>{
    const allURL = await URL.find({createdBy:req.user._id});
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