import Order from "../models/order.js";
import Rating from "../models/rating.js";
import errorHandler from "../utils/errorHandler.js";

export const create_rating = async (req, res) => {
    try{
        const rating = new Rating({ user: req.user_id, ...req.body})
        await rating.save()

        const order = await Order.findById(req.body.order)
        order.status = 'Rated'
        await order.save()

        res.status(200).json({success: true, rating});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_rating = async (req, res) => {
    try{
        const rating = await Rating.findOne({ order: req.params.id});

        res.status(200).json({success: true, rating});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_product_ratings = async (req, res) => {
    try{
        const ratings = await Rating.find({ product: req.params.id}).populate('user');

        res.status(200).json({success: true, ratings});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}