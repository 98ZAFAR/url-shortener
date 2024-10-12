const jwt = require("jsonwebtoken");

const setUser = (user)=>{
    const payload = {
        _id:user._id,
        email:user.email,
        role:user.role
    };

    return jwt.sign(payload, process.env.SECRET_TOKEN);
};

const getUser = (token)=>{
    if(!token) return null;
    return jwt.verify(token, process.env.SECRET_TOKEN);
};

module.exports = {
    setUser,
    getUser,
}
