// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import hello from 'hellojs';
import { Row, Col, Well, Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button, Glyphicon, Image } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { editUser, deleteUser } from '../../redux/reducers/users';
import encryptPassword from '../../helpers/encryptPassword';
import { getUsernameValidationState, getEmailValidationState, getPasswordValidationState, getConfirmPasswordValidationState } from '../../helpers/input-validation';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User, Translation } from "../../types";

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    translation: Translation,
    editUser: Function,
    deleteUser: Function
};

type State = {
    username: string,
    email: string,
    pictureUrl: string,
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
            pictureUrl: user ? user.pictureUrl : '',
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

    loadPictureFromApi = (service: string) => {
        hello(service).login()
            .then(() => hello(service).api('me'))
            .then(user => {
                this.setState({
                    pictureUrl: user.thumbnail
                });
            })
    };

    savePicture = () => {
        const {user} = this.props;
        const {pictureUrl} = this.state;
        this.props.editUser(user._id, {pictureUrl});
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
        const {username, email, pictureUrl, currentPassword, newPassword, confirmNewPassword} = this.state;
        const {user, translation} = this.props;
        const {PROFILE_PICTURE, USERNAME_EMAIL, PASSWORD} = translation.ACCOUNT;
        const currentEncryptedPassword = currentPassword ? encryptPassword(currentPassword) : '';
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col mdOffset={3} md={6}>
                    <Form horizontal>

                        <h4 style={{marginBottom: 10}}>{PROFILE_PICTURE.UPLOAD_PICTURE}</h4>

                        <Well bsSize='small'>
                            <Col smOffset={2} sm={8}>
                                <Image
                                    circle
                                    style={{maxHeight: 150, maxWidth: 300}}
                                    src={pictureUrl ? pictureUrl : '/default-profile.png'}
                                />
                            </Col>

                            <FormGroup controlId='pictureUrl' style={{marginBottom: 0}}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{PROFILE_PICTURE.SET_PICTURE_URL}</ControlLabel>
                                    <FormControl
                                        name='pictureUrl'
                                        placeholder='https://some/your/picture.png'
                                        value={pictureUrl}
                                        onChange={this.handleChange}
                                    />
                                    <div style={{fontSize: 15}}>
                                        {PROFILE_PICTURE.CREATE_PICTURE_URL}
                                        <ol style={{marginBottom: 0}}>
                                            <li>
                                                {PROFILE_PICTURE.GO_TO_SOURCE(
                                                    <a
                                                        href="https://postimages.org/"
                                                        style={{fontWeight: 'bold'}}
                                                        target="_blank"
                                                        rel='noopener noreferrer'
                                                    >
                                                        PostImage
                                                    </a>
                                                )}
                                            </li>
                                            <li>{PROFILE_PICTURE.UPLOAD}</li>
                                            <li>{PROFILE_PICTURE.GET_LINK}</li>
                                        </ol>
                                    </div>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{PROFILE_PICTURE.SOCIAL_PICTURE}</ControlLabel>
                                    <ButtonToolbar>
                                        <Button
                                            style={{backgroundColor: '#DD4B39'}}
                                            className='btn-social'
                                            onClick={() => this.loadPictureFromApi('google')}
                                        >
                                            <i className="fa fa-google-plus pr-1" />
                                        </Button>
                                        <Button
                                            style={{backgroundColor: '#3B5998'}}
                                            className='btn-social'
                                            onClick={() => this.loadPictureFromApi('facebook')}
                                        >
                                            <i className="fa fa-facebook pr-1" />
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <Button
                                        bsStyle='primary'
                                        className='pull-right'
                                        disabled={user.pictureUrl === pictureUrl}
                                        onClick={() => this.savePicture()}
                                    >
                                        {translation.COMMON.SAVE}
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Well>


                        <h4 style={{marginBottom: 10}}>{USERNAME_EMAIL.CHANGE_USERNAME_AND_EMAIL}</h4>

                        <Well bsSize='small'>
                            <FormGroup controlId='username'  validationState={this.getUsernameValidationState(username)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{USERNAME_EMAIL.USERNAME}</ControlLabel>
                                    <FormControl
                                        name='username'
                                        placeholder={USERNAME_EMAIL.USERNAME}
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getUsernameValidationState(username) === 'error' && USERNAME_EMAIL.ERRORS.USERNAME_MIN_LENGTH}
                                    </HelpBlock>
                                    <HelpBlock style={style.helpBlock}>
                                        {this.suchUsernameExist(username) === 'error' && USERNAME_EMAIL.ERRORS.USERNAME_EXIST}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='email' validationState={this.getEmailValidationState(email)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{USERNAME_EMAIL.EMAIL}</ControlLabel>
                                    <FormControl
                                        name='email'
                                        type='email'
                                        placeholder={USERNAME_EMAIL.EMAIL}
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getEmailValidationState(email) === 'error' && USERNAME_EMAIL.ERRORS.EMAIL_INVALID}
                                    </HelpBlock>
                                    <HelpBlock style={style.helpBlock}>
                                        {this.suchEmailExist(email) === 'error' && USERNAME_EMAIL.ERRORS.EMAIL_EXIST}
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
                                        {translation.COMMON.SAVE}
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Well>


                        <h4 style={{marginBottom: 10}}>{PASSWORD.CHANGE_PASSWORD}</h4>

                        <Well bsSize='small'>
                            <FormGroup controlId='current-password' validationState={getConfirmPasswordValidationState(user.password, currentEncryptedPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{PASSWORD.CURRENT_PASSWORD}</ControlLabel>
                                    <FormControl
                                        name='currentPassword'
                                        type='password'
                                        placeholder={PASSWORD.CURRENT_PASSWORD}
                                        value={currentPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getConfirmPasswordValidationState(user.password, currentEncryptedPassword) === 'error' && PASSWORD.ERRORS.CURRENT_PASSWORD_INVALID}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='new-password' validationState={getPasswordValidationState(newPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{PASSWORD.NEW_PASSWORD}</ControlLabel>
                                    <FormControl
                                        name='newPassword'
                                        type='password'
                                        placeholder={PASSWORD.NEW_PASSWORD}
                                        value={newPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getPasswordValidationState(newPassword) === 'error' && PASSWORD.ERRORS.NEW_PASSWORD_INVALID}
                                    </HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='confirm-password' validationState={getConfirmPasswordValidationState(newPassword, confirmNewPassword)}>
                                <Col smOffset={2} sm={8}>
                                    <ControlLabel>{PASSWORD.CONFIRM_NEW_PASSWORD}</ControlLabel>
                                    <FormControl
                                        name='confirmNewPassword'
                                        type='password'
                                        placeholder={PASSWORD.CONFIRM_NEW_PASSWORD}
                                        value={confirmNewPassword}
                                        onChange={this.handleChange}
                                    />
                                    <HelpBlock style={style.helpBlock}>
                                        {getConfirmPasswordValidationState(newPassword, confirmNewPassword) === 'error' && PASSWORD.ERRORS.PASSWORDS_NOT_MATCH}
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
                                            {translation.COMMON.SAVE}
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
                                <Glyphicon glyph='trash' style={{marginRight: 5}}/> {translation.ACCOUNT.DELETE_PROFILE}
                            </Button>
                        </div>
                    </Form>

                    {this.state.showDeleteConfirmation &&
                        <ConfirmationModal
                            title={translation.COMMON.DELETE_CONFIRMATION}
                            body={translation.ACCOUNT.DELETE_PROFILE_CONFIRMATION}
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
        } // .filter(e => !e.oauth)
        const otherUsers = this.props.users.filter(e => !e.oauth && this.props.user._id !== e._id);
        return otherUsers.some(u => u.username === username) ? 'error' : 'success'
    };

    suchEmailExist = (email: string) => {
        if (!email) {
            return null;
        }
        const otherUsers = this.props.users.filter(e => !e.oauth && this.props.user._id !== e._id);
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
        users: state.users.users,
        translation: state.translation
    }),
    {
        editUser, deleteUser
    }
)(Profile)