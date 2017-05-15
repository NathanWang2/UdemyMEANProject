var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function(req, res){
    console.log("Get Json from api/data folder");
    res
    .status(200)
    .json(hotelData)
};
