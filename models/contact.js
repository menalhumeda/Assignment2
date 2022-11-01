let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModel = mongoose.Schema(
  {
    contactName: String,
    contactNumber: Number,
    emailAddress: String,
  },

  {
    collection: "Contact",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("Business Contacr", contactModel);
