const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../MIDDLEWARE/checkAuth");

router.post("/", checkAuth, (req, res, next) => {
  const user_details = req.userData;
  const datas = req.body.data;
  console.log(datas);
  const numbers = [];
  const Alphabets = [];
  let highest_lower_case_alphabet = "";
  for (const data of datas) {
    if (/^-?\d*(\.\d+)?$/.test(data)) {
      numbers.push(data);
    }
    if (/^[a-zA-Z]*$/.test(data)) {
      Alphabets.push(data);
    }
    if (/^[a-z]*$/.test(data)) {
      if (!highest_lower_case_alphabet || highest_lower_case_alphabet < data) {
        highest_lower_case_alphabet = data;
      }
    }
  }
  res.status(200).json({
    is_success: true,
    user_id: user_details.user_id,
    email: user_details.college_mail_id,
    roll_no: user_details.college_roll_no,
    numbers: numbers,
    alphabets: Alphabets,
    highest_lowercase_alphabet: [highest_lower_case_alphabet],
  });
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    operation_code: 1,
  });
});

module.exports = router;
