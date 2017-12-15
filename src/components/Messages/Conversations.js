// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import moment from 'moment';
import { Row, Col, Table } from 'react-bootstrap';
import history from "../../helpers/history";
import { getConversationsByUser } from '../../redux/reducers/conversations';
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>,
    conversations: Array<Object>,
    getConversationsByUser: Function
}

class Conversations extends React.Component<void, Props, void> {

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    goToConversation = (convId: string) => {
        history.push(`/conversation?${convId}`);
    };

    render() {
        const {user, users, conversations} = this.props;
        return (
            <div>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>From</th>
                                    <th style={{width: 170}}>When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conversations.map(conv => {
                                    const usersArr = users.toArray();
                                    const title = conv.users.filter(userId => userId !== user._id)
                                        .map(userId => {
                                            // get username by id
                                            const user = usersArr.filter(user => user._id === userId)[0];
                                            return user ? user.username : '';
                                        })
                                        .join(', ');
                                    return (
                                        <tr key={conv._id} onClick={() => this.goToConversation(conv._id)}>
                                            <td>{conv.name}</td>
                                            <td>{title}</td>
                                            <td>{moment(conv.time).format("HH:mm, DD MMM 'YY")}</td>
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
        conversations: state.conversations.conversations
    }),
    { getConversationsByUser }
)(Conversations);