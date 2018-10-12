'use strict';

const path = require('path');
const express = require('express');
const url = require('url');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userApi = require('./api/service/users');
const conversationApi = require('./api/service/conversations');
const places = require('./api/service/places');

const app           = express();
const router        = express.Router();
const mongoDB       = 'mongodb://gorodovoy:gorodovoy@ds229388.mlab.com:29388/messenger'; // mongodb://localhost/gorodovoydb
const isDevelopment = process.env.NODE_ENV !== 'production';
const port          = isDevelopment ? process.env.API_PORT || 3000 : process.env.PORT || 3000;

console.log(`--- development mode: ${isDevelopment}`);

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (!isDevelopment) {
    app.use(express.static(__dirname + '/'));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// to prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove caching so we get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// now  we can set the route path & initialize the API
router.get('/', (req, res) => {
    res.json({ message: 'API initialized!'});
});

router.use('/users', userApi.router);
router.use('/conversations', conversationApi.router);
router.use('/places', places);

// use our router configuration when we call /api
app.use('/api', router);

// serve index.html to the client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

// starts the server and listens for requests
const server = app.listen(port, () => {
    console.log(`Api running on port ${port}`);
});

// apply web sockets with different paths
server.on('upgrade', (request, socket, head) => {

    const pathname = url.parse(request.url).pathname;

    if (pathname === '/users') {
        userApi.ws.handleUpgrade(request, socket, head, (ws) => {
            userApi.ws.emit('connection', ws, request);
        });
    } else if (pathname === '/conversations') {
        conversationApi.ws.handleUpgrade(request, socket, head, (ws) => {
            conversationApi.ws.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});