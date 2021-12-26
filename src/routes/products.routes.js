const express = require('express');

const productsRouter = express.Router();

const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/").post(createProduct);
productsRouter.route("/:product_id").get(getProduct);
productsRouter.route("/:product_id").patch(updateProduct);
productsRouter.route("/:product_id").delete(deleteProduct);

module.exports = productsRouter