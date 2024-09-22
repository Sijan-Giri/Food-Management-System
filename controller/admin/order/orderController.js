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

exports.getSingleOrder = async(req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const orderExists = await Order.findById(id);
    if(!orderExists) {
        return res.status(400).json({
            message : "Order not found with this id"
        })
    }
    res.status(200).json({
        message : "Order fetched successfully",
        data : orderExists
    })
}

exports.updateOrderStatus = async(req,res) => {
    const {id} = req.params;
    const {orderStatus} = req.body;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    if(!orderStatus || !["pending","delivered","ontheway","preparation","cancelled"].includes(orderStatus.toLowerCase())) {
        return res.status(400).json({
            message : "Order status is invalid or should be provided"
        })
    }
    const orderExists = await Order.findById(id);
    if(!orderExists) {
        return res.status(400).json({
            message : "Order not found with this id"
        })
    }
    const updateOrder = await Order.findByIdAndUpdate(id,{
        orderStatus
    },{
        new : true
    })
    res.status(200).json({
        message : "Order status updated successfully",
        data : updateOrder
    })
}

exports.deleteOrder = async(req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const orderExists = await Order.findById(id);
    if(!orderExists) {
        return res.status(400).json({
            message : "Order not found with this id"
        })
    }
    await Order.findByIdAndDelete(id);
    res.status(200).json({
        message : "Order deleted successfully"
    })
}