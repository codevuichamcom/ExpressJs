var express = require("express");
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

var controller = require("../controller/user.controller");
var validate = require("../validate/user.validate");

router.get("/", controller.index);

router.get("/view/:id", controller.view);

router.get("/search", controller.search);

router.get("/create", controller.createGet);

router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  controller.createPost
);

router.get("/:id/delete", controller.delete);

module.exports = router;
