const User = require('../model/userModel');
const { setUser } = require('../services/auth');

const handleSignup = async (req, res)=>{
    const {name, email, password} = req.body;
    if(!name||!email||!password) return res.redirect('/signup');
    const user = await User.findOne({email:email});
    if(user) return res.redirect('/signup');

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect('/login');
};

const handleLogin = async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(!user||user.password!=password) return res.redirect('/login');

    const token = setUser(user);
    
    res.cookie("token", token);
    return res.redirect('/home');
};

module.exports = {handleSignup, handleLogin};