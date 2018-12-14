require('dotenv').config();
const express = require('express');

const zomato = require('./papi/zomatoRequests.js');

const app = express();
const port = process.env.PORT;

app.get('/getCuisineTypes', (req, res) => {
    zomato.getCuisines(req.query.lat, req.query.long, (err, res2, body) => {
        if (err) {
            res.status(500).send("Error in zomato Api");
        }
        if (res2.statusCode == 200) {
            res.send(body);
        }
    });
}) 

app.listen(port, () => {
    console.log("LISTENING ON PORT " + port)
});