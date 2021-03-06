require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var zomato = require('./papi/zomatoRequests.js');
var helper = require('./helper_modules/helper');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello");
}) 

app.get('/getCuisineTypes', (req, res) => {
    // zomato.getCuisines(req.query.lat, req.query.long, (err, res2, body) => {
    //     if (err) {
    //         res.status(500).send("Error in zomato Api");
    //     }
    //     if (res2.statusCode == 200) {
    //         res.send(body);
    //     }
    // });
    zomato.getCuisines(req.query.lat, req.query.long)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        res.status(500).send("Error in zomato Api");
    })
}) 

app.post('/getMatches', (req, res) => {
    console.log(req.body.cuisines);
    let cuisinesArray = req.body.cuisines;
    let cuisinesString = '';
    cuisinesArray.forEach(element => {
        cuisinesString += `${element},`
    });
    cuisinesString = cuisinesString.substring(0, cuisinesString.length - 1);
    // zomato.search(req.query.lat, req.query.long, req.query.start, cuisinesString, (err, res2, body2) => {
    //     if (err) {
    //         res.status(500).send("Error in zomato Api");
    //     }
    //     if (res2.statusCode == 200) {
    //         console.log(typeof body2);
    //         console.log(body2)
    //         let restaurants = body2.restaurants;
    //         res.send(restaurants)
    //     }
    // })

    zomato.search(req.query.lat, req.query.long, req.query.start, cuisinesString)
    .then(result => {
        // get necessary restaurant information
        let clean_restaurants = [];
        result.restaurants.forEach((restaurant) => {
            clean_restaurants.push(helper.cleanRestaurant(restaurant));
        });
        res.send(clean_restaurants);
    })
    .catch(error => {
        res.status(500).send("Error in zomato Api");
    });
})

app.listen(port, () => {
    console.log("LISTENING ON PORT " + port)
});