const User = require("../models/user");
const jwt = require("jsonwebtoken"); // JSON Web Token library for generating and verifying tokens.
const config = require("config");
const bcrypt = require('bcrypt');

/**
 * Signup function to create a new user.
 */
module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please fill out all fields" });
  }

  User.findOne({ email }) //to check if user with that email already exists.
    .then((user) => {
      if (user)
        return res.status(400).json({ msg: "This User already exists" });

      const newUser = new User({ name, email, password });

      // Encrypting password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user._id }, // Payload containing user ID
              config.get("jwtsecret"), // Secret key used for signing the token
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    }).catch((err)=>{
      console.log(err);
      res.status(500).send("Something went wrong");
    });
};

/**
 * Login function to authenticate a user.
 */
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please fill out both fields" });
  }
  User.findOne({ email }) //checking if user exists or not
    .then((user) => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered. Please register first" });

      //password validation
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        jwt.sign(
          { id: user._id },// Payload containing user ID
          config.get("jwtsecret"),// Secret key used for signing the token
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    }).catch((err)=>{
      console.log(err);
      res.status(500).send("Something went wrong");
    });
};

/**
 * GetUser function to retrieve current user details. 
 */
module.exports.getUser = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
