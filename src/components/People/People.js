// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>
}

class People extends React.Component<void, Props, void> {

    render() {
        const {users} = this.props;
        return (
            <Row>
                <Col xsOffset={2} xs={6}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th />
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {users.toArray().map(user => {
                                const query = queryString.stringify({userId: user._id});
                                return (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>
                                            <Glyphicon glyph='user' style={{color: user.online ? 'green' : 'red'}} />
                                        </td>
                                        <td>{moment(user.lastTime).format("HH:mm, DD MMM 'YY")}</td>
                                        <td className='text-right'>
                                            <LinkContainer to={`/conversation?${query}`}>
                                                <Button>
                                                    Write a message
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users
    }),
    { }
)(People);