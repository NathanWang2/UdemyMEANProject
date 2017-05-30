var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    // Now the geo json point
    // Must be lng then lat.
    if (isNaN(lng) || isNaN(lat)){
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring latitude and longitude "
                + "should be numbers"
            })
        return;
    };

    if (lat.abs() < 90){
        res
            .status(400)
            .json({
                "message" : "Latitude is out of range"
            });
        return;
    };

    if (lng.abs() < 180){
        res
            .status(400)
            .json({
                "message" : "Longitude is out of range"
            });
        return;
    };


    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true, // Tells to calculate as a sphere
        maxDistance: 2000, // This is in meters
        num: 20   // # of returned docs
    };

    Hotel
        .geoNear(point, geoOptions, function(err, results, stats){
            console.log("Geo results", results);
            console.log("Geo stats", stats);
            if (err){
                console.log("Error finding hotels near the area");
                res
                    .status(500)
                    .json(err);
            } else{
                res
                    .status(200)
                    .json(results);
            }

        });
};

module.exports.hotelsGetAll = function(req, res){

    // default values
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    // if the query exists and there is a latitude and a longitude
    if (req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return; // Stops code if you hit this spot
    }

    // If a query property exists and...
    // If it does exist, then check if there is an offset and set the data
    if (req.query && req.query.offset){
        // Make it an int instead of a string
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count){
        // Make it an int instead of a string
        count = parseInt(req.query.count, 10);
    }

    // If offset or count is not a number end
    if (isNaN(offset) || isNaN(count)){
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should"
                + " be numbers"
            });
        return;
    }

    if (count > maxCount){
        res
            .status(400)
            .json({
                "message" : "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        // error, return data.
        .exec(function(err, hotels){
            if (err){
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            }
            else {
                // Return how many hotels were found an respond with hotels
                console.log("Found hotels", hotels.length);
                res
                   .json(hotels);
            }
        });
};

module.exports.hotelsGetOne = function(req, res){

    // request the url paramater and save it in hotelID
    var hotelId = req.params.hotelId;
    console.log("Get the hotelID", hotelId);

    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            // Cleaner to make an object response and respond at the end of
            // function
            var response = { // default
                status : 200,
                message : doc
            };

            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            // If the document is not found (Does not exist)
            else if(!doc) {
                response.status = 404;
                response.message = {
                        "message" : "Hotel ID not found"
                    };
            }
            res
                .status(response.status)
                .json(response.message);
    });
};

// by default using splitwith an empty string will create an array will create
// an array with one entry. This if function ensures that we will only have an
// array with entries if we have information in the strings.
var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";"); // seperated by ; in the request(Postman)
  } else {
    output = [];
  }
  return output;
};

module.exports.hotelsAddOne = function(req, res){
    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
              address : req.body.address,
              coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        },function(err, newhotel){
            if (err){
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Created new entry in Hotel ", newhotel);
                res
                    .status(201) // Resource has been created
                    .json(newhotel);
            }
        });
};

module.exports.hotelsUpdateOne = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("Get the hotelID", hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec(function(err, doc){
            // Cleaner to make an object response and respond at the end of
            // function
            var response = { // default
                status : 200,
                message : doc
            };

            if (err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            // If the document is not found (Does not exist)
            else if(!doc) {
                response.status = 404;
                response.message = {
                        "message" : "Hotel ID not found"
                    };
            }

            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name,
                doc.description = req.body.description,
                doc.stars = parseInt(req.body.stars,10),
                doc.services = _splitArray(req.body.services),
                doc.photos = _splitArray(req.body.photos),
                doc.currency = req.body.currency,
                doc.location = {
                  address : req.body.address,
                  coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                }
                doc.save(function(err, hotelUpdated){
                    if (err){
                        console.log("Error finding hotel");
                        res
                            .status(500)
                            .json(err);
                    } else{
                        res
                            .status(204)
                            .json();
                    }
                });
            }
    });
};
