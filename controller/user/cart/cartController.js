const Product = require("../../../model/productModel");
const User = require("../../../model/userModel");


exports.addToCart = async(req,res) => {
    const userId = req.user.id;
    const {id} = req.params;

    if(!id) {
        return res.status(400).json({
            message : "Please provide product id"
        })
    }
    const productExists = await Product.findById(id);
    if(!productExists) {
        return res.status(400).json({
            message : "Product with this id doesn't exists"
        })
    }
    const user = await User.findById(userId);
    user.cart.push(id);
    await user.save();
    res.status(200).json({
        message : "Product added to cart"
    })
}

exports.getCart = async (req,res) => {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate("cart")
    const cartData  = userData.cart
    res.status(200).json({
        message : "Cart fetched successfully",
        data : cartData
    })
}

exports.deleteFromCart = async(req,res) => {
    const userId = req.user.id;
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product) {
        return res.status(400).json({
            message : "Product not found with this id"
        })
    }
    const userData = await User.findById(userId);
    userData.cart = userData.cart.filter((productId) => productId != id);
    await userData.save();
    res.status(200).json({
        message : "Item deleted successfully from cart"
    })
}