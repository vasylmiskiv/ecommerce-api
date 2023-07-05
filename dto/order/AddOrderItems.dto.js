export class AddOrderItemsDto {
  constructor(
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    userId
  ) {
    this.orderItems = orderItems;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.itemsPrice = itemsPrice;
    this.taxPrice = taxPrice;
    this.shippingPrice = shippingPrice;
    this.totalPrice = totalPrice;
    this.userId = userId;
  }
}
