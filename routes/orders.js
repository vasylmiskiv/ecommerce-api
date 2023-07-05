import express from "express";

import { isUserAuthorized, isAdmin } from "../middleware/auth.js";

import OrderRepository from "../repositories/order.js";
import OrderService from "../services/order.js";
import OrderController from "../controllers/orders.js";

const router = express.Router();

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router
  .route("/")
  .post(isUserAuthorized, orderController.addOrderItems)
  .get(isUserAuthorized, isAdmin, orderController.getOrders);
router.route("/myorders").get(isUserAuthorized, orderController.getMyOrders);
router.route("/:id").get(isUserAuthorized, orderController.getOrderById);
router
  .route("/:id/pay")
  .put(isUserAuthorized, orderController.updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(isUserAuthorized, isAdmin, orderController.updateOrderToDelivered);

export default router;
