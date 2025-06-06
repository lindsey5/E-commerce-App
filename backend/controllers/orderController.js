import Item from "../models/item.js";
import Order from "../models/order.js";
import { getPaymentId, refundPayment } from "../services/paymentService.js";
import { calculateEstimatedDelivery } from "../utils/delivery.js";
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
        const order = new Order({ 
          order_id,
           user: req.user_id, 
           estimated_delivery: calculateEstimatedDelivery(new Date),
           ...req.body,   
        });
        
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
        .populate('product')
        .populate('item')
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
        .sort({ createdAt: -1})
        .populate('product');

        res.status(200).json({success: true, orders});
        
    }catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_user_order = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id)
          .populate('item')
          .populate('product')

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

    if(status === 'Completed'){
        const item = await Item.findById(updatedOrder.item)
        item.stock -= 1
        await item.save();
    }

    if(status === 'Cancelled'){
      const payment_id = await getPaymentId(updatedOrder.paymentIntentId)
      await refundPayment(payment_id)
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    console.log(err)
    const errors = errorHandler(err);
    res.status(500).json({ success: false, errors });
  }
};

export const get_pending_orders = async (req, res) => {
    try{
        const total = await Order.countDocuments({ status: { $in: ['Pending', 'Confirmed', 'Shipped']} })

        res.status(200).json({success: true, total });
        
    }catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_monthly_sales = async (req, res) => {
    try{
      const year = parseInt(req.query.year) || new Date().getFullYear();

      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year + 1}-01-01`);

      const monthlySales = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lt: end },
            status: { $in: ['Completed', 'Rated'] }
          }
        },
        {
          $group: {
            _id: { month: { $month: '$createdAt' } },
            total: { $sum: { $multiply: ['$price', '$quantity'] } }
          }
        },
        {
          $project: {
            month: '$_id.month',
            total: 1,
            _id: 0
          }
        }
      ]);

      // Initialize salesArray with 12 months
      const salesArray = Array(12).fill(0);
      monthlySales.forEach(sale => {
        salesArray[sale.month - 1] = sale.total;
      });

      return res.status(200).json({
        success: true,
        monthlySales: salesArray
      });
    }catch(err){

    }
}

export const get_total_sales_this_year = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    const totalSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lt: startOfNextYear },
          status: { $in: ['Completed', 'Rated'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    const total = totalSales[0]?.total || 0;

    res.status(200).json({ success: true, total });
  } catch (err) {
    console.log(err)
    const errors = errorHandler(err);
    res.status(500).json({ success: false, errors });
  }
};

export const get_total_sales_this_day = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfNextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const totalSalesToday = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lt: startOfNextDay },
          status: { $in: ['Completed', 'Rated'] } // include only valid sales
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    const total = totalSalesToday[0]?.total || 0;

    res.status(200).json({ success: true, total });
  } catch (err) {
    console.log(err)
    const errors = errorHandler(err);
    res.status(500).json({ success: false, errors });
  }
};