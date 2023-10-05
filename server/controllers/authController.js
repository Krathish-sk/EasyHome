import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User do not exsits. Please register"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "Oops !! invalid email or password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
