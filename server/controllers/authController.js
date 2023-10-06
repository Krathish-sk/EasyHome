import bcryptjs from "bcryptjs";
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
    const hashedPassword = bcryptjs.hashSync(password, 10);
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
  if (!email || !password) {
    next(errorHandler(400, "Please provide all values"));
  }
  const validUser = await User.findOne({ email });
  if (!validUser) {
    next(errorHandler(404, "User do not exsits. Please register"));
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (validPassword === false)
    return next(errorHandler(401, "Oops !! invalid email or password"));
  try {
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

export const googleAuth = async (req, res, next) => {
  try {
    const exsitingUser = await User.findOne({ email: req.body.email });

    if (exsitingUser) {
      const token = jwt.sign({ id: exsitingUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = exsitingUser._doc;
      console.log(rest);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        number: req.body.number,
        photo: req.body.photo,
      });
      if (newUser) {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(201)
          .json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};
