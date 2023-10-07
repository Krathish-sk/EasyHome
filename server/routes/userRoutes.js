import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getUserListings,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/listing/:id", getUserListings);
router.get("/:id", getUser);

export default router;
