import path from 'path';
import express from 'express';
import url from 'url';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userApi from './api/service/users';
import conversationApi from './api/service/conversations';

const app           = express();
const router        = express.Router();
const mongoDB       = 'mongodb://gorodovoy:gorodovoy@ds229388.mlab.com:29388/messenger';
const isDevelopment = process.env.NODE_ENV !== 'production';
const port          = isDevelopment ? process.env.API_PORT || 3000 : process.env.PORT || 3000;

console.log(`--- mode: ${process.env.NODE_ENV}`);

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

router.use('/users', userApi.router);
router.use('/conversations', conversationApi.router);
// use router configuration for API
app.use('/api', router);

// serve index.html to the client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

// start the server and listen for requests
const server = app.listen(port, () => {
    console.log(`--- API running on port ${port}`);
});

// apply WebSockets with different paths
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


const stopHandler = (signal) => {
    console.error(`\nGracefully shutting down from ${signal}`);
    server.close();
    process.exit(1);
};

process.on('SIGTERM', stopHandler, 'SIGTERM');
process.on('SIGINT', stopHandler, 'SIGINT');
process.on('SIGHUP', stopHandler, 'SIGINT');