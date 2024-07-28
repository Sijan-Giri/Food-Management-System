const User = require("../../../model/userModel");
const bcrypt = require("bcryptjs");

exports.getMyProfile = async(req,res) => {
    const userId = req.user.id;
    const myProfile = await User.findById(userId);
    res.status(200).json({
        message : "User fetched successfully",
        data : myProfile
    })
}

exports.updateMyProfile = async(req,res) => {
    const userId = req.user.id;
    const {userEmail , userName , userPhoneNum} = req.body;
    if(!userEmail || !userName || userPhoneNum) {
        return res.status(400).json({
            message : "Please provide userEmail , userName , userPhoneNum"
        })
    }
    const myUpdatedProfile = await User.findByIdAndUpdate(userId,{
        userEmail,
        userName,
        userPassword,
        userPhoneNum
    }); 
    res.status(200).json({
        message : "Profile updated successfully",
        data : myUpdatedProfile
    },{
        runValidators : true,
        new : true
    })
}

exports.deleteProfile = async (req,res) => {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
        message : "Profile deleted successfully"
    })
}

exports.updateMyPassword = async(req,res) => {
    const {oldPassword , newPassword , confirmPassword} = req.body;
    const userId = req.user.id;
    if(!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message : "Please provide oldPassword , newPassword , confirmPassword"
        })
    }
    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            message : "newPassword & confirmPassword doesn't matched"
        })
    }
    const userData = await User.findById(userId);
    const hashedOldPassword = userData.userPassword;

    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword,hashedOldPassword);
    if(!isOldPasswordCorrect) {
        return res.status(400).json({
            message : "Old password is not correct"
        })
    }

    userData.userPassword = bcrypt.hashSync(newPassword,10);
    await userData.save();
    res.status(200).json({
        message : "Password changed successfully"
    })
}