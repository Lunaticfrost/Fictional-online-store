const Cart = require("../models/Cart");
const Item = require("../models/Item");

/**
 * getCartItems function to retrieve items of a cart.
 */
module.exports.getCartItems = async (req, res) => {
  const userId = req.params.userId;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send("Cart is empty!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};

/**
 * addCartItem function to add an item to the cart.
 */
module.exports.addCartItem = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found");
    }
    const price = item.price;
    const name = item.title;

    if (cart) {
      //if a cart already exists
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // If the product already exists in the cart
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //create a new cart
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

/**
 * deleteItem function to delete an item from the cart.
 */
module.exports.deleteItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};
