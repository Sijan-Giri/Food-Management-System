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

    console.log(userId,{productId : id})
    const productExists = await Product.findById(id);
    if(!productExists) {
        return res.status(400).json({
            message : "Product with this id doesn't exists"
        })
    }
    const user = await User.findById(userId);
    const existingCartItem = user.cart.find((item) => item.product.equals(id));

    if(existingCartItem) {
        existingCartItem.quantity+=1;
    }else {
        user.cart.push({
            product : id,
            quantity : 1
        })
    }
    await user.save();
    const updatedUser = await User.findById(userId).populate("cart.product")
    res.status(200).json({
        message : "Product added to cart",
        data : updatedUser.cart
    })
}

exports.getCart = async (req,res) => {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate({
        path : "cart.product",
        select : "productName , productPrice , productImage"
    })
    console.log(userData)
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
    userData.cart = userData.cart.filter((item) => !item.product.equals(id));
    await userData.save();
    res.status(200).json({
        message : "Item deleted successfully from cart"
    })
}

exports.updateCartItem = async(req,res) => {
    const userId = req.user.id;
    const {productId} = req.params;
    const {quantity} = req.body;

    if(!productId || !quantity) {
        return res.status(400).json({
            message : "Please provide productId & quantity"
        })
    }

    const user = await User.findById(userId);
    console.log(user)
    const cartItem = user.cart.find((item) => item.product.equals(productId));
    if(!cartItem) {
        return res.status(400).json({
            message : "No item found with this id"
        })
    }
    cartItem.quantity = quantity;
    await user.save()

    res.status(200).json({
        message : "Item updated successfully",
        data : user.cart
    })
}