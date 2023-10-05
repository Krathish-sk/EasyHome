import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "Please provide all values !!"));
  }

  const exsitingUser = await User.findOne({ email });
  if (exsitingUser) {
    next(errorHandler(400, "User already exsits !! Please Login"));
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({ username, email });
    }
  } catch (error) {
    next(error);
  }
};
