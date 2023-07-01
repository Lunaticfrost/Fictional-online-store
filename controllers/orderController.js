const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/user");
const config = require("config");


/**
 * getOrders function to fetch all orders for a specific user.
 * It uses pagination to limit the number of orders per page.
 */
module.exports.getOrders = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;// Get the page number from the query parameters (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameters (default: 10)
  
  try {
    // Find orders for the specified user, sorted by date in descending order, and use pagination
    const orders = await Order.find({userId})
      .sort({date: -1})
      .skip((page - 1)*limit)
      .limit(limit)
      .exec()

      // Count the total number of orders for the user
      const countOrders = await Order.countDocuments();

    return res.status(200).json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(countOrders / limit)
    })
                              
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!")
  }
};

/**
 * checkout function to complete an order.
 * It creates a new order based on the items in the user's cart and deletes the cart after the order is created.
 */
module.exports.checkout = async (req, res) => {
  try {
    const userId = req.params.userId;
    let cart = await Cart.findOne({ userId });
    let user = await User.findOne({ _id: userId });

    if (cart){
      // Create a new order based on the cart items and bill
        const order = await Order.create({
          userId,
          items: cart.items,
          bill: cart.bill,
        });

        // Create a new order based on the cart items and bill
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        
        return res.status(201).send(order);
      }
    else {
      res.status(500).send("Your cart is empty!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong! Please try again later.");
  }
};
