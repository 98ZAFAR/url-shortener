const { getUser } = require("../services/auth");

const checkForAuthentication = async(req, res, next)=>{
    req.user = null;
    const token = req.cookies?.token;
    if(!token) return next();
    const user = getUser(token);

    req.user = user;
    next();
};

const restrictTo = (roles = [])=>{
    return function(req, res, next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end('Unauthorized');

        return next();
    };
};

module.exports = {checkForAuthentication, restrictTo};