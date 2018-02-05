// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import { Row, Col, Table, Badge, Glyphicon } from 'react-bootstrap';
import history from '../../helpers/history';
import { getConversationsByUser, deleteConversation } from '../../redux/reducers/conversations';
import type { User, Conversation as ConversationType } from '../../types';

type Props = {
    user: User,
    conversations: Array<ConversationType>,
    getConversationsByUser: Function,
    deleteConversation: Function
}

class Conversations extends React.Component<void, Props, void> {

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    goToConversation = (convId: string) => {
        history.push(`/conversation?${queryString.stringify({convId})}`);
    };

    deleteConfirmation = (convId: string) => {
        if (confirm('Are you sure you want to delete this conversation?')) {
            this.props.deleteConversation(convId);
        }
    };

    getLastMessageTime = (timestamp: number) => {
        let time = '';
        const now = moment();
        if (now.format('YYYY') !== moment(timestamp).format('YYYY')) {
            time = moment(timestamp).format('DD MMM YYYY')
        } else if (now.format('DD MMM') !== moment(timestamp).format('DD MMM')) {
            time = moment(timestamp).format('DD MMM')
        } else {
            time = moment(timestamp).format('HH:mm')
        }
        return time;
    };

    render() {
        const {user, conversations} = this.props;
        const tableBody = conversations.map(conv => {
            const newMessages = conv.messages.filter(m => !m.read && m.from._id !== user._id);
            const lastConv = conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
            const senders = conv.users.length === 1 ?
                conv.users[0].username : // conversation with oneself
                conv.users.filter(u => u._id !== user._id).map(u => u.username).join(', ');
            return (
                <tr
                    key={conv._id}
                    style={newMessages.length > 0 ? {backgroundColor: '#e6fff2'} : {}}
                >
                    <td className='cursor' style={style.conversation} >
                        <Row>
                            <Col xs={9} onClick={() => this.goToConversation(conv._id)}>
                                {senders}
                            </Col>
                            <Col xs={3} style={style.convRight}>
                                <span>
                                    {newMessages.length && <Badge style={{marginRight: 15}}>{newMessages.length}</Badge>}
                                    {this.getLastMessageTime(conv.timestamp)}
                                    <Glyphicon
                                        id='remove-todo'
                                        glyph='remove'
                                        className='cursor'
                                        style={{paddingLeft: 10}}
                                        onClick={() => this.deleteConfirmation(conv._id)}
                                    />
                                </span>
                            </Col>
                        </Row>
                        <Row onClick={() => this.goToConversation(conv._id)}>
                            <Col xs={7} xsOffset={2}>
                                {lastConv &&
                                <Row style={style.message}>
                                    <Col xs={2} className='text-right'>{lastConv.from.username}:</Col>
                                    <Col xs={10}>{lastConv.text}</Col>
                                </Row>
                                }
                            </Col>
                            <Col xs={3} />
                        </Row>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        <h2 className='text-center'>Conversations</h2>
                        <Table responsive hover>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

const style = {
    conversation: {
        fontFamily: '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;'
    },
    convRight: {
        color: 'grey',
        textAlign: 'right',
        fontSize: 15
    },
    message: {
        color: 'grey',
        fontSize: 13,
        fontFamily: '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;'
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations
    }),
    { getConversationsByUser, deleteConversation }
)(Conversations);