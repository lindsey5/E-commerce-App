import express from 'express';
import { create_tag, delete_tag, get_tags } from '../controllers/tagController.js';
const router = express.Router();

router.post('/', create_tag);
router.get('/', get_tags);
router.delete('/:id', delete_tag);

export default router;