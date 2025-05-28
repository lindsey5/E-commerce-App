import express from 'express';
import { userRequireAuth } from '../middleware/authMiddleware.js';
import { create_order, get_orders, get_user_order, get_user_orders, update_order_status } from '../controllers/orderController.js';
const router = express.Router();

router.post('/', userRequireAuth, create_order);
router.get('/',  get_orders);
router.get('/:id',  get_user_order);
router.get('/user', userRequireAuth, get_user_orders);
router.put('/status/:id', update_order_status);

export default router;