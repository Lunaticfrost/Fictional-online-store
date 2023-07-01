const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Creating schema for our items
const itemSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the item model as 'item'
module.exports = Item = mongoose.model("item", itemSchema);
