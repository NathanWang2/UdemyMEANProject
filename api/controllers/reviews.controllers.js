var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

// get all reviews from hotel
module.exports.reviewsGetAll = function(req, res){
    // request the url paramater and save it in hotelID
    var hotelId = req.params.hotelId;
    console.log("Get the hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            var response = {
              status : 200,
              message : []
            };
            if (err){
                console.log("Error finding hotels reviews");
                response.status = 500;
                response.message = err;
            } else if (!doc){
                // This states that there is no hotel with the id
                console.log("No hotel was found with id ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + hotelId
                };
            } else {
                // If there is a document for the hotel but has no reviews
                // If there is no reviews go to the false condition
                response.message = doc.reviews ? doc.reviews : [];
            }
            res
                .status(response.status)
                .json(response.message);
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
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding hotels review")
                response.status = 500;
                response.message = err;
            } else if (!hotel){
                // This stats that there is no hotel with the id
                console.log("No hotel was found in db ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + hotelId
                };
            } else {
                // Get the review
                response.message = hotel.reviews.id(reviewId);
                if(!response.message){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID was not found " + reviewId
                    };
                };
            }
            res
                .status(response.status)
                .json(response.message);
    });
};

var _addReview = function(req, res, hotel){
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    hotel.save(function(err, hotelUpdated){
        // When updating the review we should only be returning the review and
        // id. So we don't want to send the whole hotel doc. To extract we know
        // that the new review will be the last in the array
        if (err){
            console.log("Error finding hotels reviews");
            res
                .status(500)
                .json(err);
        } else{
            res
                .status(201)
                // get the review that we just created
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
        }
    });
};

module.exports.reviewsAddOne = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("Get the hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            var response = {
              status : 200,
              message : []
            };
            if (err){
                console.log("Error finding hotels reviews");
                response.status = 500;
                response.message = err;
            } else if (!doc){
                // This states that there is no hotel with the id
                console.log("No hotel was found with id ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + hotelId
                };
            }

            if (doc){
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};

module.exports.reviewsUpdateOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get the reviewID" + reviewId + "for hotelId" + hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding hotels review")
                response.status = 500;
                response.message = err;
            } else if (!hotel){
                // This stats that there is no hotel with the id
                console.log("No hotel was found in db ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + hotelId
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);

                if(!thisReview){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID was not found " + reviewId
                    };
                };
            }

            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisReview.name = req.body.name;
                thisReview.rating = req.body.rating;
                thisReview.review = req.body.review;

                hotel.save(function(err, reviewUpdated){
                    if (err){
                        console.log("Error updating revie");
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
}; // End reviewUpdatedOne

module.exports.reviewsDeleteOne = function(req,res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get the reviewID" + reviewId + "for hotelId" + hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel){
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding hotels review")
                response.status = 500;
                response.message = err;
            } else if (!hotel){
                // This stats that there is no hotel with the id
                console.log("No hotel was found in db ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + hotelId
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);

                if(!thisReview){
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID was not found " + reviewId
                    };
                };
            }

            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            } else {

                hotel.reviews.id(reviewId).remove();
                hotel.save(function(err, reviewUpdated){
                    if (err){
                        console.log("Error updating revie");
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
}; // end reviewsDeleteOne
