var db = require("../db");
var shortid = require("shortid");

module.exports.index = function (req, res) {
  res.render("todos/index", { todos: db.get("todos").value() });
};

module.exports.view = function (req, res) {
  var id = req.params.id;
  var todo = db.get("todos").find({ id: id }).value();
  res.render("todos/todo", { todo: todo });
};

module.exports.search = function (req, res) {
  var keyword = req.query.keyword;
  var MatchedText = db
    .get("todos")
    .filter(
      (item) => item.content.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    )
    .value();
  res.render("todos/index", { todos: MatchedText, keyword: keyword });
};

module.exports.createGet = function (req, res) {
  res.render("todos/create");
};

module.exports.createPost = function (req, res) {
  req.body.id = shortid.generate();
  db.get("todos").push(req.body).write();
  res.redirect("/todos");
};

module.exports.delete = function (req, res) {
  var id = req.params.id;
  db.get("todos").remove({ id: id }).write();
  res.redirect("/todos");
};
