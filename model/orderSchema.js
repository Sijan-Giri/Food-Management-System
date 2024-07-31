const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    item : [{
        quantity : {
            type : Number,
            required : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true
        }
    }],
    totalAmount : {
        type : Number,
        required : true
    },
    shippingAddress : {
        type : String,
        required : true
    },
    orderStatus : {
        type : String,
        enum : ["pending","delivered","onTheWay","preparation","cancelled"],
        default : "pending"
    },
    paymentDetails : {
        method : {
            type : String,
            enum : ["COD","khalti"] 
        },
        status : {
            type : String,
            enum : ["pending","paid","unpaid"],
            default : "pending"
        }
    }
},{
    timestamps : true
})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;