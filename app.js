var express = require("express");
var app = express();
var path = require("path");

app.set('port',3000);

// the /css means that it will only print request from this folder
// app.use("/css",function(req, res, next)
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

// req = response and res = respond
// Sending Json type info
app.get("/json", function(req, res){
    console.log("Get Json");
    res
    .status(200)
    .json({"jsonData" : true});
});

// Sending static files
app.get("/file", function(req, res){
    console.log("Get File");
    res
    .status(200)
    // .join is a method to allow different arguments to create a directory
    // __dirname will go to the current path you are in
    .sendFile(path.join(__dirname, "app.js"));
});

// This validates that the listen is working properly
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("I'm listening to port " + port);
});
