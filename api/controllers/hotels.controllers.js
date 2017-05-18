var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

module.exports.hotelsGetAll = function(req, res){

    // default values
        var offset = 0;
        var count = 5;

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

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        // error, return data.
        .exec(function(err, hotels){
            // Return how many hotels were found an respond with hotels
            console.log("Found hotels", hotels.length);
            res
               .json(hotels);
        });
};

module.exports.hotelsGetOne = function(req, res){

    // request the url paramater and save it in hotelID
    var hotelId = req.params.hotelId;
    console.log("Get the hotelID", hotelId);
    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            res
                .status(200)
                .json(doc);
    });
};

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels'); // get the collection from db
    var newHotel;
    // Error trapping
    // Require a name and star
    if (req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection
            .insertOne(newHotel, function(err, response){
                console.log(response);
                console.log(response.ops);
                res
                    .status(201) // code for insertOne
                    .json(response.ops);
            })


    } else {
        console.log("Failed to add new hotel");
        res
            .status(400)
            .json({message : "Required data is missing from request"});
    }
};
