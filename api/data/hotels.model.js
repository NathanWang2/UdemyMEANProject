var mongoose = require('mongoose');
// Nested doc Schema should be before the main

// create seperate schema for sub documents
// after creating, refrence this in the main schema
var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        mac: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

// Another sub Schema
var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    services: [String], // This is an array [] of strings
    description: String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema], // Refrencing the reviewSchema
    rooms: [roomSchema],
    location: {
        address: String,
        // geospachial json data storage
        // Always longitude (E/W) then latitude (N/S)
        // To allow tracking, we need to index this
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

// 1st param is name of model
// 2nd param is name of Schema
// 3rd param is name of db in mongodb (Optional)
// By defualt, 3rd param will be lowercase and plural version of 1st param
mongoose.model('Hotel', hotelSchema, 'hotels');
