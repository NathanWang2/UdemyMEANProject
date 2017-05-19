var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

// get all reviews from hotel
module.exports.reviewsGetAll = function(req, res){
    // request the url paramater and save it in hotelID
    var hotelId = req.params.hotelId;
    console.log("Get the hotelID", hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            res
                .status(200)
                .json(doc.reviews);
    });
};

// get one review from hotel
module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get the reviewID" + reviewId + "for hotelId" + hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
            var review = hotel.reviews.id(reviewId);
            res
                .status(200)
                .json(review);
    });
};
