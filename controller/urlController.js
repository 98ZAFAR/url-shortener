const URL = require('../model/urlModel');
const shortid = require('shortid');

const handleGenerateShortUrl = async(req, res) =>{
    const body = req.body;
    const shortID = shortid();
    if(!body.url){
       return res.status(400).json({message:'URL is required!'});
    }
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistory:[]
    });

    return res.status(201).render('home',{
        shortURL:shortID
    });
};

const handleGetAnalitycs = async(req, res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitedHistory.length, analitycs:result.visitedHistory});
};

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalitycs,
}