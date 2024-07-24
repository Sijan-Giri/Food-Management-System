const User = require("../../../model/userModel")

exports.getUsers = async (req,res) => {
    const userId = req.user.id;
    const users = await User.find({_id : {$ne : userId}}).select(["-otp","-role","-password","-__v"]);
    if(users.length == 0) {
        res.status(400).json({
            message : "No users found",
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

exports.deleteUser = async (req,res) => {
    const userId = req.params.id;
    if(!userId) {
        return res.status(400).json({
            message : "Please provide user Id"
        })
    }
    const user = await User.findById(userId);
    if(!user) {
        res.status(400).json({
            message : "User not found with that userId"
        })
    }
    else {
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            message : "User deleted successfully"
        })
    }
}