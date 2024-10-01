const User = require("./model/userModel");
const bcrypt = require("bcryptjs");

const adminSeeder = async () => {
    try {
        const isExist = await User.findOne({ userEmail: "admin@gmail.com" });

        if (!isExist) {
            await User.create({
                userEmail: "admin@gmail.com",
                userPassword: bcrypt.hashSync("admin", 10), 
                userName: "admin1",
                userPhoneNum: "9865373523",
                userRole: "admin"
            });
            console.log("Admin seeded successfully");
        } else {
            console.log("Admin is already seeded");
        }
    } catch (error) {
        console.log("Error occurred while seeding admin:", error);
    }
}

module.exports = adminSeeder;
