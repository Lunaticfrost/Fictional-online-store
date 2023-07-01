const { Router } = require("express");
const router = Router();
const cartController = require("../controllers/cartController");
const  auth  = require("../middleware/auth");

/**
 * Get Cart Items - GET request to get all cart items.
 * Requires authentication.
 */
router.get("/cart/:userId", auth, cartController.getCartItems);

/**
 * Add Cart Item - POST request to add an item to cart.
 * Requires authentication.
 */
router.post("/cart/:userId", auth, cartController.addCartItem);

/**
 * Delete Cart Item - DELETE request to delete an item from cart.
 * Requires authentication.
 */
router.delete("/cart/:userId/:itemId", auth, cartController.deleteItem);

module.exports = router;
