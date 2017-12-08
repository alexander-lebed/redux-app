// @flow
import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Map } from 'immutable';
import type { User } from '../types';

type Props = {
    user: User,
    users: Map<string, User>
}

class Info extends React.Component<void, Props, void> {

    render() {
        const {users} = this.props;
        return (
            <div>
                <ListGroup>
                    {users.toArray().map(user => (
                        <ListGroupItem key={user._id}>{user.username}</ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.authentication.user,
        users: state.users.users
    }),
    {}
)(Info);
