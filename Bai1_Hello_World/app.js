var express = require('express');
var app = express();

var port = 3001;

app.get('/',function(request, response){
    response.send('Hello World.');
});

app.get('/users',function(request, response){
    response.send('User Page');
})

app.get('/todos', (request, response) => {
    var arr = ['Đi chợ','Nấu Cơm', 'Rửa bát', 'Học code tại CodersX'];
    
    var todos = arr.map(function(item){
      return '<li>'+item+'</li>';
    });
    var result = '<ul>';
    for(var i of todos){
      result+=i;
    }
    result+='</ul>';
    response.send(result);
  });

app.listen(port, function(){
console.log('Server start at '+port);
});