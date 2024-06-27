import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// Login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// Signup user
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
};
