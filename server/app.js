'use strict';
const express = require('express'); 
const cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser') 


var app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    
    res.render('app', { userId: req.cookies.userId })
});

let port = process.env.PORT || 3000

app.listen(port, function () {
    console.log("Listening on port 3000");
})

