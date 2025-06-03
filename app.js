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
const dataServiceRoute = require("./routes/dataServiceRoute")
const schedule = require("node-schedule")

const {Server} = require("socket.io");
const cors = require("cors")

app.use(cors({
    origin : "*"
}))

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
app.use("",dataServiceRoute);

app.get("/",(req,res) => {
    res.send("API is running....")
}) 

const PORT = process.env.PORT || 3000

const server = app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`);
})

const io = new Server(server,{
    cors : ["https://food-management-frontend.vercel.app/","https://food-management-frontend-admin.vercel.app/"]
});
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const User = require('./model/userModel');

const schedule = require('node-schedule');

const job = schedule.scheduleJob('10 * * * *',async function(){
  await User.find()
});

let onlineUsers = [];

const addToOnlineUsers = (socketId , userId , role) => {
    onlineUsers = onlineUsers.filter((onlineUser) => onlineUser.userId !== userId)
    onlineUsers.push({socketId , userId , role})
    console.log(onlineUsers)
}

io.on("connection",async (socket) => {
    const token = socket.handshake.auth.token
    if(token) {
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY);
        const doesUserExists = await User.findById(decoded.id);
        if(doesUserExists) {
            addToOnlineUsers(socket.id , doesUserExists.id , doesUserExists.userRole)
        }
    }

    socket.on("updateOrderStatus",({status , userId , orderId}) => {
       const findUser = onlineUsers.find((user) => user.userId == userId);
       io.to(findUser.socketId).emit("statusUpdated",{status,orderId})
    })
})

