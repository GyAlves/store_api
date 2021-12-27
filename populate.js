require("dotenv").config();

const mongooseConnection = require("./src/database/mongoose");
const Product = require("./src/models/Product");

const jsonProducts = require("./products.json");

const start = async () => {
    try {

        await mongooseConnection(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);

        console.log("Products created");
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();