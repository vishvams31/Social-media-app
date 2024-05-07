const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json("token not found");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json("user not found");
    }
    req.user = {
      _id: user._id,
    };
    const userId = req.user._id;
    if (userId == decoded.userId) {
      next();
    } else {
      res.status(403).json("user not authorized");
    }
  } catch (err) {
    res.status(401).json("invalid token");
  }
};
module.exports = verifyUserToken;
