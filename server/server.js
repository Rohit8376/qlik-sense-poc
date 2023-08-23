'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser')
const request = require('request')
const fs = require('fs')

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
    res.render('login',{logout:false})
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


app.get('/getTicket', function (req, res) {
    console.log(req.query)
    const userId = req.query.UserId;
    const UserDirectory = req.query.UserDirectory?req.query.UserDirectory:'QLIKSENSEVM3';
    if(!userId){
       return res.send({status:403,'ticket':"", message:"UserId is required and UserDirectory is optional"})
    }
    get_ticket_redirect("https://qliksenseserver.exponentia.ai:4243/qps",userId,UserDirectory, function (ticket) {
        res.send({status:200,'ticket':ticket, message:"success"})
    }); 
});  


function get_ticket_redirect(proxyRestUri,userId, UserDirectory,callback){
    var directory = "./pem/";
    var options = {
        uri:  proxyRestUri+'/ticket?xrfkey=0123456789ABCDEF',
        headers: {
            'content-type': 'application/json',
            'x-qlik-xrfkey': '0123456789ABCDEF',
            'X-Qlik-User': 'UserDirectory='+UserDirectory?UserDirectory:'QLIKSENSEVM3'+   '; UserId='+userId,
        },
        method: 'POST',
        body: {
            "UserDirectory": UserDirectory?UserDirectory:'QLIKSENSEVM3',
            "UserId": userId,
            "Attributes": [],
        },
        json: true,
        ca: fs.readFileSync(directory + "root.pem"),
        key: fs.readFileSync(directory + "client_key.pem"),
        cert: fs.readFileSync(directory + "client.pem"),
        rejectUnauthorized: false,
        agent: false
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error)
            callback(error)
        }
        else {
            callback(body.Ticket); 
        }
    });
}

let port = process.env.PORT || 3000

app.listen(port, function () {
    console.log("Listening on port 3000");
})

