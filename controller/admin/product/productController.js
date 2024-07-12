const Product = require("../../../model/productModel");

exports.createProduct = async(req,res) => {
   try {
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
        productImage : "http://localhost:2000/" + filePath
    })
    res.status(200).json({
        message : "Product created sucessfully"
    })
   } catch (error) {
    res.status(500).json({
        message : "Something went wrong"
    })
   }
}

exports.getProducts = async (req,res) => {
    const products = await Product.find();
    if(products.length == 0) {
        res.status(400).json({
            message : "Products not found",
            products : []
        })
    }
    else {
        res.status(200).json({
            message : "Products fetched successfully",
            products
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
    if(product.length == 0) {
        res.status(400).json({
            message : "Product not found",
            product : []
        })
    }
    else {
        res.status(200).json({
            message : "Product fetched successfully",
            product
        })
    }
}