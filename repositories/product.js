import Product from "../models/product.js";

class ProductRepository {
  allProductsAmount = (keyword) => Product.countDocuments({ ...keyword });

  getProductsPerPage = (keyword, pageSize, page) => {
    return Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  };

  getProductById = (id) => Product.findById(id);

  createProduct = (productToCreate) => {
    return new Product(productToCreate).save();
  };

  updateProduct = (productToUpdate) => {
    return Product.findByIdAndUpdate(productToUpdate._id, productToUpdate, {
      new: true,
    });
  };

  createProductReview = (productReviewToUpdate) => {
    return productReviewToUpdate.save();
  };

  getTopProducts = () => {
    return Product.find({}).sort({ rating: -1 }).limit(3);
  };
}

export default ProductRepository;
