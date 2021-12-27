require("dotenv").config();
require("express-async-errors");

const express = require('express');
const routes = require('./routes/products.routes');
const mongooseConnection = require("./database/mongoose");

const server = express();

server.use(express.json());
server.use("/api/v1/products", routes)

const port = 5000;


const start = async () => {
    try {

        await mongooseConnection(process.env.MONGO_URI);
        console.log("Connected to mongoose");

        server.listen(port, () => {
            console.log(`Connected to port ${port}`)
        });

    } catch (error) {
        console.log(error);
    }
}

start();