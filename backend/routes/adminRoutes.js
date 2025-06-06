import express from 'express';
import { adminLogin, createAdmin, getAdmin } from '../controllers/adminController.js';
import { adminRequireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', adminRequireAuth, createAdmin);
router.get('/', adminRequireAuth, getAdmin);
router.post('/login', adminLogin);

export default router;