const Product = require("../../../model/productModel");
const fs = require("fs");

exports.createProduct = async(req,res) => {
    const file = req.file;
    let filePath;
    if(!file) {
        filePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3jTszSflQt-SjZGIWqJRegF0GrAVzpCQtg&s";
    }
    else {
        filePath = req.file.filename
    }
    const {productName,productDescription,productStatus,productPrice,productQuantity} = req.body;
    if(!productName || !productDescription || !productPrice || !productQuantity) {
        return res.status(400).json({
            message : "Please provide productName , productDescription , productPrice & productQuantity"
        })
    };
    const productCreated = await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productQuantity,
        productImage : "https://food-management-system-backend.onrender.com/" + filePath
    })
    res.status(200).json({
        message : "Product created sucessfully",
        data : productCreated
    })
}

exports.deleteProduct = async(req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(200).json({
            message : "Please provide id"
        })
    }
    const oldData = await Product.findById(id);
    if(!oldData) {
        return res.status(400).json({
            message : "No data found with this id"
        })
    }
    if(oldData.productImage) {
    const fullFilePath = oldData.productImage;
    const fileToCut = process.env.BACKEND_URL.length
    const filepathAfterCut = fullFilePath.slice(fileToCut)
    
        fs.unlink("./uploads/" + filepathAfterCut,(err) => {
            if(err) {
                console.log("Error occured",err)
            }
            else {
                console.log("File Deleted successfully")
            }
        })
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
        message : "Product deleted successfully"
    })

}

exports.editProduct = async(req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const {productName,productDescription,productPrice,productStatus,productQuantity} = req.body;
    if(!productName || !productDescription || !productPrice || !productQuantity) {
        return res.status(400).json({
            message : "Please provide productName , productDescription , productPrice & productQuantity"
        })
    };
    const oldData = await Product.findById(id);
    if(!oldData) {
        return res.status(400).json({
            message : "No data found with this id"
        })
    }
    const fullFilePath = oldData.productImage
    const fileToCut = process.env.BACKEND_URL.length
    const filepathAfterCut = fullFilePath.slice(fileToCut)
    if(req.file && req.file.filename) {
        fs.unlink(filepathAfterCut,(err) => {
            if(err) {
                console.log("Error occured",err)
            }
            else {
                console.log("File Deleted successfully");
            }
        })
    }
    const datas = await Product.findByIdAndUpdate(id,{
        productName,
        productDescription,
        productPrice,
        productStatus,
        productQuantity,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : filepathAfterCut
    },{
        new : true
    })
    res.status(200).json({
        message : "Product updated successfully",
        datas
    })
}

exports.updateProductStatus = async(req,res) => {
    const {id} = req.params;
    const {productStatus} = req.body;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    if(!productStatus || !["available","unavailable"].includes(productStatus.toLowerCase())) {
        return res.status(400).json({
            message : "Product status is invalid or should be provided"
        })
    }
    const productExists = await Product.findById(id);
    if(!productExists) {
        return res.status(400).json({
            message : "Product not found with this id"
        })
    }
    const updateProduct = await Product.findByIdAndUpdate(id,{
        productStatus
    },{
        new : true
    })
    res.status(200).json({
        message : "Product status updated successfully",
        data : updateProduct
    })
}

exports.updateProductStockAndPrice = async(req,res) => {
    const {id} = req.params;
    const {productPrice , productStockQty} = req.body;

    if(!productPrice && !productStockQty) {
        return res.status(400).json({
            message : "Please provide productPrice or productStockQty"
        })
    }

    const product = await Product.findById(id);
    if(!product) {
        return res.status(400).json({
            message : "No product found with this id"
        })
    }
    const updateProduct = await Product.findByIdAndUpdate(id,{
        productStockQty : productStockQty ? productStockQty : product.productStockQty,
        productPrice : productPrice ? productPrice : product.productPrice
    },{new : true});

    res.status(200).json({
        message : "Product Price & StockQty updated successfully",
        data : updateProduct
    })
} 