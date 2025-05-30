import express from 'express';
import { userRequireAuth } from '../middleware/authMiddleware.js';
import { create_order, get_monthly_sales, get_orders, get_pending_orders, get_total_sales_this_day, get_total_sales_this_year, get_user_order, get_user_orders, update_order_status } from '../controllers/orderController.js';
const router = express.Router();

router.post('/', userRequireAuth, create_order);
router.get('/',  get_orders);
router.get('/pending',  get_pending_orders);
router.get('/sales/today',  get_total_sales_this_day);
router.get('/sales/monthly',  get_monthly_sales);
router.get('/sales/year',  get_total_sales_this_year);
router.get('/user', userRequireAuth, get_user_orders);
router.get('/:id',  get_user_order);
router.put('/status/:id', update_order_status);

export default router;