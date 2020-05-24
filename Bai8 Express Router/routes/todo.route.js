var express = require('express');
var router = express.Router();

var db = require('../db');
var shortid = require('shortid');



router.get('/', (req, res) => {
    res.render('todos/index',{todos:db.get('todos').value()});
  });

router.get('/view/:id', function(req, res){
  var id = req.params.id;
  var todo = db.get('todos').find({id:id}).value();
  res.render('todos/todo',{todo: todo});
});

router.get('/search', (req, res) => {
    var keyword = req.query.keyword;
    var MatchedText = db.get('todos').filter(item => item.content.toLowerCase().indexOf(keyword.toLowerCase()) !==-1).value();
    res.render('todos/index',{todos:MatchedText,keyword:keyword});
  });

  router.get('/create', function(req, res){
    res.render('todos/create');
  });

  router.post('/create', function(req, res){
    req.body.id = shortid.generate();
        db.get('todos').push(req.body).write();
        res.redirect('/todos');
  });

  router.get('/:id/delete',function(req,res){
       var id = req.params.id;

       db.get('todos').remove({id:id}).write();

       res.redirect('/todos');
  });


module.exports =router;