const User = require("../../model/userModel")

exports.getUsers = async (req,res) => {
    const users = await User.find();
    if(users.length == 0) {
        res.status(400).json({
            message : "Users are empty",
            data : []
        })
    }
    else {
        res.status(200).json({
            message : "Users fetched successfully",
            data : users
        })
    }
}