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

    return res.status(201).json({shortURL:shortID});
};

const handleRedirectShortUrl = async(req, res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
    {
        shortID,
    },
    {
        $push :{
            visitedHistory : {
                timestamp:Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
};

module.exports = {
    handleGenerateShortUrl,
    handleRedirectShortUrl,
}