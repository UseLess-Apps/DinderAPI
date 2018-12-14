require('dotenv').config();
var request = require('request');

var options = {
    url: process.env.ZOMATO_BASE_URL,
    headers: {
        'user-key': process.env.ZOMATO_KEY
    }

}

exports.getCuisines = function getCuisines(lat, long, callback) {
    var req = options;
    req.url = req.url + "cuisines?lat=${lat}&lon=${long}";
    request(req, (error, res, body) => {
        callback(error, res, body);
    });
}

