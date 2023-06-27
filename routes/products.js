import express from "express";
import ProductRepository from "../repositories/product.js";
import ProductService from "../services/product.js";
import ProductController from "../controllers/products.js";
import { isUserAuthorized, isAdmin } from "../middleware/auth.js";

const router = express.Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router
  .route("/")
  .get(productController.getProducts)
  .post(isUserAuthorized, isAdmin, productController.createProduct);
router
  .route("/:id/reviews")
  .post(isUserAuthorized, productController.createProductReview);
router.get("/top", productController.getTopProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .delete(isUserAuthorized, isAdmin, productController.deleteProduct)
  .put(isUserAuthorized, isAdmin, productController.updateProduct);

export default router;
