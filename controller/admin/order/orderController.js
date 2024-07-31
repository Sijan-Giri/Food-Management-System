const Order = require("../../../model/orderSchema")

exports.getOrders = async(req,res) => {
    const orders = await Order.find().populate({
        path : "item.product",
        model : "Product"
    })
    if(orders.length == 0) {
        return res.status(400).json({
            message : "Orders are empty",
            data : []
        })
    }
    res.status(200).json({
        message : "Orders fetched successfully",
        data : orders
    })
}