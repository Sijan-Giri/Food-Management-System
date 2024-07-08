const mongoose = require("mongoose");
const User = require("../model/userModel");
const adminSeeder = require("../adminSeeder");

exports.connectDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
    adminSeeder();
}