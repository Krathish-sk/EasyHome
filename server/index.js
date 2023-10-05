import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

// Connect to Database :-
connectDB();

const port = 5000;
const app = express();
app.use(express.json());

// Global routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    status: "Failed",
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("Server running at port ", port);
});
