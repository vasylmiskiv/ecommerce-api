export class AddOrderItemsDto {
  constructor(
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    customer
  ) {
    this.user = user;
    this.orderItems = orderItems;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.itemsPrice = itemsPrice;
    this.taxPrice = taxPrice;
    this.shippingPrice = shippingPrice;
    this.totalPrice = totalPrice;
    this.customer = customer;
  }
}
