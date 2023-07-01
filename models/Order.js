const mongoose = require("mongoose");
const schema = mongoose.Schema;

//creating schema for our order model
const orderSchema = new schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Min. 1 item is required"],
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the order model as 'order'
module.exports = Order = mongoose.model("order", orderSchema);
