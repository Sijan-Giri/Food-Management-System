const express = require('express');
const { connectDatabase } = require('./database/database');
const app = express();
const authRoute = require("./routes/authRouter");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDatabase();

app.use('',authRoute)

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`);
})