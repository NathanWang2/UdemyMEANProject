var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res){
    console.log('register user');

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
        if (err){
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("user created ", user);
            res.status(201).json(user);
        }
    })
};

module.exports.login = function(req, res){
    console.log("Logging in user");
    var username = req.body.username;
    var password = req.body.password;

    User
        .findOne({
            username: username
        })
        .exec(function(err, user){
            if (err){
                res.status(400).json(err);
            } else {
                // user.password is the encrypted password
                if (bcrypt.compareSync(password, user.password)){
                    console.log("User found ", user);
                    // 3 parameters. 1 is payload. 2 is a secret. 3 additional
                    // paramaters. this ex. is epxiration of 1 hour.
                    var token = jwt.sign({username: user.username}, 's3cr3t',
                {expiresIn: 3600});
                    res.status(200).json({success: true, token: token});
                } else {
                    res.status(401).json('Unauthorized');
                }
            }
        });
};
// express js middleware which has access to req and res objects and is able
// to exec any code,make changes, and end the req res cycle.
// https://jwt.io/ good for debugging your token
module.exports.authentication = function(req, res, next){
    var headerExist = req.headers.authorization;
    if (headerExist){
        // we split the autorization header b/c
        // Authroization bearer, xxx is the place for the token
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's3cr3t', function(err, decoded){
            if (err){
                console.log(err);
                res.status(401).json('Unauthorized');
            } else {
                // we can add prop to req obj.
                // decoded is decoded token & usernae prop was added to payload
                req.user = decoded.username;
                // This next method is to go to the next method in line the
                // index.js route
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};
