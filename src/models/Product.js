const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have name"],
        maxLength: 30
    },
    description: {
        type: String,
    },
    price: {
        type: Float,
        require: [true, "Must have price"]
    }
})

module.exports = mongoose.model("Product", ProductSchema)