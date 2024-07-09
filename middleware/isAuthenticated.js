const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");

const isAuthenticated = async (req,res,next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(400).json({
            message : "Please login"
        })
    }
   try {
    const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY);
   if(!decoded) {
    res.status(200).json({
        message : "Don't try to do this"
    })
   }
   const doesUserExists = await User.findById(decoded.id);
   if(doesUserExists.length == 0) {
    res.status(400).json({
        message : "User Doesnot exists"
    })
   }
   req.user = doesUserExists
   
    next();
   } catch (error) {
    res.status(400).json({
        message : error.message
    })
   }
}

module.exports = isAuthenticated;