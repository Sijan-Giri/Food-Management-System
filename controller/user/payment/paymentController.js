const { default: axios } = require("axios");
const Order = require("../../../model/orderSchema");

exports.initiateKhaltiPayment = async (req,res) => {
    const {orderId , amount} = req.body;
    if(!orderId || !amount) {
        return res.status(400).json({
            message : "Please provide orderId & amount"
        })
    }
    const order = await Order.findById(orderId);
    if(!order) {
        res.status(400).json({
            message : "Order with that id not found"
        })
    }
    if(order.totalAmount !== amount) {
        res.status(400).json({
            message : "Amount must be equal to the totalAmount"
        })
    }
    const data = {
        return_url : "http://localhost:5173/success",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:2000/",
        purchase_order_name : "orderName_" + orderId 
    }
    
     const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'key 31907215237e454a968ce3a8e48665ad'
        }
    })
    order.paymentDetails.pidx = response.data.pidx;
    await order.save();
    res.status(200).json({
        message : "Payment Successful",
        paymentUrl : response.data.payment_url
    })
}

exports.verifyPidx = async(req,res) => { 
    const pidx = req.body.pidx;
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers : {
            "Authorization" : 'key 31907215237e454a968ce3a8e48665ad'
        }
    })
    if(response.data.status === "Completed") {
        const order = await Order.find({'paymentDetails.pidx' : pidx});
        order[0].paymentDetails.method = "Khalti";
        order[0].paymentDetails.status = "paid";
        await order[0].save();
        res.status(200).json({
            message : "Payment Success"
        })
}
}