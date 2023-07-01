const { Router } = require('express');
const router = Router();
const searchController = require('../controllers/searchController');
const  auth  = require("../middleware/auth");

/**
 * Search - GET request to fetch searched items.
 * Requires authentication.
 */
router.get("/search",auth, searchController.search);


module.exports = router;
