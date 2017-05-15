var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function(req, res){
    console.log("Get Json from api/data folder");
    console.log(req.query);

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

// Taking the hotelData array and slicing it
    var returnData = hotelData.slice(offset, offset + count);

    res
        .status(200)
        .json(returnData)
};

module.exports.hotelsGetOne = function(req, res){
    // request the url paramater and save it in hotelID
    var hotelId = req.params.hotelId;
    var thishotel = hotelData[hotelId]; // json array
    console.log("Get the hotelID", hotelId);
    res
        .status(200)
        .json(thishotel)
};

module.exports.hotelsAddOne = function(req, res){
    console.log("POST new hotel");
    console.log(req.body);
    res
        .status(200)
        .json(req.body)
};
