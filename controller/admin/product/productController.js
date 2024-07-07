const Product = require("../../../model/productModel");

exports.createProduct = async(req,res) => {
    const {productName,productDescription,productPrice,productStatus,productQuantity} = req.body;
    if(!productName || !productDescription || !productPrice || !productQuantity) {
        return res.status(400).json({
            message : "Please provide productName , productDescription , productPrice & productQuantity"
        })
    };
    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productQuantity
    })
    res.status(200).json({
        message : "Product created sucessfully"
    })
}