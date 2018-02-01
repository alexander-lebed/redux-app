// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, Glyphicon, Badge } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { logout, online } from '../redux/reducers/authentication';
import type { User } from '../types';

type Props = {
    user: User,
    conversations: Array<Object>,
    logout: Function,
    online: Function
}

class NavigationBar extends React.Component<void, Props, void> {

    render() {
        const {user, conversations = [], logout, online} = this.props;
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
                    <LinkContainer key='conversations' to='/conversations'>
                        <NavItem eventKey={1}>
                            Messages {newMessages}
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer key='people' to='/people'>
                        <NavItem eventKey={2}>People</NavItem>
                    </LinkContainer>
                    <LinkContainer key='weather' to='/weather'>
                        <NavItem eventKey={3}>Weather</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        {user &&
                        <Button
                            bsSize='small'
                            bsStyle={user.online ? 'success' : 'danger'}
                            onClick={() => online(!user.online)}
                        >
                            <Glyphicon glyph='user' /> {user.username} {user.online ? '(online)' : '(offline)'}
                        </Button>
                        }
                    </NavItem>
                    <LinkContainer key='login' to='/login'>
                        <NavItem>
                            <Button bsSize='small'>
                                <Glyphicon glyph="log-in" style={{marginRight: 10}} /> Log In
                            </Button>
                        </NavItem>
                    </LinkContainer>
                    <NavItem eventKey={3} onSelect={logout}>
                        <Button bsSize='small'>
                            <Glyphicon glyph="log-out" style={{marginRight: 10}} /> Log Out
                        </Button>
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
    { logout, online }, null, {pure: false}
)(NavigationBar);
