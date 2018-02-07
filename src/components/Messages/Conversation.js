// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Picker, Emoji } from 'emoji-mart'
import Linkify from 'react-linkify';
import _ from 'lodash';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation } from '../../redux/reducers/conversations';
import type { User, Conversation as ConversationType, Message } from '../../types';

type Props = {
    user: User,
    conversation: ConversationType,
    location: Object,
    getConversation: Function,
    getConversationWithUsers: Function,
    markAsRead: Function,
    deleteMessage: Function,
    saveConversation: Function
}

type State = {
    messageText: string,
    showEmoji: boolean
};

class Conversation extends React.Component<void, Props, State> {

    state: State;
    interval: number;
    scrollableTable: Object;

    constructor(params: any) {
        super(params);
        this.state = {
            messageText: '',
            showEmoji: false
        };
        this.interval = 0;
        this.scrollableTable = {};
    }

    componentDidMount() {
        this.getConversation();
        this.interval = setInterval(() => this.getConversation(), 2000); // periodically update conversation
        setTimeout(() => this.scrollConversationToBottom(), 50);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.conversation.messages.length !== this.props.conversation.messages.length) {
            setTimeout(() => this.scrollConversationToBottom(), 50);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    scrollConversationToBottom = () => {
        if (this.scrollableTable) {
            const el = this.scrollableTable;
            const isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
            if (!isScrolledToBottom) {
                el.scrollTop = el.scrollHeight - el.clientHeight;
            }
        }
    };

    getConversation = () => {
        const query = queryString.parse(this.props.location.search);
        const {convId, userId} = query;
        if (convId) {
            this.props.getConversation(convId);
        } else if (userId) {
            let usersIds = [];
            if (this.props.user._id === userId) { // conversation with oneself
                usersIds = [userId];
            } else {
                usersIds = [this.props.user._id, userId]
            }
            this.props.getConversationWithUsers(usersIds);
        }
        setTimeout(this.props.markAsRead, 500);
    };

    handleKeyPress = (evt) => {
        if (evt.key === 'Enter' && !evt.shiftKey) {
            evt.preventDefault();
            if (this.state.messageText) {
                const {user, conversation} = this.props;
                const currentTime = Date.now();
                const message: Message = {
                    from: {_id: user._id, username: user.username},
                    text: this.state.messageText,
                    timestamp: currentTime,
                    read: false,
                    deleted: false
                };
                conversation.messages.push(message);
                conversation.timestamp = currentTime;
                this.props.saveConversation(conversation);
                this.setState({
                    messageText: ''}
                );
                setTimeout(() => this.scrollConversationToBottom(), 50);
            }
        }
    };

    render() {
        return (
            <Row>
                <Col xsOffset={1} mdOffset={2} xs={10} md={8}>
                    <h4 className='text-center' style={{marginBottom: 20}}>
                        Messages
                    </h4>
                    {this.renderMessages()}
                    {this.renderEmojiPicker()}
                    {this.renderMessageForm()}
                </Col>
            </Row>
        )
    }

    renderMessages = () => {
        const messages = _.orderBy(this.props.conversation.messages.filter(e => !e.deleted), 'timestamp');
        return (
            <div style={style.scrollableTable} ref={(e) => {this.scrollableTable = e}}>
                <Table className='glyphicon-hover'>
                    <tbody>
                        {messages.map((message, index) => {
                            const rowStyle = !message.read ? {backgroundColor: '#e6fff2'} : {};
                            return (
                                <tr key={index} style={rowStyle}>
                                    <td>{this.renderMessage(message)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    };

    renderMessage = (message: Message) => {
        const {user, deleteMessage} = this.props;
        const isMessageFromCurrentUser = message.from._id === user._id;
        return (
            <div>
                <Row style={{...style.top, ...{marginRight: 0}}}>
                    <Col xs={9}>
                        <div>
                            <span style={style.from}>
                                {message.from.username}
                            </span>
                            <span style={{paddingLeft: 15}}>
                                {timestampToHumanDate(message.timestamp)}
                            </span>
                        </div>
                    </Col>
                    <Col xs={3}>
                        {isMessageFromCurrentUser &&
                        <Glyphicon
                            id='remove'
                            glyph='remove'
                            className='pull-right cursor'
                            onClick={() => deleteMessage(message._id)}
                        />
                        }
                    </Col>
                </Row>
                <Linkify>
                    <div style={style.text}>
                        {message.text}
                    </div>
                </Linkify>
            </div>
        )
    };

    renderEmojiPicker = () => {
        const {messageText, showEmoji} = this.state;
        return (
            <div>
                {showEmoji &&
                <div className='pull-right'>
                    <Picker
                        title='pick your emoji…'
                        emoji='monkey'
                        native={true}
                        onClick={emoji => {
                            const text = messageText ? messageText + ` ${emoji.native}` : emoji.native;
                            this.setState({messageText: text});
                        }}
                    />
                </div>
                }
            </div>
        )
    };

    renderMessageForm = () => (
        <form>
            <FormGroup controlId='message-form' style={{display: 'flex'}}>
                <FormControl
                    componentClass='textarea'
                    style={style.textarea}
                    rows={4}
                    placeholder='Write a message...'
                    value={this.state.messageText}
                    onKeyPress={this.handleKeyPress}
                    onChange={e => this.setState({messageText: e.target.value})}
                />
                <div className='cursor' style={style.emojiSelect}>
                    <Emoji
                        set='twitter'
                        size={32}
                        emoji='slightly_smiling_face'
                        onClick={() => this.setState({showEmoji: !this.state.showEmoji})}
                    />
                </div>
            </FormGroup>
        </form>
    )
}

const style = {
    scrollableTable: {
        overflowY: 'auto',
        maxHeight: '60vh',
        marginBottom: 20
    },
    top: {
        color: 'grey',
        fontSize: 13
    },
    from: {
        color: '#42648b',
        fontSize: 15,
        fontWeight: 700
    },
    text: {
        fontSize: 15,
        paddingTop: 5,
        whiteSpace: 'pre-wrap'
    },
    textarea: {
        resize: 'none',
        flex: 1,
        paddingRight: 60
    },
    emojiSelect: {
        paddingTop: 10,
        paddingRight: 10,
        marginLeft: -43
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        conversation: state.conversations.conversation
    }),
    { getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation }
)(Conversation);