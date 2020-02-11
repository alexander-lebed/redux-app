import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
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

export default mongoose.model('Conversation', ConversationSchema);