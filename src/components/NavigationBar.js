// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../redux/reducers/authentication';
import type { User } from '../types';

type Props = {
    user: User,
    logout: Function
}

class NavigationBar extends React.Component<void, Props, void> {

    render() {
        const {user, logout} = this.props;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        {}
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer key='todo' to='/todo'>
                        <NavItem eventKey={1}>Todo</NavItem>
                    </LinkContainer>
                    <LinkContainer key='weather' to='/weather'>
                        <NavItem eventKey={2}>Weather</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        <div style={{color: 'red'}}>
                            {user && user.username}
                        </div>
                    </NavItem>
                    <LinkContainer key='login' to='/login'>
                        <NavItem><Glyphicon glyph="log-in" /></NavItem>
                    </LinkContainer>
                    <NavItem eventKey={3} onSelect={logout}>
                        <Glyphicon glyph="log-out" />
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default connect(
    (state) => ({
        user: state.authentication.user
    }),
    {logout}, null, {pure: false}
)(NavigationBar);
