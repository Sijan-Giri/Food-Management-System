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