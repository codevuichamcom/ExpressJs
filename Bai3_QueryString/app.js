var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var todos = [
    {id:1,content:'Đi chợ'},
    {id:2,content:'Nấu Cơm'}, 
    {id:3,content:'Rửa bát'}, 
    {id:4,content:'Học code tại CodersX'}
];

app.get('/',function(res, res){
    res.send('Hello World.');
});

app.get('/users',function(res, res){
    res.send('User Page');
})

app.get('/todos', (req, res) => {

    res.render('todos/index',{todos:todos});
  });

app.get('/todos/search', (req, res) => {
    var keyword = request.query.keyword;
    var MatchedText = todos.filter(function(item){
        return item.content.toLowerCase().indexOf(keyword.toLowerCase()) !==-1;
    });
    res.render('todos/index',{todos:MatchedText,keyword:keyword});
  });


app.listen(port, function(){
console.log('Server start at '+port);
});