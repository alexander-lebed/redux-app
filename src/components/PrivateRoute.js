import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { User } from '../redux/types';

type Props = Route & {
    user: User
}

const PrivateRoute = (props: Props) => {
    const {user} = props;
    if (user) {
        return <Route {...props} />
    } else {
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
    }
};

export default connect(
    state => ({
        user: state.authentication.user
    }),
    {}
)(PrivateRoute)