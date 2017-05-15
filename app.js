var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var route = require("./api/routes");

app.set('port',3000);

// the /css means that it will only print request from this folder
// app.use("/css",function(req, res, next)
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
// want to make sure that the body parser runs before the api route
app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", route);

// This validates that the listen is working properly
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("I'm listening to port " + port);
});
