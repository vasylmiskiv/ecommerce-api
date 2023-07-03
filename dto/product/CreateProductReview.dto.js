export class CreateProductReviewDto {
  constructor(productId, userId, name, rating, comment) {
    this.productId = productId;
    this.userId = userId;
    this.name = name;
    this.rating = rating;
    this.comment = comment;
  }
}
