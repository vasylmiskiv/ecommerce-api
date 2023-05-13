import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { isUserAuthorized, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(isUserAuthorized, addOrderItems).get(isUserAuthorized, isAdmin, getOrders);
router.route("/myorders").get(isUserAuthorized, getMyOrders);
router.route("/:id").get(isUserAuthorized, getOrderById);
router.route("/:id/pay").put(isUserAuthorized, updateOrderToPaid);
router.route("/:id/deliver").put(isUserAuthorized, isAdmin, updateOrderToDelivered);

export default router;
