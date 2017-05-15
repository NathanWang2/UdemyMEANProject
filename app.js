var express = require("express");
var app = express();

app.set('port',3000);

// This validates that the listen is working properly
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("I'm listening to port " + port);
});
console.log("This should print first meaning it's asynch");
