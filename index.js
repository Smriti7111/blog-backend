const express = require('express');
const connectDatabase = require('./database/connection');
const articleRouter = require('./routes/articleRoutes');
const cors = require('cors');
const dotenv = require('dotenv').config();

//create server
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//connect database
connectDatabase();

//routes
app.use('/api/articles',articleRouter);

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT,() => {
    console.log(`Server started at port ${PORT}`);
});