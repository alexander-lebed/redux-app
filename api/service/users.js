import express from 'express';
import WebSocket from 'ws';
import nodemailer from 'nodemailer';
import User from '../model/users';

const router = express.Router();

// SMTP transport
const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'wtalk.messenger@gmail.com',
        pass: 'WTalk12345',
    }
});
// verify connection
transporter.verify((error) => {
    if (error) {
        console.log(`--- SMTP server error: ${error}`);
    } else {
        console.log('--- SMTP server is ready');
    }
});

/*
WebSocket note:
We update all WS clients on any user update
*/
const wss = new WebSocket.Server({ noServer: true });
const clients = new Map();

wss.on('connection', (ws, request) => {
    const hash = request.url.substring(request.url.indexOf('?') + 1, request.url.length);
    // e.g. hash '5a82c91f302f9d_1539251939252' where '5a82c91f302f9d' user ID and '1539251939252' timestamp
    clients.set(hash, ws); // set user connection

    ws.on('error', (msg) => {
        console.log(`--- WS 'users' error: ${msg}`);
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
// GET all users    .../api/users
// GET user         .../api/users?userId={id}
// POST user        .../api/users  +  payload
// PUT user         .../api/users/{id}  +  payload
// DELETE user      .../api/users/{id}

router.get('/', (req, res, next) => {
    if (req.query.userId) {
        const query = User.where('_id', req.query.userId);
        query.find((err, user) => {
            if (err)
                return next(err);
            res.json(user)
        })
    } else {
        User.find((err, users) => {
            if (err)
                return next(err);
            res.json(users)
        });
    }
});

router.post('/', (req, res, next) => {
    const payload = req.body;

    const user = new User();
    user.username = payload.username;
    user.email = payload.email;
    user.password = payload.password;
    user.online = payload.online;
    user.pictureUrl = payload.pictureUrl;
    user.lastTime = payload.lastTime || Date.now();

    user.save((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            sendEmail(payload);
            broadcastAllUsers();
        }
    });
});

router.put('/:id', (req, res, next) => {
    const query = {_id : req.params.id};
    const options = {upsert: !!req.body.oauth, new: true};
    if (!req.body.lastTime) {
        req.body.lastTime = Date.now();
    }
    User.findOneAndUpdate(query, req.body, options, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            broadcastAllUsers();
        }
    });
});

router.delete('/', (req, res, next) => {
    const query = {_id : req.query.userId};
    User.find(query).remove((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            broadcastAllUsers();
        }
    });
});

const broadcastAllUsers = () => {
    User.find((err, users) => {
        if (err) {
            console.log(`--- error on broadcast all users: ${err}`);
        } else {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(users));
                }
            })
        }
    });
};

const sendEmail = (user) => {
    const mailOptions = {
        from: '"WTalk Messenger" <wtalk.messenger@gmail.com>',
        to: user.email,
        subject: 'Sign up on WTalk messenger',
        html: getSignUpHTML(user.username)
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`--- Email sent: ${info.messageId}`);
    });
};

const getSignUpHTML = (username) => {
    return `<div style="background:#f1f1f1;height:100%;line-height:1.6;;width:100%!important">
<table style="width:100%" bgcolor="#f1f1f1">
	<tbody>
		<tr>
		<td style="clear:both!important;display:block!important;margin:0 auto;max-width:600px!important;padding:0;" valign="top">
			<div style="display:block;margin:0 auto;max-width:600px;padding:10px">
				<div style="margin-bottom: 10px">
				    <table width="100%" cellPadding="0" cellSpacing="0">
				        <tbody>
				        	<tr>
					            <td style="text-align:center;" align="center" valign="top">
					                <a href="https://wtalk.herokuapp.com" target="_blank">
					                	<img src="https://i.postimg.cc/MpWqP6FW/favicon.png" height="80" alt="WTalk">
					                </a>
					            </td>
				        	</tr>
				    	</tbody>
					</table>
				</div>
			<table width="100%" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:3px;border:1px solid #e9e9e9;width:100%" bgcolor="#fff">
			    <tbody>
			    	<tr>
			        <td style="margin:0;padding:30px;" valign="top">
			            <table width="100%" cellPadding="0" cellSpacing="0" style="">
			                <tbody>
			                	<tr>
			                		<td valign="top">
				                        <h2 style="font-size:24px;font-weight:400;line-height:1.4;">
				                        	Hello ${username},
				                        </h2>
				                        Thank you for joining <a href="https://wtalk.herokuapp.com" target="_blank">WTalk Messenger</a>.
				                    </td>
				                </tr>
			            	</tbody>
			            </table>
			        </td>
			    	</tr>
				</tbody>
			</table>

			<div style="clear:both;color:grey;width:100%">
			    <table width="100%">
			        <tbody>
			        	<tr>
						<td style="font-size:12px;margin:0;padding:20px 0;text-align:center;" align="center" valign="top">
							Have questions? Please reply to this email.
							<br>
							<a href="https://wtalk.herokuapp.com" style="color:#28a745;font-size:12px;text-decoration:underline" target="_blank">WTalk.com</a> - Simple Web Messenger
			            </td>
				        </tr>
				    </tbody>
				</table>
			</div>
		</div>
		</td>
		</tr>
	</tbody>
</table>
</div>`
};

export default {
    ws: wss,
    router: router
};