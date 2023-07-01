const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

/**
 * Register - POST request for registering a new user.
 */
router.post("/register", authController.signup);

/**
 * Login - POST request for logging in a user.
 */
router.post("/login", authController.login);

/**
 * User - GET request to get the user who is logged in.
 * Requires authentication.
 */
router.get("/user", auth, authController.getUser);

module.exports = router;
