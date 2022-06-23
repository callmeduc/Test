import jwt from 'jsonwebtoken'
import User from '../models/User'
import { NextFunction, Request, Response } from 'express';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401).json('Not authorized, no token')
  }
}

const admin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json('Not authorized as an admin')
  }
}

export { protect, admin }
