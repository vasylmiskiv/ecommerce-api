import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

import { AddOrderItemsDto } from "../dto/order/AddOrderItems.dto.js";
import { UpdateProductDto } from "../dto/product/UpdateProduct.dto.js";
import { UpdateOrderToPaidDto } from "../dto/order/UpdateOrderToPaid.dto.js";

class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      customer,
    } = req.body;

    const user = customer._id;

    const addOrderItemsDto = new AddOrderItemsDto(
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      customer
    );

    if (orderItems && !orderItems.length) {
      res.status(400);
      throw new Error("No order items");
    }

    const createdOrderItems = await this.orderService.addOrderItems(
      addOrderItemsDto
    );

    if (createdOrderItems) {
      res.status(200).json(createdOrderItems);
    } else {
      res.status(404);
      throw new Error("Creating order items failed");
    }
  });

  getOrderById = asyncHandler(async (req, res) => {
    const order = await this.orderService.getOrderById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw Error("Order not found");
    }
  });

  updateOrderToPaid = asyncHandler(async (req, res) => {
    const { id, status, update_time, email_address } = req.body;

    const updateOrderToPaidDto = new UpdateOrderToPaidDto(
      id,
      status,
      update_time,
      email_address
    );

    const updatedOrderToPaid = await this.orderService.updateOrderToPaid(
      updateOrderToPaidDto
    );

    if (updatedOrderToPaid) {
      res.json(updatedOrderToPaid);
    } else {
      res.status(404);
      throw Error("Order not found");
    }
  });

  updateOrderToDelivered = asyncHandler(async (req, res) => {
    const updatedOrderToDelivered =
      await this.orderService.updateOrderToDelivered(req.params.id);

    if (updatedOrderToDelivered) {
      res.json(updatedOrderToDelivered);
    } else {
      res.status(404);
      throw Error("Order not found");
    }
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const orders = await this.orderService.getMyOrders(req.user._id);

    res.json(orders);
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await this.orderService.getAllOrders();

    res.json(orders);
  });
}

export default OrderController;
