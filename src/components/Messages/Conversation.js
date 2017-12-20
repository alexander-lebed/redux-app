// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Table } from 'react-bootstrap';
import { getMessagesByConversation } from '../../redux/reducers/conversations';
import type { User } from '../../types';

type Props = {
    user: User,
    messages: Array<Object>,
    location: Object,
    getMessagesByConversation: Function
}

class Conversation extends React.Component<void, Props, void> {

    componentDidMount() {
        const conversationId = this.props.location.search.substring(1);
        this.props.getMessagesByConversation(conversationId);
    }

    render() {
        const {user, messages} = this.props;
        return (
            <div>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        <h2 className='text-center'>Messages</h2>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>From</th>
                                    <th>Text</th>
                                    <th style={{width: 170}}>When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(message => {
                                    const from = message.from._id === user._id ? 'Me' : message.from.username;
                                    return (
                                        <tr key={message._id}>
                                            <td>{message._id}</td>
                                            <td>{from}</td>
                                            <td>{message.text}</td>
                                            <td>{moment(message.timestamp).format("HH:mm, DD MMM 'YY")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        messages: state.conversations.messages
    }),
    { getMessagesByConversation }
)(Conversation);