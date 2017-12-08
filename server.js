'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./api/service/users');

const app = express();
const router = express.Router();

const mongoDB = 'mongodb://localhost/gorodovoydb'; // or use cloud 'mongodb://guser:gpassword@ds131546.mlab.com:31546/gorodovoydb';
const port = process.env.API_PORT || 3001;

mongoose.connect(mongoDB, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// to prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// now  we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.use('/users', users);

// use our router configuration when we call /api
app.use('/api', router);

// starts the server and listens for requests
app.listen(port, function() {
    console.log(`Api running on port ${port}`);
});