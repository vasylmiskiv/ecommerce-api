import Product from "../models/product.js";

class ProductRepository {
  allProductsAmount = (keyword) => Product.countDocuments({ ...keyword });

  getProductsPerPage = (keyword, pageSize, page) => {
    return Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  };

  getProductById = (id) => Product.findById(id);

  createProductReview = (productReviewToUpdate) => {
    return productReviewToUpdate.save();
  };

  createProduct = (user, productToCreate) =>
    new Product({ ...productToCreate, user }).save();

  updateProduct = (productId, productToUpdate) => {
    return Product.findByIdAndUpdate(productId, productToUpdate, {
      new: true,
    });
  };

  deleteProduct = (productId) => Product.findByIdAndDelete(productId);

  getTopProducts = () => {
    return Product.find({}).sort({ rating: -1 }).limit(3);
  };
}

export default ProductRepository;
