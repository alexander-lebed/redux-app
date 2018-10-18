// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, Dropdown, MenuItem, Glyphicon, Badge, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
import { translate } from '../redux/reducers/translation';
import { logout } from '../redux/reducers/authentication';
import type { User, Locale, Translation } from '../types';

type Props = {
    user: User,
    conversations: Array<Object>,
    locale: Locale,
    translation: Translation,
    translate: (locale: Locale) => void,
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
        const {user, conversations = [], logout, locale, translation, translate} = this.props;
        let newMessages = null;
        let accountDropdown = null;
        if (user) {
            const unreadConversations = conversations.filter(c => c.messages.some(m => !m.read && m.from._id !== user._id));
            newMessages = unreadConversations.length > 0 && (
                <Badge>{unreadConversations.length}</Badge>
            );
            accountDropdown = (
                <Dropdown
                    open={this.state.accountClicked}
                    id='account-dropdown'
                    className='pull-left account-dropdown'
                    style={{paddingTop: 10, textAlign: 'center'}}
                >
                    <div style={{display: 'inline-block'}}>
                        <Image
                            circle
                            className={`account-menu pull-right ${this.state.accountClicked ? 'account-menu-clicked' : ''}`}
                            src={user.pictureUrl ? user.pictureUrl : '/default-profile.png'}
                            title={user.username}
                            onClick={() => this.setState({accountClicked: !this.state.accountClicked})}
                        />
                    </div>
                    <Dropdown.Menu>
                        {(user.oauth && user.oauth.length) ? null :
                            <LinkContainer
                                key='profile'
                                to='/profile'
                                onClick={() => {
                                    this.expand(false);
                                    this.setState({accountClicked: false})
                                }}>
                                <MenuItem
                                    eventKey={1.1}
                                    className='dropdown-item'
                                >
                                    <i className="fa fa-pencil" style={{marginRight: 8}} />
                                    {translation.ACCOUNT.EDIT_PROFILE}
                                </MenuItem>
                            </LinkContainer>
                        }
                        <MenuItem
                            eventKey={1.2}
                            className='dropdown-item'
                            onSelect={() => {
                                logout();
                                this.expand(false);
                                this.setState({accountClicked: false});
                            }}
                        >
                            <Glyphicon glyph='log-out' style={{marginRight: 8}} />
                            {translation.ACCOUNT.LOG_OUT}
                        </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
        const messageTabStyle = convSubPathnames.includes(window.location.pathname) ? {borderBottom: '1px solid #777'} : {};
        return (
            <Navbar style={{borderTop: 'none'}} fixedTop onToggle={this.expand} expanded={this.state.expanded}>
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
                                    {translation.SECTIONS.MESSAGES} {newMessages}
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='people' to='/people' onClick={() => this.expand(false)}>
                            <NavItem eventKey={2}>
                                <div className='tab-text'>
                                    {translation.SECTIONS.PEOPLE}
                                </div>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer key='theme' to='#' >
                            <NavItem eventKey={1} className='hidden-sm hidden-md hidden-lg theme-menu' style={{border: 'none', height: 50}}>
                                <ThemeChooser />
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>

                        {accountDropdown}

                        {!user &&
                        <LinkContainer key='login' to='/login'>
                            <NavItem eventKey={1}>
                                <Button bsSize='small' className='mobile-btn'>
                                    <Glyphicon glyph='log-in' style={{marginRight: 5}} /> {translation.ACCOUNT.LOG_IN}
                                </Button>
                            </NavItem>
                        </LinkContainer>
                        }
                        <NavItem eventKey={2} className='lang-text' style={{border: 'none'}} onSelect={() => {translate('en')}}>
                            {locale === 'en' ? <u>EN</u> : 'EN'}
                        </NavItem>
                        <NavItem eventKey={3} className='lang-text' style={{border: 'none'}} onSelect={() => {translate('ru')}}>
                            {locale === 'ru' ? <u>РУС</u> : 'РУС'}
                        </NavItem>
                        <NavItem eventKey={4} className='hidden-xs theme-menu' style={{border: 'none', height: 50}}>
                            <ThemeChooser />
                        </NavItem>
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
        conversations: state.conversations.conversations,
        locale: state.locale,
        translation: state.translation
    }),
    { logout, translate }, null, {pure: false}
)(NavigationBar);
