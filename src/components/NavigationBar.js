// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon, Badge } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../redux/reducers/authentication';
import type { User } from '../types';

type Props = {
    user: User,
    logout: Function,
    conversations: Array<Object>
}

class NavigationBar extends React.Component<void, Props, void> {

    render() {
        const {user, conversations = [], logout} = this.props;
        let newMessages = null;
        if (user) {
            const unreadConversations = conversations.filter(c => c.messages.some(m => !m.read && m.from._id !== user._id));
            newMessages = unreadConversations.length > 0 && (
                <Badge>{unreadConversations.length}</Badge>
            );
        }
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
                    <LinkContainer key='conversations' to='/conversations'>
                        <NavItem eventKey={3}>
                            Conversations {newMessages}
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer key='people' to='/people'>
                        <NavItem eventKey={4}>People</NavItem>
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
        user: state.authentication.user,
        conversations: state.conversations.conversations
    }),
    {logout}, null, {pure: false}
)(NavigationBar);
