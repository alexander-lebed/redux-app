// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Map } from 'immutable';
import { Row, Col, Table, Badge, Glyphicon } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversationsByUser, deleteConversation, conversationsCleanup } from '../../redux/reducers/conversations';
import type { User, Conversation as ConversationType } from '../../types';

type Props = {
    history: Object,
    user: User,
    users: Map<string, User>,
    conversations: Array<ConversationType>,
    getConversationsByUser: Function,
    deleteConversation: Function,
    conversationsCleanup: Function
}

class Conversations extends React.Component<void, Props, void> {

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    componentWillUnmount() {
        this.props.conversationsCleanup();
    }

    goToConversation = (convId: string) => {
        this.props.history.push(`/conversation?${queryString.stringify({convId})}`);
    };

    deleteConfirmation = (convId: string) => {
        if (confirm('Are you sure you want to delete this conversation?')) {
            this.props.deleteConversation(convId);
        }
    };

    render() {
        const {user, users, conversations} = this.props;
        let content = [];
        if (conversations.length === 0) {
            content = (
                <div className='text-center'>
                    {'You don\'t have any conversations yet'}
                </div>
            )
        } else {
            const tableBody = conversations.map(conv => {
                const convMessages = conv.messages.filter(e => !e.deleted);
                const newMessages = convMessages.filter(m => !m.read && m.from._id !== user._id);
                const lastMessage = convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;
                const textStyle = lastMessage && !lastMessage.read ? {...style.text, ...{backgroundColor: '#edf0f5'}} : style.text;

                const convUserIds =  conv.users.map(u => u._id);
                let senders: Array<User> = users.toArray().filter(u => convUserIds.includes(u._id));
                if (senders.length > 1) {
                    senders = senders.filter(u => u._id !== user._id); // exclude recipient
                }
                return (
                    <tr
                        key={conv._id}
                        style={newMessages.length > 0 ? {backgroundColor: '#edf0f5'} : {}}
                    >
                        <td className='cursor' style={style.conversation} >
                            <Row>
                                <Col xs={9} onClick={() => this.goToConversation(conv._id)}>
                                    {senders.map(sender => (
                                        <span key={sender._id} style={sender.online ? {color: MAIN_COLOR} : {}}>
                                            {sender.username}
                                        </span>
                                    ))}
                                </Col>
                                <Col xs={3} style={style.convRight}>
                                    <span>
                                        {newMessages.length > 0 && <Badge style={{marginRight: 15}}>{newMessages.length}</Badge>}
                                        {timestampToHumanDate(conv.timestamp)}
                                        <Glyphicon
                                            id='remove'
                                            glyph='remove'
                                            className='cursor'
                                            style={{paddingLeft: 10}}
                                            onClick={() => this.deleteConfirmation(conv._id)}
                                        />
                                    </span>
                                </Col>
                            </Row>
                            {lastMessage &&
                            <Row style={style.message} onClick={() => this.goToConversation(conv._id)}>
                                <Col xs={3} sm={2} className='text-right' style={{paddingRight: 0}}>
                                    {lastMessage.from.username}:
                                </Col>
                                <Col xs={7} sm={8} style={textStyle}>{lastMessage.text}</Col>
                            </Row>
                            }
                        </td>
                    </tr>
                )
            });

            content = (
                <Table hover className='glyphicon-hover'>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
            )
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <h4 style={{marginBottom: 20}} className='text-center'>
                        Conversations
                    </h4>
                    {content}
                </Col>
            </Row>
        )
    }
}

const style = {
    conversation: {
        fontSize: 15
    },
    convRight: {
        color: 'grey',
        textAlign: 'right'
    },
    message: {
        color: 'grey',
        fontSize: 13
    },
    text: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        marginLeft: 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3, // N number of lines to show
        lineHeight: 1.154   // X fallback
        // maxHeight: 3.462    // N * X
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        conversations: state.conversations.conversations
    }),
    { getConversationsByUser, deleteConversation, conversationsCleanup }
)(Conversations);