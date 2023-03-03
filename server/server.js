'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser')
const request = require('request')


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

// app.get('/', (req,res)=>{
//     res.render('sso')
// })

app.get('/', function (req, res) {
    if (!req.cookies.isloggedin) {
        res.redirect('/login')
        return
    }
    console.log("cookey", req.cookies.userId)
    res.render('app', { userId: req.cookies.userId })
});

app.get('/app2', function (req, res) {
    if (!req.cookies.isloggedin) {
        res.redirect('/login')
        return
    }
    console.log("cookey", req.cookies.userId)
    res.render('app2', { userId: req.cookies.userId })
});


app.get('/single-object', (req, res) => {
    if (!req.cookies.isloggedin) {
        res.redirect('/login')
        return
    }
    res.render('single-object', { userId: req.cookies.userId })
})

app.get('/single-sheet', (req, res) => {
    if (!req.cookies.isloggedin) {
        res.redirect('/login')
        return
    }
    res.render('single-sheet', { userId: req.cookies.userId })
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    console.log(req.body)
    res.cookie(`isloggedin`, true);
    res.cookie(`userId`, req.body.userId);
    res.redirect('/')
})

app.post('/logout', async (req, res) => {

    // request(url, (error, response, body) => {
    //     // Printing the error if occurred
    //     if (error) console.log(error)
    //     // Printing status code
    //     console.log(response.statusCode);
    //     // Printing body
    //     console.log(body);

    //     res.redirect('/login', {url:""})
    // });

    res.clearCookie('isloggedin')
    res.clearCookie('userId')
    res.cookie(`isloggedin`,false);
    res.cookie(`userId`,"");
    console.log(req.cookies.userId)
    console.log(req.cookies.isloggedin)
    res.render('login' , {logout:true}) 
})




app.get('/vidaltesting', (req, res) => {
    res.render('index3')
})

let port = process.env.PORT || 3000

app.listen(port, function () {
    console.log("Listening on port 3000");
})

