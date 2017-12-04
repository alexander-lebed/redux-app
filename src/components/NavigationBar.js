// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { Map } from 'immutable';
import { logout } from '../redux/reducers/authentication';
import type { User } from '../redux/types';

type Props = {
    user: User,
    users: Map<string, User>,
    logout: Function
}

const Navigation = (props: Props) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    [{props.users.map(e => e.username).join(', ')}]
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="/todo">Todo</NavItem>
                <NavItem eventKey={2} href="/weather">Weather</NavItem>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1}>
                    <div style={{color: 'red'}}>
                        {props.user && props.user.username}
                    </div>
                </NavItem>
                <NavItem eventKey={2} href="/login">
                    <Glyphicon glyph="log-in" />
                </NavItem>
                <NavItem eventKey={3} onSelect={props.logout}>
                    <Glyphicon glyph="log-out" />
                </NavItem>
            </Nav>
        </Navbar>
    )
};

export default connect(
    (state) => ({
        user: state.authentication.user,
        users: state.users.users
    }),
    {logout}
)(Navigation);
