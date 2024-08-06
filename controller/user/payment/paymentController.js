const { default: axios } = require("axios");

exports.initiateKhaltiPayment = async (req,res) => {
    const {orderId , amount} = req.body;
    if(!orderId || !amount) {
        return res.status(400).json({
            message : "Please provide orderId & amount"
        })
    }
    const data = {
        return_url : "http://localhost:2000",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:2000/",
        purchase_order_name : "orderName_" + orderId 
    }
    
     const response = await axios.post('https://a.khalti.com/api/v2/',data,{
        headers : {
            'Authorization' : 'key 31907215237e454a968ce3a8e48665ad'
        }
    })
    
    console.log(response)
}

