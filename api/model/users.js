import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

export default mongoose.model('User', UserSchema);
