export class CreateProductDto {
  constructor(name, price, description, image, brand, category, countInStock) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.brand = brand;
    this.category = category;
    this.countInStock = countInStock;
  }
}
