// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, Dropdown, MenuItem, Glyphicon, Badge, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { MAIN_COLOR } from '../constants';
import { logout } from '../redux/reducers/authentication';
import type { User } from '../types';

type Props = {
    user: User,
    conversations: Array<Object>,
    logout: Function
}

type State = {
    expanded: boolean,
    accountClicked: boolean
}

class NavigationBar extends React.Component<Props, State> {

    state = {
        expanded: false,
        accountClicked: false
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
        const accountDropdown = (
            <Dropdown
                open={this.state.accountClicked}
                id='account-menu'
                style={{paddingTop: 10, textAlign: 'center'}}
            >
                <div style={{display: 'inline-block'}}>
                    <Image
                        circle
                        style={user.online ? {border: `2px solid ${MAIN_COLOR}`, cursor: 'pointer'} : {cursor: 'pointer'}}
                        className='account-menu pull-right'
                        src={user.pictureUrl ? user.pictureUrl : '/default-profile.png'}
                        title={user.username}
                        alt={'Account'}
                        onClick={() => this.setState({accountClicked: !this.state.accountClicked})}
                    />
                </div>
                <Dropdown.Menu>
                    <LinkContainer
                        key='profile'
                        to='/profile'
                        onClick={() => {
                            this.expand(false);
                            this.setState({accountClicked: false})
                        }}>
                        <MenuItem
                            eventKey={4.1}
                            className='dropdown-item'
                        >
                            <Glyphicon glyph='pencil' style={{marginRight: 8}} />
                            Edit profile
                        </MenuItem>
                    </LinkContainer>
                    <MenuItem
                        eventKey={4.2}
                        className='dropdown-item'
                        onSelect={() => {
                            logout();
                            this.expand(false);
                            this.setState({accountClicked: false});
                        }}
                    >
                        <Glyphicon glyph='log-out' style={{marginRight: 8}} />
                        Log out
                    </MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        );
        const messageTabStyle = convSubPathnames.includes(window.location.pathname) ? {borderBottom: '1px solid #777'} : {};
        return (
            <Navbar onToggle={this.expand} expanded={this.state.expanded}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image
                            style={{padding: '9px 45px 9px 9px', marginTop: 4}}
                            src='/favicon.png'
                            title={'Messenger'}
                            alt={'Messenger'}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer key='conversations' to='/conversations' style={messageTabStyle} onClick={() => this.expand(false)}>
                            <NavItem eventKey={1}>
                                <div className='tab-text'>
                                    Messages {newMessages}
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='people' to='/people' onClick={() => this.expand(false)}>
                            <NavItem eventKey={2}>
                                <div className='tab-text'>
                                    People
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='weather' to='/weather' onClick={() => this.expand(false)}>
                            <NavItem eventKey={3} >
                                <div className='tab-text'>
                                    Weather
                                </div>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>

                        {user && accountDropdown}

                        {!user &&
                        <LinkContainer key='login' to='/login'>
                            <NavItem eventKey={4}>
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

const convSubPathnames = ['/conversation'];

export default connect(
    (state) => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations
    }),
    { logout }, null, {pure: false}
)(NavigationBar);
