import express from 'express';
import { getAllBooks, getBookById, createBook, deleteBook, updateBook } from '../controllers/Book';
import { protect, admin } from '../middleware/authMiddleware'


const router = express.Router();

router.route('/').get(getAllBooks).post(protect, admin, createBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook)


export = router;
