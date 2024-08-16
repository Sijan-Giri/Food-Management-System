const Review = require("../../model/nextReviewModel")
const Product = require("../../model/productModel")

exports.getProducts = async (req,res) => {
    const products = await Product.find()
    if(products.length == 0) {
        res.status(400).json({
            message : "Products not found",
            data : []
        })
    }
    else {
        res.status(200).json({
            message : "Products fetched successfully",
            data : products
        })
    }
}

exports.getProduct = async (req,res) => {
    const {id} = req.params
    if(!id) {
        return res.status(400).json({
            message : "Please provide Id"
        })
    }
    const product = await Product.findById(id);
    const productReview = await Review.find({productId : id}).populate("userId").populate("productId");
    if(product.length == 0) {
        res.status(400).json({
            message : "Product not found",
            product : [],
            productReview : []
        })
    }
    else {
        res.status(200).json({
            message : "Product fetched successfully",
            product,
            productReview
        })
    }
}