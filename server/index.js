import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

// Connect to Database :-
connectDB();

// Global routes imports
import authRoutes from "./routes/authRoutes.js";

// Middleware imports
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import notFoundMiddleware from "./middleware/not-found.js";

const port = 5000;
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Error Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";
//   return res.status(statusCode).json({
//     status: "Failed",
//     statusCode,
//     message,
//   });
// });

app.listen(port, () => {
  console.log("Server running at port ", port);
});
