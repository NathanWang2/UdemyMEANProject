var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function(req, res){
    console.log("Get Json from api/data folder");
    res
        .status(200)
        .json(hotelData)
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
