const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User_Table = require("../MODELS/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  User_Table.findOne({ user_id: req.body.user_id })
    .then((result) => {
      if (result) {
        return res.status(409).json({ message: "Already User Exist" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = User_Table({
              _id: new mongoose.Types.ObjectId(),
              user_id: req.body.user_id,
              college_mail_id: req.body.college_mail_id,
              college_roll_no: req.body.college_roll_no,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({ message: "User Signed Up!!" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res, next) => {
  User_Table.findOne({ user_id: req.body.user_id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: "Incorrect username/password provided. Please retry",
          status_code: 401,
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            status: "Incorrect username/password provided. Please retry",
            status_code: 401,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              user_id: user.user_id,
              college_mail_id: user.college_mail_id,
              college_roll_no: user.college_roll_no,
            },
            "SECRET",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            status: "Login successful",
            status_code: 200,
            user_id: user._id,
            access_token: token,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
