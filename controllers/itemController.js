const Item = require("../models/Item");

/**
 * getItems function to fetch items with pagination.
 * It retrieves a specified number of items per page and returns the total number of items.
 */
module.exports.getItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Get the page number from the query parameters (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameters (default: 10)
  
  try{
    // Find items, sorted by date in descending order, and use pagination
    const items = await Item.find()
      .sort({date: -1})
      .skip((page - 1)*limit)
      .limit(limit)
      .exec();

    // Count the total number of items
    const countItems = await Item.countDocuments();
    
    return res.status(200).json({
      items,
      currentPage: page,
      totalPages: Math.ceil(countItems / limit),
    });
  } catch(err){
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

/**
 * postItem function to add a new item to the database.
 * It checks if an item with the same title already exists before creating a new item.
 */
module.exports.postItem = async (req, res) => {
  const { title, description, price, category } = req.body;

  try {
    // Check if an item with the same title (case-insensitive) already exists
    const existingItem = await Item.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
    if (existingItem) {
      return res.status(400).send("Item with the same title already exists");
    }

    // Create a new item
    const newItem = new Item({ title, description, price, category });
    const savedItem = await newItem.save();

    return res.json(savedItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};

/**
 * updateItem function to update an existing item in the database.
 */
module.exports.updateItem = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (item) {
      Item.findOne({ _id: req.params.id }).then(function (item) {
        res.json(item);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong!");
    });
};

/**
 * deleteItem function to delete an item from the database.
 */
module.exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id })
    .then(function (item) {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong!");
    });
};
