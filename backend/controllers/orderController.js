import Order from "../models/order.js";
import errorHandler from "../utils/errorHandler.js";

const generateOrderId = async () => {
  const prefix = 'ORD-';
  const orderId = prefix + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Check if it already exists in the database
  const existingOrder = await Order.findOne({ orderId });

  // If it exists, retry
  if (existingOrder) {
    return generateOrderId();
  }

  return orderId;
};

export const create_order = async (req, res) => {
    try{
        const order_id = await generateOrderId();
        const order = new Order({ order_id, user: req.user_id, ...req.body});

        await order.save();
        res.status(200).json({success: true, order});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_orders = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const status = req.query.status;
        const searchTerm = req.query.searchTerm || '';

        const skip = (page - 1) * limit;

        const query = {
            $or: [
              { order_id: { $regex: searchTerm, $options: 'i' } },
              { firstname: { $regex: searchTerm, $options: 'i' } },
              { lastname: { $regex: searchTerm, $options: 'i' } },
              { address: { $regex: searchTerm, $options: 'i' } },
              { city: { $regex: searchTerm, $options: 'i' } },
            ]
        }

        if(status) query.status = status;

        const orders = await Order.find(query)
        .sort({ updatedAt: -1 })
        .populate({
            path: 'item',
            populate: {
                path: 'product',  
            }
        })
        .skip(skip)
        .limit(limit);
        const total = await Order.countDocuments();

        res.status(200).json({
            success: true, 
            orders,
            totalPages: Math.ceil(total / limit),
            total,
            page,
        });
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_user_orders = async (req, res) => {
    try{
        const orders = await Order
        .find({ user: req.user_id})
        .sort({ created_At: -1})
        .populate({
            path: 'item',
            populate: {
                path: 'product',  
            }
        });

        res.status(200).json({success: true, orders});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_user_order = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate('item')

        res.status(200).json({success: true, order});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const update_order_status = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(500).json({ success: false, errors });
  }
};