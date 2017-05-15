var express = require("express");
var app = express();
var path = require("path");

var route = require("./routes");

app.set('port',3000);

// the /css means that it will only print request from this folder
// app.use("/css",function(req, res, next)
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", route);

// This validates that the listen is working properly
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("I'm listening to port " + port);
});
