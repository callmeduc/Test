import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken'


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json('Invalid email or password')
    }
  }

// @desc    Register a new user
// @route   POST /api/users
const register = async (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password} = req.body
  const userExists = await User.findOne({email})
  if (userExists) {
      res.status(400).json('User already exists')
    }
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json('Invalid user data')
    }

}


export {register, authUser }
