const mongoose = require('mongoose');

const dbURI = "mongodb+srv://root:root@cluster0.xdpfsbm.mongodb.net/blog?retryWrites=true&w=majority";

const connectDatabase = async() => {
    try {
        await mongoose.connect(dbURI);
        console.log("Database connected succesfully")
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDatabase;