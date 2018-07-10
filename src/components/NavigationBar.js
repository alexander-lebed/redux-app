// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, DropdownButton, MenuItem, Glyphicon, Badge, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { MAIN_COLOR, BORDER_COLOR } from '../constants';
import { logout } from '../redux/reducers/authentication';
import type { User } from '../types';

type Props = {
    user: User,
    conversations: Array<Object>,
    logout: Function
}

type State = {
    expanded: boolean
}

class NavigationBar extends React.Component<Props, State> {

    state = {
        expanded: false
    };

    expand = (expand) => {
        this.setState({expanded: expand});
    };

    render() {
        const {user, conversations = [], logout} = this.props;
        let newMessages = null;
        if (user) {
            const unreadConversations = conversations.filter(c => c.messages.some(m => !m.read && m.from._id !== user._id));
            newMessages = unreadConversations.length > 0 && (
                <Badge>{unreadConversations.length}</Badge>
            );
        }
        const dropdownStyle = user && user.online ? {backgroundColor: MAIN_COLOR, borderColor: BORDER_COLOR, color: 'white'} : {};
        return (
            <Navbar onToggle={this.expand} expanded={this.state.expanded}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image
                            style={{padding: '9px 50px 9px 9px'}}
                            src='/favicon.png'
                            alt={'Messenger'}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer key='conversations' to='/conversations' onClick={() => this.expand(false)}>
                            <NavItem eventKey={1}>
                                <div style={style.navTab} className='tab-text'>
                                    Messages {newMessages}
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='people' to='/people' onClick={() => this.expand(false)}>
                            <NavItem eventKey={2}>
                                <div style={style.navTab} className='tab-text'>
                                    People
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='weather' to='/weather' onClick={() => this.expand(false)}>
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
                                title={user.username}
                                style={dropdownStyle}
                            >
                                <LinkContainer
                                    key='profile'
                                    to='/profile'
                                    onClick={() => this.expand(false)}
                                >
                                    <MenuItem eventKey='1' className='dropdown-item'>
                                        <Glyphicon glyph='pencil' style={{marginRight: 8}} />
                                        Edit profile
                                    </MenuItem>
                                </LinkContainer>
                                {user &&
                                <MenuItem
                                    eventKey='2'
                                    className='dropdown-item'
                                    onSelect={() => {
                                        logout();
                                        this.expand(false)
                                    }}
                                >
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
    { logout }, null, {pure: false}
)(NavigationBar);
