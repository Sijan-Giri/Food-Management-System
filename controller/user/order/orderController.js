const Order = require("../../../model/orderSchema");
const User = require("../../../model/userModel");

exports.createOrder = async(req,res) => {
    const userId = req.user.id;
    const {item , totalAmount , shippingAddress , paymentDetails , phoneNumber} = req.body;
    if(!item || !item.length || !totalAmount || !shippingAddress || !paymentDetails || !phoneNumber) {
        return res.status(400).json({
            message : "Please provide item , totalAmount , phoneNumber , shippingAddress , paymentDetails"
        })
    }

    const validItems = item.filter(i => i.product);
    
    const orders = await Order.create({
        user : userId,
        item : validItems,
        paymentDetails,
        totalAmount,
        shippingAddress,
        phoneNumber
    })
    
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.status(200).json({
        message : "Orders created successfully",
        data : orders,
        orderId : orders._id
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
        data : orders
    })
}

exports.updateMyOrder = async(req,res) => {
    const {id} = req.params;
    const {shippingAddress , item} = req.body;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    if(!shippingAddress || !item || !item.length) {
        return res.status(400).json({
            message : "Please provide shippingAddress & item"
        })
    }
    const orderExists = await Order.findById(id);
    if(!orderExists) {
        return res.status(400).json({
            message : "Order not found with this id"
        })
    }
    if(orderExists.orderStatus == "onTheWay") {
        return res.status(400).json({
            message : "You cannot update order while it is on the way"
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        shippingAddress,
        item
    },{
        new : true
    })
    res.status(200).json({
        message : "Order updated successfully",
        data : updatedOrder
    })
}

exports.deleteMyOrder = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.id;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const orderExists = await Order.findById(id);
    if(!orderExists) {
        return res.status(400).json({
            message : "Order with this id doesn't exists"
        })
    }
    if(orderExists.user != userId) {
        return res.status(400).json({
            message : "You don't have permission to delete this order"
        })
    }
    if(orderExists.orderStatus !== "pending") {
        return res.status(400).json({
            message : "You can't cancel this order cuz it is not in pending"
        })
    }
    await Order.findByIdAndDelete(id);
    res.status(200).json({
        message : "Order deleted successfully"
    })
}

exports.cancelMyOrder = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.id;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const order = await Order.findById(id);
    if(!order) {
        return res.status(400).json({
            message : "Order not found with this id"
        })
    }
    if(order.user != userId) {
        return res.status(400).json({
            message : "You don't have permission to cancel this order"
        })
    }
    if(order.orderStatus !== "pending") {
        return res.status(400).json({
            message : "You can't cancel this order cuz it is not in pending"
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        orderStatus : "cancelled"
    },{
        new : true
    })
    res.status(200).json({
        message : "Order cancelled successfully",
        data : updatedOrder
    })
}