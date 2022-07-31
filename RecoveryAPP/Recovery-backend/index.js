const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");

// We create the server
const app = express();

// We connect to the DB
connectDB();
app.use(cors())

app.use(express.json());

app.use('/api/products', require('./routes/product'));

app.listen(4000, () => {
    console.log('The server is running perfectly')
})