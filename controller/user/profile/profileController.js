const User = require("../../../model/userModel");


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