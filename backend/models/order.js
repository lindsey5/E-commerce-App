import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    order_id:{
        type: String,
        unique: true,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    paymentIntentId: {
        type: String,
        required: true,
    },
    estimated_delivery: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema);
export default Order