require('dotenv').config();
var request = require('request');
var promise = require('request-promise-native');

var options = {
    url: process.env.ZOMATO_BASE_URL,
    headers: {
        'user-key': process.env.ZOMATO_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    json: true
}

module.exports.getCuisines = function(lat, long) {
    let req = Object.create(options);
    req.url = req.url + `cuisines?lat=${lat}&lon=${long}`;
    // request(req, (error, res, body) => {
    //     callback(error, res, JSON.parse(body));
    // });
    return promise(req);
}

module.exports.search = function(lat, long, start, cuisines) {
    let req = Object.create(options);
    req.url = req.url + `search?lat=${lat}&lon=${long}&start=${start}&cuisines=${cuisines}`;
    // request(req, (error, res, body) => {
    //     callback(error, res, JSON.parse(body));
    // })
    return promise(req);
}