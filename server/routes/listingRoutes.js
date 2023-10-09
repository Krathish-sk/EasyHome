import express from "express";
import {
  createListing,
  getListing,
  updateListing,
  deleteListing,
  getListings,
} from "../controllers/listingController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
