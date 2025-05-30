import express from 'express';
import { create_rating, get_product_ratings, get_rating } from '../controllers/ratingController.js';
import { userRequireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', userRequireAuth, create_rating);
router.get('/product/:id', get_product_ratings);
router.get('/:id', get_rating);

export default router;