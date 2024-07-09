const Product = require("../../../model/productModel");

exports.createProduct = async(req,res) => {
    const file = req.file;
    let filePath;
    if(!file) {
        filePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3jTszSflQt-SjZGIWqJRegF0GrAVzpCQtg&s";
    }
    else {
        filePath = req.file.filename
    }
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
        productQuantity,
        productImage : filePath
    })
    res.status(200).json({
        message : "Product created sucessfully"
    })
}