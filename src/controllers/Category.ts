import { NextFunction, Request, Response } from 'express';
import Category from '../models/Category';


// @desc    get all categories
// @route   GET /api/categories/:id
// @access  Public
const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({});
    if (categories) {
        res.json(categories);
    } else {
        res.status(404).json("Category not found");
    }
}

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  };

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        await category.remove()
        res.json({ message: 'Category removed' })
    } else {
        res.status(404).json("Category not found")
    }
}

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { name, des } = req.body
    const category = new Category({
        name,
        des
    })
    const createdCategory= await category.save()
    res.status(201).json(createdCategory)
}

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name, des } = req.body;
    const category = await Category.findById(req.params.id);
  
    if (category) {
      category.name = name;
      category.des = des;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json("Category not found");
    }
  };

export { getAllCategories, getCategoryById, createCategory, deleteCategory, updateCategory };
