const express = require('express');
const path  = require('path');
const {dotenv} = require('dotenv').config();
const app = express();
const {connectDB} = require('./dbConnection');
const {urlRoute} = require('./routes/urlRoute');
const staticRoute = require('./routes/staticRoute');
const URL = require('./model/urlModel');
const port = process.env.PORT||3000;

connectDB('mongodb://localhost:27017/url-shortener').then(()=>console.log("MongoDB connected..."));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use('/', staticRoute);

app.use('/url', urlRoute);
app.get('/url/:shortID', async(req, res)=>{
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push :{
            visitedHistory : {
                timestamp:Date.now(),
            },
        },
    });

    res.redirect(entry.redirectURL);
});

app.listen(port , ()=>{
    console.log("Server is running on port "+port);
});