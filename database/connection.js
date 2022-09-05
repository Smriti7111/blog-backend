const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

const connectDatabase = async() => {
    try {
        await mongoose.connect(dbURI);
        console.log("Database connected succesfully")
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDatabase;