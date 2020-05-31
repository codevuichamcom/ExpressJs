var db = require("../db");

module.exports.index = function (req, res) {
  var sessionId = req.signedCookies.sessionId;
    var carts = db.get("sessions").find({ id: sessionId }).value().cart;
    var products =[];
    for(var cart in carts){
        var product = db.get('products').find({id:cart}).value();
        products.push(product);
    }
  res.render("cart/index", {
    products: products
  });
};

module.exports.addToCart = function (req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .write();

  res.redirect("/products");
};
