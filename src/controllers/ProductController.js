const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
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

        const updatedProduct = await Task.findByIdAndUpdate(product_id, { name, description, price });

        res.status(200).json({ message: "Product updated", data: updatedProduct })
    } catch (error) {
        res.status(400).json({ error })
    }

}

const deleteProduct = async (req, res) => {

    try {
        const { product_id } = req.params;

        const deletedProduct = await Task.findByIdAndDelete(product_id);

        res.status(200).json({ message: "Product deleted", data: deletedProduct })

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