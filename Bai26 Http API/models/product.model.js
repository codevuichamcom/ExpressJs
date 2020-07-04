var mongoose = require("mongoose");

var producrSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Product = mongoose.model("Product", producrSchema, "products");

module.exports = Product;
