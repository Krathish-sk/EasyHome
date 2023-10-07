import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Connect to Database :-
connectDB();

// Global routes imports
import verifyToken from "./utils/verifyToken.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const port = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRouter);

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("Server running at port ", port);
});
