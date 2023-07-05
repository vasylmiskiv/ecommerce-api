import Order from "../models/order.js";

class OrderRepository {
  addOrderItems = (productItemsToCreate) => {
    return new Order(productItemsToCreate).save();
  };

  getOrderById = (orderId) => {
    return Order.findById(orderId);
  };

  updateOrderStatus = (orderToUpdate) => {
    return orderToUpdate.save();
  };
}

export default OrderRepository;
