const User = require("../../model/userModel");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req,res) => {
    const {email,password,phoneNum,username} = req.body;
    if(!email || !password || !phoneNum || !username ) {
        return res.status(400).json({
            message : "Please provide email, password , username & phoneNum"
        })
    }

    const userFound = await User.find({userEmail : email});
    if(userFound.length > 0) {
       return res.status(400).json({
            message : "User with that email already exists"
        })
    }
    await User.create({
        userEmail : email,
        userPassword : bcrypt.hashSync(password,10),
        userPhoneNum : phoneNum,
        userName : username
    })
    res.status(200).json({
        message : "User registered successfully",
    })
}

exports.loginUser = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message : "Please provide email & password"
        })
    }
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0) {
        return res.status(400).json({
            message : "Please register with this email"
        })
    }
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
    })
    if(isMatched) {
        res.status(200).json({
            message : "You are logged in successfully",
            token : token
        })
    }
    else {
        res.status(400).json({
            message : "Invalid password"
        })
    }
    await User.create({
        userEmail : email,
        userPassword : password,
    })
    
}

exports.forgetPassword = async (req,res) => {
    const {email} = req.body;
    if(!email) {
        return res.status(400).json({
            message : "Please provide an email"
        })
    }
    const emailExits = await User.find({userEmail : email});
    if(emailExits.length == 0) {
        return res.status(400).json({
            message : "You are not registered with this email"
        })
    }
    const otp = Math.floor(Math.random() * 9000);
    emailExits[0].otp = otp;
    await emailExits[0].save();
    await sendEmail({
        email : email,
        subject : "Your OTP for forgot password",
        message : `${otp}`
    })
    res.status(200).json({
        message : "OTP sent successfully"
    })
}

exports.verifyOtp = async(req,res) => {
    const {email,otp} = req.body;
    if(!email || !otp) {
        return res.status(400).json({
            message : "Please provide email & OTP"
        })
    }
    const userExists = await User.find({userEmail : email});
    if(!userExists || userExists.length == 0) {
        return res.status(400).json({
            message : "You are not registered with this email"
        })
    }
    if(userExists[0].otp !== otp) {
        res.status(400).json({
            message : "Incorrect OTP"
        })
    }
    else {
        userExists[0].otp = undefined
        await userExists[0].save();
        res.status(200).json({
            message : "Correct OTP"
        })
    }
}

exports.resetPassword = async (req,res) => {
    const {email  , newPassword , confirmPassword} = req.body;
    if(!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message : "Please provide email , newPassword , confirmPassword"
        })
    }
    const userExists = await User.find({userEmail : email});
    if(userExists.length == 0){
        return res.status(400).json({
            message : "You are not registered with this email"
        })
    }
    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            message : "newPassword & confirmPassword doesn't matched"
        })
    }
    userExists[0].userPassword = bcrypt.hashSync(newPassword,10);
    await userExists[0].save();
    res.status(200).json({
        message : "Password reset successfully"
    })
}

