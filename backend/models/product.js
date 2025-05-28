import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    tags: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Available'
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
export default Product