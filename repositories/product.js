import Product from "../models/product.js";

class ProductRepository {
  allProductsAmount = (keyword) => Product.countDocuments({ ...keyword });

  getProductsPerPage = (keyword, pageSize, page) => {
    return Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  };

  getProductById = (id) => Product.findById(id);

  createProduct = (product) => {
    return new Product(product).save();
  };

  updateProudct = (product) => {
    return Product.findByIdAndUpdate(updated._id, updated, {
      new: true,
    });
  };

  createProductReview = (product) => {
    return product.save();
  };

  getTopProducts = () => {
    return Product.find({}).sort({ rating: -1 }).limit(3);
  };
}

export default ProductRepository;
