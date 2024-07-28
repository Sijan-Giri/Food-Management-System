
const Review = require("../../../model/nextReviewModel");
const Product = require("../../../model/productModel");


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
        message
    })
    res.status(200).json({
        message : "Product added successfully"
    })
}

exports.getReview = async (req,res) => {
    try {
        
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
    const reviews = await Review.find({productId}).populate("userId")
    if(!reviews) {
        return res.status(400).json({
            message : "You haven't gave any reviews yet",
            data : []
        })
    }else {
        return res.status(400).json({
            message : "Reviews fetched successfully",
            data : reviews
        })
    }
    } catch (error) {
        next(error)
    }
}

exports.getMyReviews = async(req,res) => {
    const userId = req.user.id;
    const reviews = await Review.find({userId});
    if(reviews.length == 0) {
        res.status(400).json({
            message : "You haven't given any reviews yet"
        })
    }else {
        res.status(200).json({
            message : "Reviews fetched successfully",
            reviews
        })
    }
}

exports.deleteReview = async (req,res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const review = await Review.findById(reviewId);
    const ownerIdOfReview = review.userId;
    if(ownerIdOfReview !== userId) {
        return res.status(400).json({
            message : "You don't have permission to delete this review"
        })
    }
    if(!reviewId) {
        return res.status(400).json({
            message : "Please provide review id"
        })
    }
    const reviewExists = await Product.findById(reviewId);
    if(!reviewExists) {
        return res.status(200).json({
            message : "Product with this id doesnot exists"
        })
    }
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({
        message : "Product Review deleted successfully"
    })
}

exports.editReview = async(req,res) => {
    const userId = req.user.id;
    const reviewId = req.params.id;
    const {rating , message} = req.body;
    if(!reviewId || !rating || !message) {
        res.status(400).json({
            message : "Please provide reviewId , rating , message"
        })
    }
    const productExists = await Product.findById(reviewId);
    if(!productExists) {
        res.status(400).json({
            message : "Review with this id doesn't exists"
        })
    }

    if(reviewId !== userId) {
        return res.status(400).json({
            message : "You don't have permission to update this review"
        })
    }
    const review = await Review.findByIdAndUpdate({
        userId,
        rating,
        message
    })
    res.status(200).json({
        message : "Review updated successfully",
        data : review
    })
}