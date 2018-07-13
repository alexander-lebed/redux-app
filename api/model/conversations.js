'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    users: [{
        _id: String,
        username: String
    }],
    messages: [{
        from: {
            _id: String,
            username: String
        },
        text: String,
        timestamp: Number,
        read: Boolean,
        deleted: Boolean
    }],
    timestamp: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Conversation', ConversationSchema);