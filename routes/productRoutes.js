import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { isUserAuthorized, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(isUserAuthorized, isAdmin, createProduct);
router.route("/:id/reviews").post(isUserAuthorized, createProductReview);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(isUserAuthorized, isAdmin, deleteProduct)
  .put(isUserAuthorized, isAdmin, updateProduct);

export default router;
