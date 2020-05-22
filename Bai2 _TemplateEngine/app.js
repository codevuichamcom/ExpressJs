var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(request, response){
    response.send('Hello World.');
});

app.get('/users',function(request, response){
    response.send('User Page');
})

app.get('/todos', (request, response) => {
    var todos = ['Đi chợ','Nấu Cơm', 'Rửa bát', 'Học code tại CodersX'];
   
    response.render('index',{todos:todos});
  });

app.listen(port, function(){
console.log('Server start at '+port);
});