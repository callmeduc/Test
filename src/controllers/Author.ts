import { NextFunction, Request, Response } from 'express';
import Author from '../models/Author';


// @desc    get all authors
// @route   GET /api/authors/:id
// @access  Public
const getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
    const authors = await Author.find({});
    // console.log(authors);
    if (authors) {
        res.json(authors);
    } else {
        res.status(404).json("Author not found");
    }
}

// @desc    Fetch single author
// @route   GET /api/authors/:id
// @access  Public
const getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
    const author = await Author.findById(req.params.id);

    if (author) {
      res.json(author);
    } else {
      res.status(404);
      throw new Error("Author not found");
    }
  };

// @desc    Delete a author
// @route   DELETE /api/authors/:id
// @access  Private/Admin
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const author = await Author.findById(req.params.id)

    if (author) {
        await author.remove()
        res.json({ message: 'Author removed' })
    } else {
        res.status(404).json("Author not found")
    }
}

// @desc    Create a author
// @route   POST /api/authors
// @access  Private/Admin
const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { name, des } = req.body
    const author = new Author({
        name,
        des
    })
    const createdAuthor= await author.save()
    res.status(201).json(createdAuthor)
}

// @desc    Update a author
// @route   PUT /api/authors/:id
// @access  Private/Admin
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address } = req.body;
    const author = await Author.findById(req.params.id);
  
    if (author) {
      author.name = name;
      author.address = address;
      const updatedAuthor = await author.save();
      res.json(updatedAuthor);
    } else {
      res.status(404).json("Author not found");
    }
  };

export { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, updateAuthor };
