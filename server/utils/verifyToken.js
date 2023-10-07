import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookie.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
  });
};

export default verifyToken;
