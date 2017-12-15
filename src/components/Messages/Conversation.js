// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import moment from 'moment';
import { Row, Col, Table } from 'react-bootstrap';
import { getMessagesByConversation } from '../../redux/reducers/conversations';
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>,
    messages: Array<Object>,
    getMessagesByConversation: Function
}

class Conversation extends React.Component<void, Props, void> {

    componentDidMount() {
        // todo: get from route params
        this.props.getMessagesByConversation('c1');
    }

    render() {
        const {messages} = this.props;
        return (
            <div>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Text</th>
                                    <th style={{width: 170}}>When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(message => {
                                    return (
                                        <tr key={message._id}>
                                            <td>{message._id}</td>
                                            <td>{message.text}</td>
                                            <td>{moment(message.time).format("HH:mm, DD MMM 'YY")}</td>
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
        users: state.users.users,
        messages: state.conversations.messages
    }),
    { getMessagesByConversation }
)(Conversation);