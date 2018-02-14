'use strict';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./api/service/users');
const conversations = require('./api/service/conversations');

const app           = express();
const router        = express.Router();
const mongoDB       = 'mongodb://gorodovoy:gorodovoy@ds229388.mlab.com:29388/messenger'; // mongodb://localhost/gorodovoydb
const isDevelopment = process.env.NODE_ENV !== 'production';
const port          = isDevelopment ? process.env.API_PORT || 3000 : process.env.PORT || 3000;
// const DIST_DIR      = path.join(__dirname, 'dist');

console.log(`--- development mode: ${isDevelopment}`);

mongoose.connect(mongoDB, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (!isDevelopment) {
    app.use(express.static(__dirname + '/')); // DIST_DIR
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// to prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove caching so we get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// now  we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API initialized!'});
});

router.use('/users', users);
router.use('/conversations', conversations);

// use our router configuration when we call /api
app.use('/api', router);

// capture all page requests and directs them to the client
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html')) // path.join(DIST_DIR, 'index.html');
});

// starts the server and listens for requests
app.listen(port, function() {
    console.log(`Api running on port ${port}`);
});