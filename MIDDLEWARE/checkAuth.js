const jwt = require("jsonwebtoken");
const User_Table = require("../MODELS/userModel");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "SECRET");
    req.userData = decode;
    User_Table.findOne({ user_id: req.userData.user_id })
      .then((user) => {
        next();
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  } catch (error) {
    res.status(400).json({ message: "Auth Failed" });
  }
};
