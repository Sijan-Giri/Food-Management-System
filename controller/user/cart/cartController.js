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