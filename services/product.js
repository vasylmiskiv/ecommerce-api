class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  allProductsAmount = (keyword) => {
    return this.productRepository.allProductsAmount(keyword);
  };

  getProductsPerPage = (keyword, pageSize, page) => {
    return this.productRepository.getProductsPerPage(keyword, pageSize, page);
  };

  getProductById = (id) => {
    return this.productRepository.getProductById(id);
  };

  createProduct = (user, productToCreate) => {
    return this.productRepository.createProduct(user, productToCreate);
  };

  createProductReview = async ({
    productId,
    userId,
    name,
    rating,
    comment,
  }) => {
    const product = await this.productRepository.getProductById(productId);

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      throw new Error("Product already reviewed");
    }

    const review = {
      user: userId,
      name,
      comment,
      rating: Number(rating),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews;

    return this.productRepository.createProductReview(product);
  };

  updateProduct = (productId, productToUpdate) => {
    return this.productRepository.updateProduct(productId, productToUpdate);
  };

  deleteProduct = (id) => {
    return this.productRepository.deleteProduct(id);
  };

  getTopProducts = () => {
    return this.productRepository.getTopProducts();
  };
}

export default ProductService;
