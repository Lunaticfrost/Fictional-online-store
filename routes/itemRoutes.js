const { Router } = require("express");
const router = Router();
const itemController = require("../controllers/itemController");
const  auth  = require("../middleware/auth");

/**
 * Get Items - GET request to fetch all the items from the server.
 * Requires authentication.
 */
router.get("/items", auth, itemController.getItems);

/**
 * Add Item - POST request to add a new item to the database.
 * Requires authentication.
 */
router.post("/add-item", auth, itemController.postItem);

/**
 * Update Item - PUT request to update an existing item in the database.
 * Requires authentication.
 */
router.put("/items/:id", auth, itemController.updateItem);

/**
 * Delete Item - DELETE request to delete an item from the database.
 * Requires authentication.
 */
router.delete("/items/:id", auth, itemController.deleteItem);

module.exports = router;
