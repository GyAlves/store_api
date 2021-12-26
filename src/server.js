require("dotenv").config();
const express = require('express');
const mongooseConnection = require("./database/mongoose");

const server = express();

server.use(express.json());

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