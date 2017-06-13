var dbconnection = require("./api/data/db.js"); // Changed to mongoose connect
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


var routes = require("./api/routes");

app.set('port',3000);

// the /css means that it will only print request from this folder
// app.use("/css",function(req, res, next)
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
// Set static directory before defining routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

// want to make sure that the body parser runs before the api route
// urlencoded means that it can only read in url recorded format
app.use(bodyParser.urlencoded({extended : false}));
// telling api that it should natively understand json data
app.use(bodyParser.json());

app.use("/api", routes);

// This validates that the listen is working properly
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("I'm listening to port " + port);
});
