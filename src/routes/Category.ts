import express from 'express';
import { getAllCategories, getCategoryById, createCategory, deleteCategory, updateCategory } from '../controllers/Category';
import { protect, admin } from '../middleware/authMiddleware'


const router = express.Router();


router.route('/').get(getAllCategories).post(protect, admin, createCategory);
router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory)

export = router;
