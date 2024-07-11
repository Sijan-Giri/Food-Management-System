const express = require('express');
const { connectDatabase } = require('./database/database');
const app = express();
const authRoute = require("./routes/authRouter");
const productRoute = require("./routes/productRouter");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));

connectDatabase();

app.use('',authRoute);
app.use("",productRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`);
})