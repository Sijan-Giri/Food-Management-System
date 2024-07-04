const express = require('express');
const { connectDatabase } = require('./database/database');
const User = require('./model/userModel');
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDatabase();

app.post("/register" ,async (req,res) => {
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
});

app.post("/login",async (req,res) => {
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
    
})

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`);
})