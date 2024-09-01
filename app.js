const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const allRoutes = require("./API/getData");
const userRoutes = require("./API/users.js");

mongoose.connect(
  "mongodb+srv://pawan25:test1234@cluster1.6bsqh.mongodb.net/BAJAJ-DB?retryWrites=true&w=majority&appName=Cluster1"
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/bfhl/users", userRoutes);
app.use("/bfhl", allRoutes);

app.use((req, res, next) => {
  console.log("Connected and Listening");
  res.status(200).json({ message: "Connected" });
});

module.exports = app;
