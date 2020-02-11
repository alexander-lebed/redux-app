import express from 'express';
import WebSocket from 'ws';
import Conversation from '../model/conversations';

const router = express.Router();

/*
WebSocket note:
We update relevant WS clients on any update of current conversation or his conversation list
*/
const wss = new WebSocket.Server({ noServer: true });
const clients = new Map();

wss.on('connection', (ws, request) => {
    const hash = request.url.substring(request.url.indexOf('?') + 1, request.url.length);
    // e.g. hash '5a82c91f302f9d_1539251939252' where '5a82c91f302f9d' user ID and '1539251939252' timestamp
    clients.set(hash, ws); // set user connection

    ws.on('error', (msg) => {
        console.log(`--- WS 'conversations' error: ${msg}`);
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
// GET all conversations        .../api/conversations
// GET conversation by id       .../api/conversations?convId={id}
// GET conversation by user     .../api/conversations?userId={id1}
// GET conversation by users    .../api/conversations?userIds={id1,id2}
// PUT conversation             .../api/conversations  +  payload
// DELETE conversation          .../api/conversations?convId={id}

router.get('/', (req, res, next) => {
    if (req.query.convId) {
        // get some conversation by its ID
        Conversation.find({'_id': req.query.convId}, (err, data) => {
            if (err)
                return next(err);
            res.json(data)
        })

    } else if (req.query.userId) {
        // get all conversations for the user
        Conversation.find((err, data) => {
            if (err)
                return next(err);
            const conversations = data.filter(c => c.users.map(u => u._id).includes(req.query.userId));
            res.json(conversations)
        });

    } else if (req.query.userIds) {
        // get some conversation between users
        const queryUserIds = req.query.userIds.split(',');
        const findByUsers = (conversation) => {
            const matchQuantity = conversation.users.length === queryUserIds.length;
            const matchIds = queryUserIds.sort().toString() === conversation.users.map(u => u._id).sort().toString();
            return matchQuantity && matchIds;
        };
        Conversation.find((err, data) => {
            if (err)
                return next(err);
            const conversations = data.filter(findByUsers);
            res.json(conversations)
        });

    } else {
        // get all conversation for all users
        Conversation.find((err, data) => {
            if (err)
                return next(err);
            res.json(data)
        });
    }
});

router.put('/', (req, res, next) => {
    const payload = req.body;
    const currentTime = Date.now();

    const conv = new Conversation();
    if (payload._id) {
        conv._id = payload._id;
        conv.isNew = false; // to make save successfully
    }
    conv.users = payload.users;
    conv.messages = payload.messages;
    conv.timestamp = payload.timestamp || currentTime;

    conv.messages.forEach(m => {
        if(!m.timestamp) {
            m.timestamp = currentTime;
        }
    });

    conv.save((err, conversation) => {
        if (err) {
            return next(err);
        } else {
            res.json(conversation);

            // broadcast updated conversation & conversationS to affected users
            Conversation.find((err, allConversations) => {
                if (err) {
                    return next(err);
                } else {
                    const usersConversations = {};
                    const targetUserIds = conversation.users.map(u => u._id);

                    targetUserIds.forEach(userId => {
                        usersConversations[userId] = allConversations.filter(c => c.users.map(u => u._id).includes(userId));
                    });

                    const connections = [];
                    clients.forEach((ws, key) => {
                        const userId = key.substring(0, key.indexOf('_')); // get user ID from hash
                        connections.push({userId, ws});
                    });

                    const userIds = connections.map(e => e.userId);

                    conversation.users.forEach(user => {
                        if (userIds.includes(user._id)) {
                            const sockets = connections.filter(e => e.userId === user._id).map(e => e.ws);
                            sockets.forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({
                                        conversation: conversation,
                                        conversations: usersConversations[user._id]
                                    }));
                                }
                            })
                        }
                    });
                }
            });
        }
    });
});

router.delete('/', (req, res, next) => {
    const query = {_id : req.query.convId};

    // get conversation to delete
    Conversation.find(query, (err, data) => {
        if (err) {
            return next(err);
        } else {
            const conversation = data[0];

            // delete conversation
            Conversation.find(query).remove((err, data) => {
                if (err) {
                    return next(err);
                } else {
                    res.json(data);

                    // broadcast updated conversationS to affected users
                    Conversation.find((err, allConversations) => {
                        if (err) {
                            return next(err);
                        } else {
                            const targetUserIds = conversation.users.map(u => u._id);
                            const usersConversations = {};

                            targetUserIds.forEach(userId => {
                                usersConversations[userId] = allConversations.filter(c => c.users.map(u => u._id).includes(userId));
                            });

                            const connections = [];
                            clients.forEach((ws, key) => {
                                const userId = key.substring(0, key.indexOf('_'));
                                connections.push({userId, ws});
                            });

                            const userIds = connections.map(e => e.userId);

                            conversation.users.forEach(user => {
                                if (userIds.includes(user._id)) {
                                    const sockets = connections.filter(e => e.userId === user._id).map(e => e.ws);
                                    sockets.forEach(client => {
                                        if (client.readyState === WebSocket.OPEN) {
                                            client.send(JSON.stringify({
                                                conversations: usersConversations[user._id]
                                            }));
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


export default {
    ws: wss,
    router: router
};
