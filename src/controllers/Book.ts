import { NextFunction, Request, Response } from 'express';
import Book from '../models/Book';
import Author from '../models/Author';
const ObjectId = require('mongodb').ObjectID;


// @desc    get all books
// @route   GET /api/books/:id
// @access  Public
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find({});
    if (books) {
        res.json(books);
    } else {
        res.status(404).json("Book not found");
    }
}

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  };

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id)

    if (book) {
        await book.remove()
        res.json({ message: 'Book removed' })
    } else {
        res.status(404).json("Book not found")
    }
}

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { name, author, category, des } = req.body
    // const authors = await Author.find({})
    // if(authors.includes(author)){
    // }
    const book = new Book({
        name,
        author,
        category,
        des
    })
    const createdBook= await book.save()
    res.status(201).json(createdBook)
}

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const { name, author, category, des } = req.body;
    const book = await Book.findById(req.params.id);
  
    if (book) {
      book.name = name;
      book.author = author;
      book.category = category;
      book.des = des;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json("Book not found");
    }
  };



export { getAllBooks, getBookById, createBook, deleteBook, updateBook };
