const express = require('express');
const app = express();
const {dotenv} = require('dotenv').config();
const path  = require('path');

const cookieParser = require('cookie-parser');
const {connectDB} = require('./dbConnection');

const {urlRoute} = require('./routes/urlRoute');
const userRoute = require('./routes/userRoute');
const staticRoute = require('./routes/staticRoute');

const URL = require('./model/urlModel');
const {checkForAuthentication, restrictTo} = require('./middleware/authorize');

const port = process.env.PORT||3000;

connectDB('mongodb://localhost:27017/url-shortener').then(()=>console.log("MongoDB connected..."));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use('/', staticRoute);
app.use('/user', userRoute);
app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute);

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