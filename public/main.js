require.config({
    baseUrl: 'https://qliksenseserver.exponentia.ai/resources'
});

var prefix = "/";

var config = {
    host: "qliksenseserver.exponentia.ai",
    prefix: prefix,
    port: 443,
    isSecure: true
};

require(['js/qlik'], function (qlik) {

    qlik.on("error", function (error) {
        console.log(error);
        alert(error)
    });

    var global = qlik.getGlobal(config);

    global.getAuthenticatedUser().then(function (reply) {
        console.log("working fine as expacted ");
        console.log(reply)
    })

      const app = qlik.openApp('2a41a653-2299-489a-ace5-c89364c5336b', config);
      $('.objonetwo').click(function(data){    
        const obj_id = $(this).attr("data-obj"); 
        app.getObject(obj_id).then(function(model){
            var d = app.table(model);
            d.exportData({'format':'CSV_C','state':'A','filename': 'exportdata.csv','download': true})
        })
     }) 

})

