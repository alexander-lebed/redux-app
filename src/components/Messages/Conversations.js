// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import { Row, Col, Table } from 'react-bootstrap';
import history from "../../helpers/history";
import { getConversationsByUser } from '../../redux/reducers/conversations';
import type { User } from '../../types';

type Props = {
    user: User,
    conversations: Array<Object>,
    getConversationsByUser: Function
}

class Conversations extends React.Component<void, Props, void> {

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    goToConversation = (convId: string) => {
        history.push(`/conversation?${queryString.stringify({convId})}`);
    };

    render() {
        const {user, conversations} = this.props;
        const tableBody = conversations.map(conv => {
            const senders = conv.users.filter(u => u._id !== user._id).map(u => u.username).join(', ');
            const hasNewMessage = conv.messages.some(m => !m.read);
            return (
                <tr
                    key={conv._id}
                    style={hasNewMessage ? {backgroundColor: '#e6fff2'} : {}}
                    onClick={() => this.goToConversation(conv._id)}
                >
                    <td>{conv.name}</td>
                    <td>{senders}</td>
                    <td>{moment(conv.timestamp).format("HH:mm, DD MMM 'YY")}</td>
                </tr>
            )
        });
        return (
            <div>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        <h2 className='text-center'>Conversations</h2>
                        <Table responsive>
                            <thead>
                                <tr style={{cursor: 'pointer'}}>
                                    <th>ID</th>
                                    <th>From</th>
                                    <th style={{width: 170}}>When</th>
                                </tr>
                            </thead>
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

export default connect(
    state => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations
    }),
    { getConversationsByUser }
)(Conversations);