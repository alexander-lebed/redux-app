// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, DropdownButton, MenuItem, Glyphicon, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { COLOR_ONLINE } from '../constants';
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
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer key='conversations' to='/conversations'>
                            <NavItem eventKey={1}>
                                <div style={style.navTab} className='tab-text'>
                                    Messages {newMessages}
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='people' to='/people'>
                            <NavItem eventKey={2}>
                                <div style={style.navTab} className='tab-text'>
                                    People
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='weather' to='/weather'>
                            <NavItem eventKey={3} className='tab-text'>
                                <div style={style.navTab}>
                                    Weather
                                </div>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1}>
                            {user &&
                            <DropdownButton
                                id='user-button'
                                bsSize='small'
                                className='mobile-btn'
                                title={`${user.username} ${user.online ? '(online)' : '(offline)'}`}
                                style={{backgroundColor: user.online ? COLOR_ONLINE : 'grey', color: 'white'}}
                            >
                                <MenuItem eventKey='1' onClick={() => online(!user.online)} className='dropdown-item'>
                                    <Glyphicon glyph='user' style={{marginRight: 8}} />
                                    {user.online ? 'Go offline' : 'Go online'}
                                </MenuItem>
                                <LinkContainer key='profile' to='/profile'>
                                    <MenuItem eventKey='2' className='dropdown-item'>
                                        <Glyphicon glyph='pencil' style={{marginRight: 8}} />
                                        Edit profile
                                    </MenuItem>
                                </LinkContainer>
                                {user &&
                                <MenuItem eventKey='4' className='dropdown-item' onSelect={logout}>
                                    <Glyphicon glyph='log-out' style={{marginRight: 8}} />
                                    Log out
                                </MenuItem>
                                }
                            </DropdownButton>
                            }
                        </NavItem>
                        {!user &&
                        <LinkContainer key='login' to='/login'>
                            <NavItem eventKey={2}>
                                <Button bsSize='small' className='mobile-btn'>
                                    <Glyphicon glyph='log-in' style={{marginRight: 5}} /> Log in
                                </Button>
                            </NavItem>
                        </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const style = {
    navTab: {
        paddingTop: 5,
        paddingBottom: 5
    }
};

export default connect(
    (state) => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations
    }),
    { logout, online }, null, {pure: false}
)(NavigationBar);
