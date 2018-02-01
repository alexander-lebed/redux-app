// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
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

    interval: number;
    state: State;

    constructor(params: any) {
        super(params);
        this.interval = 0;
        this.state = {
            messageText: ''
        };
    }

    componentDidMount() {
        this.getConversation();

        // periodically updated conversation info
        this.interval = setInterval(() => this.getConversation(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

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
            )
        }
    };

    render() {
        const {user, conversation} = this.props;
        return (
            <div>
                <Row>
                    <Col xs={2}>
                        <LinkContainer to='/conversations'>
                            <Button bsStyle='link'>
                                <Glyphicon glyph="arrow-left" /> Back
                            </Button>
                        </LinkContainer>
                    </Col>
                    <Col xs={8}>
                        <h2 className='text-center'>Messages</h2>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th style={{width: 150}}>From</th>
                                    <th>Text</th>
                                    <th style={{width: 170}}>When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.orderBy(conversation.messages, 'timestamp').map((message, index) => {
                                    const from = message.from._id === user._id ? 'Me' : message.from.username;
                                    return (
                                        <tr key={index} style={!message.read ? {backgroundColor: '#e6fff2'} : {}}>
                                            <td>{from}</td>
                                            <td>{message.text}</td>
                                            <td>{moment(message.timestamp).format("HH:mm, DD MMM 'YY")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

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

export default connect(
    state => ({
        user: state.authentication.user,
        conversation: state.conversations.conversation
    }),
    { getConversation, getConversationWithUsers, markAsRead, saveConversation }
)(Conversation);