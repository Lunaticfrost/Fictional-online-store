const mongoose = require("mongoose");
const schema = mongoose.Schema;

//creating schema for our cart model
const cartSchema = new schema({
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
        default: 1,
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Exporting the cart model as 'cart'
module.exports = Cart = mongoose.model("cart", cartSchema);
