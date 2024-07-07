const mongoose = require("mongoose");
const User = require("../model/userModel");

exports.connectDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");

    const isExist = await User.find({userEmail : "admin@gmail.com"});

    if(isExist.length == 0) {
        
        await User.create({
            userEmail : "admin@gmail.com",
            userPassword : "admin123",
            userName : "admin1",
            userPhoneNum : "9865373523",
            userRole : "admin"
        })
        console.log("User seeded successfully");
    }
    else {
        console.log("User is already seeded");
    }
}