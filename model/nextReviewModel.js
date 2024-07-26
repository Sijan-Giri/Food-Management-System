const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
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

const nextWayReview = mongoose.model("nextWayReview",reviewSchema);
module.exports = {
    nextWayReview,
    reviewSchema
}