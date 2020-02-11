// @flow
import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import { translate } from '../redux/reducers/translation';
import { logout } from '../redux/reducers/authentication';
import { MAIN_COLOR } from '../constants';
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
                <Badge variant='success'>{unreadConversations.length}</Badge>
            );
            const accountPicture = (
                <div style={{display: 'inline-block'}} onClick={() => this.setState({accountClicked: !this.state.accountClicked})}>
                    <Image
                        roundedCircle
                        className='account-menu d-none d-sm-block pull-right'
                        style={this.state.accountClicked ? {boxShadow: `0 0 2pt 2pt ${MAIN_COLOR}`} : {}}
                        src={user.pictureUrl ? user.pictureUrl : '/images/default-profile.jpg'}
                        title={user.username}
                    />
                    <div className='d-block d-sm-none'>{user.username}</div>
                </div>
            );
            accountDropdown = (
                <NavDropdown
                    className='navbar-dropdown account-dropdown pull-left'
                    style={{textAlign: 'center'}}
                    drop='left'
                    title={accountPicture}
                    open={this.state.accountClicked}
                >
                    <NavDropdown.Item eventKey='/profile'>
                        <LinkContainer
                            key='profile'
                            to='/profile'
                            onClick={() => {
                                this.expand(false);
                                this.setState({accountClicked: false})
                            }}>
                            <div className='dropdown-item'>
                                {translation.ACCOUNT.EDIT_PROFILE}
                            </div>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey='/cv'>
                        <LinkContainer
                            key='cv'
                            to='/cv'
                            onClick={() => {
                                this.expand(false);
                                this.setState({accountClicked: false})
                            }}>
                            <div className='dropdown-item'>
                                {translation.ACCOUNT.ABOUT_DEVELOPER}
                            </div>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        onSelect={() => {
                            logout();
                            this.expand(false);
                            this.setState({accountClicked: false});
                        }}
                    >
                        <div className='dropdown-item'>
                            {translation.ACCOUNT.LOG_OUT}
                        </div>
                    </NavDropdown.Item>
                </NavDropdown>
            );
        }
        let activeTab = window.location.pathname;
        if ('/conversation' === activeTab) {
            activeTab = '/conversations';
        }
        return (
            <Navbar
                fixed='top'
                expand='sm'
                bg='dark'
                variant='dark'
                className='my-navbar'
                expanded={this.state.expanded}
                onToggle={() => this.expand(!this.state.expanded)}
            >
                <Navbar.Brand>
                    <LinkContainer key='home' to='/'>
                        <Image
                            className='brand-logo'
                            src='/images/brand-logo.png'
                            title={'WTalk Messenger'}
                            alt={'WTalk Messenger'}
                        />
                    </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' className='my-navbar-panel'>
                    <Nav activeKey={activeTab} onSelect={() => {}} className='mr-auto'>
                        <Nav.Link eventKey='/conversations'>
                            <LinkContainer key='conversations' to='/conversations' className='tab-text' onClick={() => this.expand(false)}>
                                <div>
                                    {translation.NAVIGATION.MESSAGES} {newMessages}
                                </div>
                            </LinkContainer>
                        </Nav.Link>
                        <Nav.Link eventKey='/people'>
                            <LinkContainer key='people' to='/people' onClick={() => this.expand(false)}>
                                <div className='tab-text'>
                                    {translation.NAVIGATION.PEOPLE}
                                </div>
                            </LinkContainer>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {user && (
                            <>
                                {
                                    accountDropdown
                                }
                            </>
                        )}
                        {!user && (
                            <Nav.Link eventKey='/login' style={{paddingTop: 10, paddingBottom: 9}}>
                                <LinkContainer key='login' to='/login' onClick={() => this.expand(false)}>
                                    <div>
                                        <Button variant='outline-success' size='sm' className='mobile-btn'>
                                            <i className='fas fa-sign-in-alt' style={{marginRight: 5}} /> {translation.ACCOUNT.LOG_IN}
                                        </Button>
                                    </div>
                                </LinkContainer>
                            </Nav.Link>
                        )}
                        <NavDropdown
                            className='navbar-dropdown'
                            style={{textAlign: 'center', paddingLeft: 5}}
                            drop='left'
                            title={
                                <i className='fas fa-language lang-icon' />
                            }
                        >
                            <NavDropdown.Item eventKey='en' onSelect={() => {translate('en')}}>
                                <div className={`dropdown-item lang-item ${locale === 'en' ? 'active' : ''}`}>
                                    <Image
                                        className='lang-flag'
                                        src='/images/flags/united_states.png'
                                    />EN
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item eventKey='en' onSelect={() => {translate('ru')}}>
                                <div className={`dropdown-item ${locale === 'ru' ? 'active' : ''}`}>
                                    <Image
                                        className='lang-flag'
                                        src='/images/flags/russian.png'
                                    />РУС
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(
    (state) => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations,
        locale: state.locale,
        translation: state.translation
    }),
    { logout, translate }, null, {pure: false}
)(NavigationBar);
