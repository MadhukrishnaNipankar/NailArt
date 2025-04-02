const Product = require("../../Models/ProductSchema"); // Assuming Nail model is renamed to Product

exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category; // Extract category from request parameter

    // Validate input
    if (!category) {
      return res.status(400).json({
        error: true,
        errorMessage: "Category is required.",
      });
    }

    const validCategories = [
      "work",
      "vacation",
      "nailartsupplies",
      "festive",
      "casual",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: true,
        errorMessage:
          "Invalid category. Allowed values are: work, vacation, nailartsupplies, festive, casual.",
      });
    }

    // Fetch products by category
    const products = await Product.find({ category }).select("name cost image");

    // Check if products exist for the given category
    if (products.length === 0) {
      return res.status(404).json({
        error: true,
        errorMessage: `No products found in the ${category} category.`,
      });
    }

    return res.status(200).json({
      error: false,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred while fetching products.",
      details: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, cost, category, image } = req.body;

    // Define required fields and validations
    const requiredFields = { name, cost, category, image };
    const validCategories = [
      "work",
      "vacation",
      "nailartsupplies",
      "festive",
      "casual",
    ];

    // Check for missing fields
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key]
    );
    if (missingFields.length) {
      return res.status(400).json({
        error: true,
        errorMessage: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate cost and category
    if (cost < 0 || !validCategories.includes(category)) {
      return res.status(400).json({
        error: true,
        errorMessage:
          cost < 0 ? "Cost must be non-negative." : "Invalid category.",
      });
    }

    // Check for duplicate product
    if (await Product.exists({ name })) {
      return res.status(400).json({
        error: true,
        errorMessage: `A product with the name '${name}' already exists.`,
      });
    }

    // Create and save the product
    const newProduct = await Product.create(requiredFields);

    res.status(201).json({
      error: false,
      message: "Product added successfully.",
      data: newProduct,
    });
  } catch (err) {
    console.error("Error while adding product:", err.message);
    res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};
