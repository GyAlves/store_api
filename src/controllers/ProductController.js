const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {

        const { featured, company, name, sort, fields } = req.query;
        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === "true" ? true : false;
        }

        if (company) {
            queryObject.company = company
        }


        if (name) {
            queryObject.name = { $regex: name, $options: "i" }
        }

        let result = Product.find(queryObject);

        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort("createdAt");
        }

        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);

        const products = await result
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