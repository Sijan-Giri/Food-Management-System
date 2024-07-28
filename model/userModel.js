const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : ["true", "Email must be provided"],
        unique : true,
        lowercase : true
    },
    userName : {
        type : String,
        unique : true
    },
    userPassword : {
        type : String,
        required : ["true","Password must be provided"]
    },
    userPhoneNum : {
        type : Number,
    },
    userRole : {
        type : String,
        enum : ["admin","customer"],
        default : "customer"
    },
    otp : {
        type : Number
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User