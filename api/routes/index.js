var express = require("express");
var router = express.Router();

var ctrlHotel = require("../controllers/hotels.controllers.js");
var ctrlReviews = require("../controllers/reviews.controllers.js");
var ctrlUsers = require("../controllers/users.controllers.js");

router
    .route("/hotels")
    // .get(ctrlUsers.authentication, ctrlHotel.hotelsGetAll)
    .get(ctrlHotel.hotelsGetAll)
    .post(ctrlHotel.hotelsAddOne);

router
    .route("/hotels/:hotelId")
    .get(ctrlHotel.hotelsGetOne)
    .put(ctrlHotel.hotelsUpdateOne)
    .delete(ctrlHotel.hotelsDeleteOne);

// Review Routes
// This layout is follows
router
    .route("/hotels/:hotelId/reviews")
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authentication, ctrlReviews.reviewsAddOne);

router
    .route("/hotels/:hotelId/reviews/:reviewId")
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// Authentication
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;
