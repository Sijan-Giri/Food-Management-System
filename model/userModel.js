const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : ["true", "Email must be provided"]
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
        default : "customer"
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User