import Product from '../models/product.js'
import Item from '../models/item.js';
import errorHandler from '../utils/errorHandler.js';
import Cart from '../models/cart.js';
import Order from '../models/order.js';
import Rating from '../models/rating.js';

export const create_product = async (req, res) => {
    try{
        const product = await Product.findOne({ name: req.body.name, status: 'Available'});

        if(product) return res.status(400).json({ success: false, message: "Product already exists."});

        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ success: true, newProduct });
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({errors});
    }
}

export const get_product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id, status: 'Available' });
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    const items = await Item.find({ product: id });

    // Wait for all order count adjustments
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const orderCount = await Order.countDocuments({
          item: item._id,
          status: { $nin: ['Completed', 'Cancelled'] },
        });

        const itemObj = item.toObject();
        itemObj.stock -= orderCount;
        return itemObj;
      })
    );

    return res.status(200).json({
      success: true,
      product: {
        ...product.toObject(),
        items: updatedItems,
      },
    });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(500).json({ success: false, errors });
  }
};

export const total_products = async (req, res) => {
    try{
        const total = await Product.countDocuments();

        return res.status(200).json({success: true, total})

    } catch (err) {
        const errors = errorHandler(err);
        res.status(500).json({ success: false, errors });
    }
}


export const get_products = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const searchTerm = req.query.searchTerm || '';

        const skip = (page - 1) * limit;

        const products = await Product.find({
            status: 'Available',
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { tags: { $elemMatch: { $regex: searchTerm, $options: 'i' } } }
            ]
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        const total = await Product.countDocuments();

        const productsWithStock = (await Promise.all(
            products.map(async (product) => {
                const items = await Item.find({ product: product._id });
                const productRatings = await Rating.find({ product: product._id})

                const rating = productRatings.length > 0
                    ? productRatings.reduce((sum, r) => sum + r.rating, 0) / productRatings.length
                    : 0;
                const stock = items.reduce((total, item) => total + item.stock, 0);
                return { ...product.toObject(), stock, items, rating };
            })
        ))

        res.status(200).json({ 
            success: true, 
            products: productsWithStock,
            totalPages: Math.ceil(total / limit),
            total,
            page,
        });
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const update_product = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findOne({
            _id: { $ne: id }, 
            name: req.body.name,
        });
        if(product) return res.status(400).json({ success: false, message: "Product already exists."});

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id }, 
            req.body, 
            { new: true });

        res.status(200).json({success: true, updatedProduct});
        
    }catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const delete_product = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.status = 'Deleted';
        const updatedProduct = await product.save();
        await Cart.deleteMany({ product: product._id});

        res.status(200).json({ success: true, product: updatedProduct });
        
    } catch (err) {
        console.log(err);
        const errors = errorHandler(err); 
        res.status(500).json({ success: false, errors });
    }
};