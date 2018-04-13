const $http = require("axios");
const express = require("express");
const router = express.Router();

const GOOGLE_API_KEY = 'AIzaSyB2eUKWyroNCGDwhXq-C24Uo58eJNJUYjI';

router.get('/', function(req, res, next) {
    $http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key=${GOOGLE_API_KEY}&input=${req.query.city}`)
        .then(response => {
            res.json(response.data.predictions);
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = router;
