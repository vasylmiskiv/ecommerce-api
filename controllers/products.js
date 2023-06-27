import asyncHandler from "express-async-handler";

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const allProductsAmount = await this.productService.allProductsAmount(
      keyword
    );

    const productsPerPage = await this.productService.getProductsPerPage(
      keyword,
      pageSize,
      page
    );

    console.log(productsPerPage);

    res.json({
      products: productsPerPage,
      page,
      pages: Math.ceil(allProductsAmount / pageSize),
    });
  });

  getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await this.productService.getProductById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const product = await this.productService.getProductById(id);

    if (product) {
      await product.remove();
      res.json({ message: `${product.name} has been removed` });
    } else {
      res.status(404);
      throw new Error("Product not find");
    }
  });

  createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const newProduct = await this.productService({
      name: name,
      price: price,
      user: req.user._id,
      image: image,
      brand: brand,
      category: category,
      countInStock: countInStock,
      numReviews: 0,
      description: description,
    });

    res.status(201).json(newProduct);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const {
      _id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;

    const updatedProduct = await this.productService.updateProduct({
      _id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    });

    if (updatedProduct) {
      res.json({ message: `${updatedProduct.name} has been updated` });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  createProductReview = asyncHandler(async (req, res) => {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    const { _id: userId, name } = req.user;

    const createdProductReview = await this.productService.createProductReview(
      productId,
      userId,
      name,
      rating,
      comment
    );

    if (createdProductReview) {
      res.status(201).json({ message: "Your review has added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  getTopProducts = asyncHandler(async (req, res) => {
    const topProducts = await this.productService.getTopProducts();

    res.json(topProducts);
  });
}

export default ProductController;
