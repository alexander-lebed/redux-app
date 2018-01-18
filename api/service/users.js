const express = require("express");
const router = express.Router();
const User = require('../model/users');

// GET all users    http://localhost:3001/api/users
// GET user         http://localhost:3001/api/users?userId={id}
// POST user        http://localhost:3001/api/users  +  payload
// PUT user         http://localhost:3001/api/users/{id}  +  payload
// DELETE user      http://localhost:3001/api/users/{id}

router.get('/', function(req, res) {
    if (req.query.userId) {
        const query = User.where('_id', req.query.userId);
        query.find(function (err, user) {
            if (err)
                res.send(err);
            res.json(user)
        })
    }

    User.find(function(err, comments) {
        if (err)
            res.send(err);
        res.json(comments)
    });
});

router.post('/', function(req, res) {
    const payload = req.body;

    const user = new User();
    user.username = payload.username;
    user.email = payload.email;
    user.password = payload.password;
    user.online = payload.online;
    user.lastTime = payload.lastTime;

    user.save(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.put('/:id', function(req, res) {
    const query = {_id : req.params.id};
    const options = {upsert: false};
    User.findOneAndUpdate(query, req.body, options, function(err, result) {
        if (err)
            res.send(err);
        res.json(result);
    });
});

router.delete('/:id', function(req, res) {
    const query = {_id : req.params.id};
    User.find(query).remove(function(err, result) {
        if (err)
            res.send(err);
        res.json(result);
    });
});

module.exports = router;
