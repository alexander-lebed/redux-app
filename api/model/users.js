'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    online: Boolean,
    pictureUrl: String,
    lastTime: Number,
    oauth: String
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
