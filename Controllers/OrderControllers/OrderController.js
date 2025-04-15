const Order = require("../../Models/OrderSchema");
exports.createOrder = async (req, res) => {
  try {
    const { productId, shippingAddress } = req.body;

    // Validate required fields
    if (!productId || !shippingAddress) {
      return res.status(400).json({
        error: true,
        errorMessage: "Both productId and shippingAddress are required.",
      });
    }

    // Create new order
    const newOrder = new Order({
      userId: req.user.id, // coming from token
      productId,
      shippingAddress,
    });

    // Save to DB
    await newOrder.save();

    // Return success response
    return res.status(201).json({
      error: false,
      data: {
        orderId: newOrder._id,
        userId: newOrder.userId,
        productId: newOrder.productId,
        shippingAddress: newOrder.shippingAddress,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (err) {
    console.error("Error while creating order:", err);

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        error: true,
        errorMessage: errors,
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred while creating the order.",
      details: err.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch orders of the logged-in user
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 }) // Latest first
      .populate({
        path: "productId",
        select: "name cost category image", // only include required fields
      });

    // Format response
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      product: order.productId,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
    }));

    return res.status(200).json({
      error: false,
      data: formattedOrders,
    });
  } catch (err) {
    console.error("Error while fetching orders:", err);

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred while fetching your orders.",
      details: err.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders sorted by latest first and populate related data
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "-password -__v -updatedAt", // exclude sensitive/unnecessary fields
      })
      .populate({
        path: "productId",
        select: "-__v -updatedAt", // include all product info
      });

    // Format response
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      user: order.userId,
      product: order.productId,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
    }));

    return res.status(200).json({
      error: false,
      data: formattedOrders,
    });
  } catch (err) {
    console.error("Error fetching all orders:", err);

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred while fetching all orders.",
      details: err.message,
    });
  }
};
