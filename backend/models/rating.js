import mongoose, { Schema } from "mongoose";

const RatingSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    order: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        unique: true,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    }
}, { timestamps: true })

const Rating = mongoose.model('Rating', RatingSchema);
export default Rating