// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Well, Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import { Map } from 'immutable';
import { editUser, deleteUser } from '../../redux/reducers/users';
import encryptPassword from '../../helpers/encryptPassword';
import { getUsernameValidationState, getEmailValidationState, getPasswordValidationState, getConfirmPasswordValidationState } from '../../helpers/input-validation';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User } from "../../types";

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    editUser: Function,
    deleteUser: Function
};

type State = {
    username: string,
    email: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    showDeleteConfirmation: boolean
};

class Profile extends React.Component<Props, State> {

    state: State;

    constructor(props: Props) {
        super(props);
        const user = props.user;
        this.state = {
            username: user ? user.username : '',
            email: user ? user.email : '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            showDeleteConfirmation: false
        };
    }

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    saveBasic = () => {
        const {user} = this.props;
        const {username, email} = this.state;
        this.props.editUser(user._id, {username, email});
    };

    savePassword = () => {
        const {user} = this.props;
        const {newPassword} = this.state;
        this.props.editUser(user._id, {password: encryptPassword(newPassword)});
    };

    showDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirmation: true
        })
    };

    hideDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirmation: false
        })
    };

    deleteProfile = () => {
        this.props.deleteUser(this.props.user._id);
        this.props.history.push('/login');
        this.hideDeleteConfirmation();
    };

    render() {
        const {username, email, currentPassword, newPassword, confirmNewPassword} = this.state;
        const currentEncryptedPassword = currentPassword ? encryptPassword(currentPassword) : '';
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col mdOffset={3} md={6}>
                    <Form horizontal>

                        <h4 style={{marginBottom: 10}}>Change username and email:</h4>

                        <Well bsSize='small'>
                            <FormGroup controlId='username'  validationState={this.getUsernameValidationState(username)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        name='username'
                                        placeholder='Username'
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getUsernameValidationState(username) === 'error' && 'Username should contain at least 3 characters'}
                                    </HelpBlock>
                                    <HelpBlock style={style.helpBlock}>
                                        {this.suchUsernameExist(username) === 'error' && 'User with such username already exist'}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='email' validationState={this.getEmailValidationState(email)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getEmailValidationState(email) === 'error' && 'Email address should be valid'}
                                    </HelpBlock>
                                    <HelpBlock style={style.helpBlock}>
                                        {this.suchEmailExist(email) === 'error' && 'User with such email already exist'}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <Button
                                        bsStyle='primary'
                                        className='pull-right'
                                        disabled={!this.isBasicFormValid()}
                                        onClick={() => this.saveBasic()}
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Well>


                        <h4 style={{marginBottom: 10}}>Change password:</h4>

                        <Well bsSize='small'>
                            <FormGroup controlId='current-password' validationState={getConfirmPasswordValidationState(this.props.user.password, currentEncryptedPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>Current password</ControlLabel>
                                    <FormControl
                                        name='currentPassword'
                                        type='password'
                                        placeholder='Current password'
                                        value={currentPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getConfirmPasswordValidationState(this.props.user.password, currentEncryptedPassword) === 'error' && 'Current password does not match'}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='new-password' validationState={getPasswordValidationState(newPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>New password</ControlLabel>
                                    <FormControl
                                        name='newPassword'
                                        type='password'
                                        placeholder='New password'
                                        value={newPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getPasswordValidationState(newPassword) === 'error' && 'Password should contain at least 5 characters and do not contain spaces'}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='confirm-password' validationState={getConfirmPasswordValidationState(newPassword, confirmNewPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>Confirm new password</ControlLabel>
                                    <FormControl
                                        name='confirmNewPassword'
                                        type='password'
                                        placeholder='Confirm new password'
                                        value={confirmNewPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getConfirmPasswordValidationState(newPassword, confirmNewPassword) === 'error' && 'Passwords do not match'}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <ButtonToolbar className='pull-right'>
                                        <Button
                                            bsStyle='primary'
                                            disabled={!this.isPasswordFormValid()}
                                            onClick={() => this.savePassword()}
                                        >
                                            Save
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </FormGroup>
                        </Well>

                        <div className='text-center'>
                            <Button
                                bsStyle='danger'
                                style={{marginBottom: 10}}
                                onClick={() => this.showDeleteConfirmation()}
                            >
                                <Glyphicon glyph='trash' style={{marginRight: 5}}/> Delete Profile
                            </Button>
                        </div>
                    </Form>

                    {this.state.showDeleteConfirmation &&
                        <ConfirmationModal
                            title={'Delete confirmation'}
                            body={'Are you sure you want to delete your profile?'}
                            onConfirm={() => this.deleteProfile()}
                            onCancel={() => this.hideDeleteConfirmation()}
                        />
                    }
                </Col>
            </Row>
        )
    }

    isBasicFormValid = () => {
        const {user} = this.props;
        const {username, email} = this.state;
        const validationStates = [
            this.getUsernameValidationState(username),
            this.getEmailValidationState(email),
            user.username === username && user.email === email ? 'error' : 'success'
        ];
        return validationStates.every(e => e === 'success');
    };

    getUsernameValidationState = (username) => {
        const validationStates = [
            getUsernameValidationState(username),
            this.suchUsernameExist(username)
        ];
        if (validationStates.every(e => e === null)) {
            return null;
        }
        return validationStates.every(e => e === 'success') ? 'success' : 'error';
    };

    suchUsernameExist = (username: string) => {
        if (!username) {
            return null;
        }
        const otherUsers = this.props.users.filter(u => this.props.user._id !== u._id);
        return otherUsers.some(u => u.username === username) ? 'error' : 'success'
    };

    suchEmailExist = (email: string) => {
        if (!email) {
            return null;
        }
        const otherUsers = this.props.users.filter(u => this.props.user._id !== u._id);
        return otherUsers.some(u => u.email === email) ? 'error' : 'success'
    };

    getEmailValidationState  = (email: string) => {
        const validationStates = [
            getEmailValidationState(email),
            this.suchEmailExist(email)
        ];
        if (validationStates.every(e => e === null)) {
            return null;
        }
        return validationStates.every(e => e === 'success') ? 'success' : 'error';
    };

    isPasswordFormValid = () => {
        const {user} = this.props;
        const {currentPassword, newPassword, confirmNewPassword} = this.state;
        const currentEncryptedPassword = currentPassword ? encryptPassword(currentPassword) : '';
        const validationStates = [
            getConfirmPasswordValidationState(user.password, currentEncryptedPassword),
            getPasswordValidationState(newPassword),
            getConfirmPasswordValidationState(newPassword, confirmNewPassword),
            user.password === newPassword ? 'error' : 'success'
        ];
        return validationStates.every(e => e === 'success');
    };
}

const style = {
    helpBlock: {
        fontSize: 'medium',
        marginBottom: 0
    }
};

export default connect(
    (state) => ({
        user: state.authentication.user,
        users: state.users.users
    }),
    {
        editUser, deleteUser
    }
)(Profile)