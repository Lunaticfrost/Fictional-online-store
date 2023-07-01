const config = require("config");
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify whether a user is logged in or not.
 * It checks for a valid token in the request header.
 * If the token is valid, it decodes the token and sets the user in the request object.
 * If the token is not valid or missing, it sends an error response.
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied without token" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtsecret"));

    req.user = decoded;
    //next() function allows us to move on to the next middleware function
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token invalid" });
  }
}

module.exports = auth;
