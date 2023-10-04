import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

// Connect to Database :-
connectDB();

const port = 5000;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("Server running at port ", port);
});
