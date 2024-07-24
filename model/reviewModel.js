const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    productId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Product"
    },
    rating : {
        type : Number,
        default : 3,
    },
    message : {
        type : String,
        required : true
    }
})

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review