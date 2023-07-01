const { Router } = require("express");
const router = Router();
const orderController = require("../controllers/orderController");
const  auth  = require("../middleware/auth");

/**
 * Get Orders - GET request to fetch all orders.
 * Requires authentication.
 */
router.get("/order/:userId", auth, orderController.getOrders);

/**
 * Checkout - POST request to create a new order.
 * Requires authentication.
 */
router.post("/order/:userId", auth, orderController.checkout);

module.exports = router;
