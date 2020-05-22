var express = require('express');
var app = express();

var port = 3000;

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: []})
  .write();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',function(res, res){
    res.send('Hello World.');
});

app.get('/users',function(res, res){
    res.send('User Page');
})

app.get('/todos', (req, res) => {

    res.render('todos/index',{todos:db.get('todos').value()});
  });

app.get('/todos/search', (req, res) => {
    var keyword = req.query.keyword;
    var MatchedText = todos.filter(function(item){
        return item.content.toLowerCase().indexOf(keyword.toLowerCase()) !==-1;
    });
    res.render('todos/index',{todos:MatchedText,keyword:keyword});
  });

  app.get('/todos/create', function(req, res){
   
    res.render('todos/create');
  });

  app.post('/todos/create', function(req, res){
        db.get('todos').push(req.body).write();
        res.redirect('/todos');
  });


app.listen(port, function(){
console.log('Server start at '+port);
});