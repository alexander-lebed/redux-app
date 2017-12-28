'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    online: Boolean,
    lastTime: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
