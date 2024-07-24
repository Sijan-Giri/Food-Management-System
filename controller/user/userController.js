const Product = require("../../model/productModel");
const Review = require("../../model/reviewModel");

exports.createReview = async (req,res) => {
    const userId = req.user.id;
    const {rating , message} = req.body;
    const productId = req.params.id;
    if(!rating || !message || !productId) {
        return res.status(400).json({
            message : "Please provide rating , message & productId"
        })
    };
    const productExists = await Product.findById(productId);
    if(!productExists) {
        return res.status(400).json({
            message : "Product with this id doesnot exists"
        })
    }
    await Review.create({
        userId,
        rating,
        message,
        productId
    })
    res.status(200).json({
        message : "Product added successfully"
    })
}

exports.getReview = async (req,res) => {
    const productId = req.params.id;
    if(!productId) {
        return res.status(400).json({
            message : "Please provide product id"
        })
    }
    const productExists = await Product.findById(productId);
    if(!productExists) {
        return res.status(400).json({
            message : "Product with this id doesnot exists"
        })
    }
    const reviews = await Review.find({productId})
    res.status(400).json({
        message : "Reviews fetched successfully",
        data : reviews
    })
}

exports.deleteReview = async (req,res) => {
    const productId = req.params.id;
    if(!productId) {
        return res.status(400).json({
            message : "Please provide product id"
        })
    }
    const productExists = await Product.findById(productId);
    if(!productExists) {
        return res.status(200).json({
            message : "Product with this id doesnot exists"
        })
    }
    await Review.findByIdAndDelete(productId);
    res.status(200).json({
        message : "Product Review deleted successfully"
    })
}