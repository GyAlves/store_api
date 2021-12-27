const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {

        const { featured } = req.query;
        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === "true" ? true : false;
        }

        console.log(queryObject);
        const products = await Product.find(queryObject);
        res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
        res.status(404).json({ error });
    }
}

const createProduct = async (req, res) => {
    try {

        const { name, description, price } = req.body;
        const product = await Product.create({ name, description, price });
        res.status(200).json({ product });

    } catch (error) {
        res.status(400).json({ error });
    }
}

const getProduct = async (req, res) => {
    try {
        const { product_id } = req.params;

        const product = await Product.findOne({ _id: product_id });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ Error: error });
    }
}

const updateProduct = async (req, res) => {

    try {
        const { product_id } = req.params;
        const { name, description, price } = req.body;

        await Product.findByIdAndUpdate(product_id, { name, description, price });

        res.status(200).json({ message: "Product updated" })
    } catch (error) {
        res.status(400).json({ error })
    }

}

const deleteProduct = async (req, res) => {

    try {
        const { product_id } = req.params;

        await Product.findByIdAndDelete(product_id);

        res.status(200).json({ message: "Product deleted" })

    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}