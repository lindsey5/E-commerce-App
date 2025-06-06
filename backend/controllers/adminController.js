import Admin from "../models/admin.js";
import { hashPassword, verifyPassword, createToken } from "../utils/authUtils.js";
import errorHandler from "../utils/errorHandler.js";

export const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        
        if (admin) {
            return res.status(404).json({ success: false, message: 'Username already exist'})
        }
        const hashedPassword = await hashPassword(password);
        const newAdmin = new Admin({...req.body, password: hashedPassword});
        await newAdmin.save();

        res.status(200).json({success: true, newAdmin});
    } catch (err) {
      const errors = errorHandler(err);
      res.status(500).json({success: false, errors});
    }
}

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
      const admin = await Admin.findOne({ username });
    
      if (!admin) return res.status(404).json({ success: false, message: 'Username not found'})

      const isMatch = await verifyPassword(password, admin.password);
  
      if (!isMatch) return res.status(401).json({ success: false, message: 'Incorrect Password'})

      const token = createToken(admin._id);

      res.status(201).json({ success: true, token, admin})
    } catch (err) {
      const errors = errorHandler(err);
      res.status(500).json({success: false, errors});
    }
}

export const getAdmin = async (req, res) => {
    try {
      const admin = await Admin.findById(req.user_id)

      res.status(201).json({ success: true, admin})
    } catch (err) {
      const errors = errorHandler(err);
      res.status(500).json({success: false, errors});
    }
}