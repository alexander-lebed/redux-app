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
    const {username, email, password} = req.body;

    const user = new User();
    (username) ? user.username = username : null;
    (email) ? user.email = email : null;
    (password) ? user.password = password : null;

    console.log(`POST user ${JSON.stringify(user.toObject())}`);

    user.save(function(err) {
        if (err)
            res.send(err);
        res.json(user);
    });
});

router.put('/:id', function(req, res) {
    const query = {_id : req.params.id};
    const options = {upsert: true};
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
