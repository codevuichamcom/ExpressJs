require('dotenv').config();


var express = require('express');
var app = express();
var shortid = require('shortid');

var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');


var port = 3000;



app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SCRET));

app.use(express.static('public'))

app.get('/',function(res, res){
    res.render('index');
});

app.use('/users',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/products',productRoute);
app.listen(port, function(){
console.log('Server start at '+port);
});