var express = require("express");
var router = express.Router();

var ctrlHotel = require("../controllers/hotels.controllers.js");
var ctrlReviews = require("../controllers/reviews.controllers.js");

router
    .route("/hotels")
    .get(ctrlHotel.hotelsGetAll);

router
    .route("/hotels/:hotelId")
    .get(ctrlHotel.hotelsGetOne);

router
    .route("/hotels/new")
    .post(ctrlHotel.hotelsAddOne);

// Review Routes
// This layout is follows
router
    .route("/hotels/:hotelId/reviews")
    .get(ctrlReviews.reviewsGetAll);

router
    .route("/hotels/:hotelId/reviews/:reviewId")
    .get(ctrlReviews.reviewsGetOne);

module.exports = router;
