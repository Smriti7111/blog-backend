const express = require('express');
const connectDatabase = require('./database/connection');
const articleRouter = require('./routes/articleRoutes');
const cors = require('cors');
const PORT = 3000;

//create server
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//connect database
connectDatabase();

//routes
app.use('/api/articles',articleRouter);

//start server
app.listen(PORT,() => {
    console.log(`Server started at port ${PORT}`);
});