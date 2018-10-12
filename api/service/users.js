const express = require("express");
const router = express.Router();
const WebSocket = require('ws');
const User = require('../model/users');

const wss = new WebSocket.Server({ noServer: true });
const clients = new Map();

wss.on('connection', (ws, request) => {
    const hash = request.url.substring(request.url.indexOf('?') + 1, request.url.length);
    // e.g. hash '5a82c91f302f9d_1539251939252' where '5a82c91f302f9d' user ID and '1539251939252' timestamp
    clients.set(hash, ws); // set user connection

    ws.on('error', (msg) => {
        console.log(`--- WS 'users' error: ${msg}`);
    });

    ws.on('close', () => {
        clients.forEach((socket, key) => {
            if (socket.readyState === WebSocket.CLOSED) {
                clients.delete(key);
            }
        });
    });
});

// API:
// GET all users    .../api/users
// GET user         .../api/users?userId={id}
// POST user        .../api/users  +  payload
// PUT user         .../api/users/{id}  +  payload
// DELETE user      .../api/users/{id}

const broadcastAllUsers = () => {
    User.find((err, users) => {
        if (err) {
            console.log(`--- error on broadcast all users: ${err}`);
        } else {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(users));
                }
            })
        }
    });
};

router.get('/', (req, res, next) => {
    if (req.query.userId) {
        const query = User.where('_id', req.query.userId);
        query.find((err, user) => {
            if (err)
                return next(err);
            res.json(user)
        })
    } else {
        User.find((err, users) => {
            if (err)
                return next(err);
            res.json(users)
        });
    }
});

router.post('/', (req, res, next) => {
    const payload = req.body;

    const user = new User();
    user.username = payload.username;
    user.email = payload.email;
    user.password = payload.password;
    user.online = payload.online;
    user.pictureUrl = payload.pictureUrl;
    user.lastTime = payload.lastTime || Date.now();

    user.save((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            broadcastAllUsers();
        }
    });
});

router.put('/:id', (req, res, next) => {
    const query = {_id : req.params.id};
    const options = {upsert: !!req.body.oauth, new: true};
    if (!req.body.lastTime) {
        req.body.lastTime = Date.now();
    }
    User.findOneAndUpdate(query, req.body, options, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            broadcastAllUsers();
        }
    });
});

router.delete('/', (req, res, next) => {
    const query = {_id : req.query.userId};
    User.find(query).remove((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            broadcastAllUsers();
        }
    });
});

module.exports = {
    ws: wss,
    router: router
};
