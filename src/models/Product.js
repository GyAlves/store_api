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
        type: Number,
        require: [true, "Must have price"]
    },
    company: {
        type: String,
        required: [true, "Must have company"],
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported"
        }
    },
    rating: {
        type: Number,
        required: [true, "Must have rating"],
        default: 4.0
    },
    featured: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", ProductSchema)