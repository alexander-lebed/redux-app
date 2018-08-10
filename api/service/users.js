const express = require("express");
const router = express.Router();
const User = require('../model/users');

// GET all users    .../api/users
// GET user         .../api/users?userId={id}
// POST user        .../api/users  +  payload
// PUT user         .../api/users/{id}  +  payload
// DELETE user      .../api/users/{id}

router.get('/', function(req, res, next) {
    if (req.query.userId) {
        const query = User.where('_id', req.query.userId);
        query.find(function (err, user) {
            if (err)
                return next(err);
            res.json(user)
        })
    } else {
        User.find(function(err, comments) {
            if (err)
                return next(err);
            res.json(comments)
        });
    }
});

router.post('/', function(req, res, next) {
    const payload = req.body;

    const user = new User();
    user.username = payload.username;
    user.email = payload.email;
    user.password = payload.password;
    user.online = payload.online;
    user.pictureUrl = payload.pictureUrl;
    user.lastTime = payload.lastTime || Date.now();

    user.save(function(err, data) {
        if (err)
            return next(err); //res.send(err);
        res.json(data);
    });
});

router.put('/:id', function(req, res, next) {
    const query = {_id : req.params.id};
    const options = {upsert: !!req.body.oauth, new: true};
    if (!req.body.lastTime) {
        req.body.lastTime = Date.now();
    }
    User.findOneAndUpdate(query, req.body, options, function(err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});

router.delete('/', function(req, res, next) {
    const query = {_id : req.query.userId};
    User.find(query).remove(function(err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});

module.exports = router;
