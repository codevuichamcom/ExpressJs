var express = require('express');
var app = express();
var shortid = require('shortid');

var todoRoute = require('./routes/todo.route');

var port = 3000;



app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',function(res, res){
    res.send('Hello World.');
});

app.use('/todos',todoRoute);

app.listen(port, function(){
console.log('Server start at '+port);
});