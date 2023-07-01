const Item = require("../models/Item");

/**
 * Search function to fetch items based on their name, description, or category.
 * It uses the search query provided in the request query parameters.
 */
module.exports.search = async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    try {
      // Find the items that partially match the search query
      const filteredItems = await Item.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } }
        ]
      });
  
      return res.status(200).send(filteredItems);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    }
  };