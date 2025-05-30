import Cart from '../models/cart.js';
import Item from '../models/item.js';
import errorHandler from '../utils/errorHandler.js';

export const create_item = async (req, res) => {
    try{
        const item = await Item.findOne({
            _id: req.body.id,
            sku: req.body.sku,
            size: req.body.size, 
            color: req.body.color
        });
        if(item) return res.status(400).json({ success: false, message: "Product item already exists."});

        const newItem = new Item(req.body);
        await newItem.save();
        res.status(200).json({success: true, newItem});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_item = async (req, res) => {
    try{
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(400).json({ success: false, message: "Product Item not found"});

        res.status(200).json({success: true, item});
        
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const update_item = async (req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findOne({
            _id: { $ne: id }, 
            product: req.body.product,
            size: req.body.size, 
            color: req.body.color
        });
        if(item) return res.status(400).json({ success: false, message: "Product item already exists."});

        const updatedItem = await Item.findOneAndUpdate(
            { _id: id }, 
            req.body, 
            { new: true });
        res.status(200).json({success: true, updatedItem});
        
    }catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const get_items = async (req, res) => {
    try{
        const { id } = req.params;
        const items = await Item.find({ product: id }).populate('product');
        res.status(200).json({ success: true, items });
    }catch(err){
        const errors = errorHandler(err);
        res.status(500).json({success: false, errors});
    }
}

export const delete_item = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        // Delete the item
        await item.deleteOne();

        // Remove all cart entries related to this item
        await Cart.deleteMany({ item: id });

        res.status(200).json({ success: true, message: 'Item and related cart entries successfully deleted' });
    } catch (err) {
        console.log(err);
        const errors = errorHandler(err);
        res.status(500).json({ success: false, errors });
    }
};