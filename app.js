const express = require('express');
const { connectDatabase } = require('./database/database');
const app = express();
const authRoute = require("./routes/authRouter");
const productRoute = require("./routes/productRouter");
const adminUserRoute = require("./routes/adminUserRoute");
const userReviewRoute = require("./routes/userReviewRoute");
const profileRoute = require("./routes/profileRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const adminOrderRoute = require("./routes/adminOrderRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));

connectDatabase();

app.use('',authRoute);
app.use("",productRoute);
app.use("",adminUserRoute);
app.use("",userReviewRoute);
app.use("",profileRoute);
app.use("",cartRoute);
app.use("",orderRoute);
app.use("",adminOrderRoute);
app.use("",paymentRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`);
})