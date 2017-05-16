    var mongoose = require('mongoose');

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
    });

// 1st param is name of model
// 2nd param is name of Schema
// 3rd param is name of db in mongodb (Optional)
// By defualt, 3rd param will be lowercase and plural version of 1st param
mongoose.model('Hotel', hotelSchema, 'hotels');
