const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Conversation = require('../model/conversations');

// GET all conversations        .../api/conversations
// GET conversation by id       .../api/conversations?convId={id}
// GET conversation by user     .../api/conversations?userId={id1}
// GET conversation by users    .../api/conversations?userIds={id1,id2}
// PUT conversation             .../api/conversations  +  payload
// DELETE conversation          .../api/conversations?convId={id}

router.get('/', function(req, res, next) {
    if (req.query.convId) {
        // get some conversation by its ID

        Conversation.find({'_id': req.query.convId}, function (err, data) {
            if (err)
                return next(err);
            res.json(data)
        })

    } else if (req.query.userId) {
        // get all conversations for the user

        Conversation.find(function(err, data) {
            if (err)
                return next(err);
            const conversations = data.filter(c => c.users.map(u => u._id).includes(req.query.userId));
            res.json(conversations)
        });

    } else if (req.query.userIds) {
        // get some conversation between users

        const userIdsArr = req.query.userIds.split(',');
        const findByUsers = (conversation) => {
            const matchQuantity = conversation.users.length === userIdsArr.length;
            const convUsers = conversation.users.map(u => u._id).sort();
            const matchIds = _.isEqual(convUsers, userIdsArr.sort());
            return matchQuantity && matchIds;
        };
        Conversation.find(function(err, data) {
            if (err)
                return next(err);
            const conversations = data.filter(findByUsers);
            res.json(conversations)
        });

    } else {
        // get all conversation for all users

        Conversation.find(function(err, data) {
            if (err)
                return next(err);
            res.json(data)
        });
    }
});

router.put('/', function(req, res, next) {
    const payload = req.body;

    const conv = new Conversation();
    if (payload._id) {
        conv._id = payload._id;
        conv.isNew = false; // to make save successfully
    }
    conv.users = payload.users;
    conv.messages = payload.messages;
    conv.timestamp = payload.timestamp;

    conv.save(function(err, data) {
        if (err)
            return next(err); //res.send(err);
        res.json(data);
    });
});

router.delete('/', function(req, res, next) {
    const query = {_id : req.query.convId};
    Conversation.find(query).remove(function(err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});

module.exports = router;
