'use strict';

const path = require('path');
const express = require('express');
const url = require('url');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userApi = require('./api/service/users');
const conversationApi = require('./api/service/conversations');

const app           = express();
const router        = express.Router();
const mongoDB       = 'mongodb://gorodovoy:gorodovoy@ds229388.mlab.com:29388/messenger';
const isDevelopment = process.env.NODE_ENV !== 'production';
const port          = isDevelopment ? process.env.API_PORT || 3000 : process.env.PORT || 3000;

console.log(`--- ${isDevelopment ? 'development' : 'production'} mode`);

mongoose.connect(mongoDB, { // reconnect if internet connection was interrupted
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (!isDevelopment) {
    app.use(express.static(__dirname + '/'));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set headers to allow Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    // remove caching to get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// set route path & initialize API
router.get('/', (req, res) => {
    res.json({ message: 'API initialized'});
});

router.use('/users', userApi.router);
router.use('/conversations', conversationApi.router);

// use our router configuration when we call /api
app.use('/api', router);

// serve index.html to the client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

// start the server and listen for requests
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