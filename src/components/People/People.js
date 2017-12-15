// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>
}

class People extends React.Component<void, Props, void> {

    render() {
        const {users} = this.props;
        return (
            <div>
                <Row>
                    <Col xsOffset={3} xs={6}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {users.toArray().map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>
                                            <LinkContainer to='/conversation'>
                                                <Button>
                                                    Message
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
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
        users: state.users.users
    }),
    { }
)(People);