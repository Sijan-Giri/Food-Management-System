const Order = require("../../../model/orderSchema");
const Product = require ("../../../model/productModel");
const User = require ("../../../model/userModel");


class DataService{
    async getData(req,res) {
        const orders = (await Order.find()).length;
        const users = (await User.find()).length;
        const products = (await Product.find()).length;
        const allOrders = await Order.find().populate({
            path : "item.product",
            model : "Product"
        }).populate("user")
        res.status(200).json({
            message : "Datas fetched successfully",
            data : {
                orders,
                users,
                products,
                allOrders
            }
        })
    }
}

const DataServices = new DataService();
module.exports = DataServices