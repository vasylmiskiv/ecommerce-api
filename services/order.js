class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  addOrderItems = (ordersToAdd) => {
    return this.orderRepository.addOrderItems(ordersToAdd);
  };

  getOrderById = (orderId) => {
    return this.orderRepository.getOrderById(orderId);
  };

  updateOrderToPaid = (orderToUpdateToPaid) => {
    const order = this.getOrderById(orderToUpdateToPaid.id);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = orderToUpdateToPaid;

    return this.orderRepository.updateOrder(order);
  };

  updateOrderToDelivered = (orderId) => {
    const order = this.getOrderById(orderId);

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    return this.orderRepository.updateOrder(order);
  };

  getMyOrders = (userId) => {
    return this.orderRepository.getMyOrders(userId);
  };

  getAllOrders = () => {
    return this.orderRepository.getAllOrders();
  };
}

export default OrderService;
