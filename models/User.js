const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { isEmail } = require("validator");

//Defining the schema of user
const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email id"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email id"],
  },
  password: {
    type: String,
    required: [true, "please enter a valid password"],
    minlength: [5, "Min. length of password is 5 characters"],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the user model as 'user'
module.exports = User = mongoose.model("user", userSchema);
