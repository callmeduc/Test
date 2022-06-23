import express from 'express';
import { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, updateAuthor } from '../controllers/Author';
import { protect, admin } from '../middleware/authMiddleware'


const router = express.Router();

router.route('/').get(getAllAuthors).post(protect, admin, createAuthor);
router.route('/:id').get(getAuthorById).put(updateAuthor).delete(deleteAuthor)


export = router;
