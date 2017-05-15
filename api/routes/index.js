var express = require("express");
var router = express.Router();
var ctrlHotel = require("../controllers/hotels.controllers.js");

router
    .route("/json")
    .get(ctrlHotel.hotelsGetAll);

module.exports = router;
