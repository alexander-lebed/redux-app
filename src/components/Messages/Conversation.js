// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversation, getConversationWithUsers, markAsRead, saveConversation } from '../../redux/reducers/conversations';
import type { User, Conversation as ConversationType, Message } from '../../types';

type Props = {
    user: User,
    conversation: ConversationType,
    location: Object,
    getConversation: Function,
    getConversationWithUsers: Function,
    markAsRead: Function,
    saveConversation: Function
}

type State = {
    messageText: string
};

class Conversation extends React.Component<void, Props, State> {

    state: State;
    interval: number;
    scrollableTable: Object;

    constructor(params: any) {
        super(params);
        this.state = {
            messageText: ''
        };
        this.interval = 0;
        this.scrollableTable = {};
    }

    componentDidMount() {
        this.getConversation();
        // periodically updated conversation info
        this.interval = setInterval(() => this.getConversation(), 2000);
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
        const el = this.scrollableTable;
        const isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
        if (!isScrolledToBottom) {
            el.scrollTop = el.scrollHeight - el.clientHeight;
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
        if (evt.key === "Enter" && !evt.shiftKey) {
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
        const {conversation} = this.props;
        return (
            <div>
                <Row>
                    <Col xsOffset={1} mdOffset={2} xs={10} md={8}>
                        <h4 style={{marginBottom: 20}} className='text-center'>
                            Messages
                        </h4>
                        <div style={style.scrollableTable} ref={(e) => {this.scrollableTable = e}}>
                            <Table className='glyphicon-hover'>
                                <tbody>
                                    {_.orderBy(conversation.messages, 'timestamp').map((message, index) => {
                                        return (
                                            <tr key={index} style={!message.read ? {backgroundColor: '#e6fff2'} : {}}>
                                                <td>
                                                    <Row style={{...style.top, ...{marginRight: 0}}}>
                                                        <Col xs={9}>
                                                            <span>
                                                                <span style={style.from}>
                                                                    {message.from.username}
                                                                </span>
                                                                <span style={{paddingLeft: 15}}>
                                                                    {timestampToHumanDate(message.timestamp)}
                                                                </span>
                                                            </span>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Glyphicon
                                                                id='remove'
                                                                glyph='remove'
                                                                className='pull-right cursor'
                                                                onClick={() => {}}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <div style={style.text}>
                                                        {message.text}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                        <form>
                            <FormGroup controlId="message">
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Write a message..."
                                    value={this.state.messageText}
                                    onKeyPress={this.handleKeyPress}
                                    onChange={e => this.setState({messageText: e.target.value})}
                                />
                            </FormGroup>
                        </form>

                    </Col>
                </Row>
            </div>
        )
    }
}

const style = {
    scrollableTable: {
        overflowY: 'auto',
        maxHeight: '60vh',
        marginBottom: 20
    },
    top: {
        color: 'grey',
        fontSize: 13,
        marginBottom: 5
    },
    from: {
        color: '#42648b',
        fontSize: 15,
        fontWeight: 700
    },
    text: {
        fontSize: 15
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        conversation: state.conversations.conversation
    }),
    { getConversation, getConversationWithUsers, markAsRead, saveConversation }
)(Conversation);