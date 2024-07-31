const Order = require("../../../model/orderSchema");

exports.createOrder = async(req,res) => {
    const userId = req.user.id;
    const {item , totalAmount , shippingAddress , paymentDetails} = req.body;
    if(!item || !item.length || !totalAmount || !shippingAddress || !paymentDetails) {
        return res.status(400).json({
            message : "Please provide item , totalAmount , shippingAddress , paymentDetails"
        })
    }
    const orders = await Order.create({
        user : userId,
        item,
        paymentDetails,
        totalAmount,
        shippingAddress
    })
    res.status(200).json({
        message : "Orders created successfully",
        data : orders
    })
}

exports.getMyOrders = async (req,res) => {
    const userId = req.user.id;
    const orders = await Order.find({user : userId}).populate({
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
        orders
    })
}