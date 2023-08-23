
const fs = require('fs');
const request = require('request');

var directory = "./pem/";

var get_ticket_redirect = function (proxyRestUri, callback) {

 
    var options = {
        uri: proxyRestUri + '/ticket?xrfkey=0123456789ABCDEF',
        headers: {
            'content-type': 'application/json',
            'x-qlik-xrfkey': '0123456789ABCDEF',
            'X-Qlik-User': 'UserDirectory=QLIKSENSESERVER; UserId=qliktraining1',
        },
        method: 'POST',
        body: {
            "UserDirectory": "QLIKSENSESERVER",
            "UserId": 'qliktraining1',
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
            console.log('Error: ' + error);
            console.log(response);
        }
        else { 
            console.log(response.body);
            callback(body.Ticket); 
        }
    });

}


get_ticket_redirect("https://qliksenseserver.exponentia.ai:4243/qps", function (ticket) {

console.log(ticket)
    res.send({status:200,'ticket':ticket.Ticket?ticket.Ticket:ticket, message:"success"})
}); 


 