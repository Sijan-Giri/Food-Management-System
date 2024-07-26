const mongoose = require("mongoose");
const { reviewSchema } = require("./nextReviewModel");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName : {
        type : String,
        required : [true,"Product name must be given"]
    },
    productDescription : {
        type : String,
        required : [true,"Product description must be given"]
    },
    productPrice : {
        type : Number,
        required : [true,"Product price must be given"]
    },
    productStatus : {
        type : String,
    },
    productQuantity : {
        type : Number,
        required : [true,"Product quantity must be given"]
    },
    productImage : {
        type : String,
    },
    reviews : [reviewSchema]
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;