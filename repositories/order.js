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

  getMyOrders = (userId) => {
    return Order.find({ user: userId });
  };

  getAllOrders = () => {
    return Order.find({});
  };
}

export default OrderRepository;
