const User = require("./model/userModel");
const bcrypt = require("bcryptjs");


const adminSeeder = async () => {
    const isExist = await User.find({userEmail : "admin@gmail.com"});

    if(isExist.length == 0) {
        await User.create({
            userEmail : "admin@gmail.com",
            userPassword : bcrypt.hashSync("admin",10),
            userName : "admin1",
            userPhoneNum : "9865373523",
            userRole : "admin"
        })
        console.log("Admin seeded successfully");
    }
    else {
        console.log("Admin is already seeded");
    }
}

module.exports = adminSeeder;