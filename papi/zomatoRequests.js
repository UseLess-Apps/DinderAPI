require('dotenv').config();
var request = require('request');

var options = {
    url: process.env.ZOMATO_BASE_URL,
    headers: {
        'user-key': process.env.ZOMATO_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

}

export function getCuisines(lat, long, callback) {
    var req = options;
    req.url = req.url + `cuisines?lat=${lat}&lon=${long}`;
    request(req, (error, res, body) => {
        callback(error, res, JSON.parse(body));
    });
}

export function search(lat, long, start, cuisines, callback) {
    var req = options;
    req.url = req.url + `search?lat=${lat}&lon=${long}&start=${start}&cuisines=${cuisines}`;
    request(req, (error, res, body) => {
        callback(error, res, JSON.parse(body));
    })
}