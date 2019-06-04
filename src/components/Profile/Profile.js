// @flow
import React from 'react';
import { connect } from 'react-redux';
import hello from 'hellojs';
import $http from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { alertError } from '../../redux/reducers/alerts';
import { editUser, deleteUser } from '../../redux/reducers/users';
import { setUser } from '../../redux/reducers/authentication';
import { encryptPassword } from '../../utils';
import { isUsernameInvalid, isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid } from '../../helpers/inputValidation';
import Spinner from '../common/Spinner';
import ConfirmationModal from '../common/ConfirmationModal';
import { IMGUR_CLIENT_ID } from '../../constants';
import type { User, Translation } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Array<User>,
    translation: Translation,
    editUser: Function,
    deleteUser: Function,
    setUser: Function,
    alertError: Function
};

type State = {
    username: string,
    email: string,
    pictureUrl: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    showPasswords: boolean,
    pictureUploading: boolean,
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
            showPasswords: false,
            pictureUploading: false,
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

    showDeleteConfirmation = () => this.setState({showDeleteConfirmation: true});

    hideDeleteConfirmation = () => this.setState({showDeleteConfirmation: false});

    deleteProfile = () => {
        this.props.deleteUser(this.props.user._id);
        this.props.setUser(null); // remove logged user from store
        this.props.history.push('/login');
        this.hideDeleteConfirmation();
    };

    onImageUpload = (files: any) => {
        this.setState({
            pictureUploading: true
        });
        const formData = new FormData();
        formData.append('image', files[0]);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`
            }
        };
        $http.post('https://api.imgur.com/3/image', formData, config)
            .then(response => {
                const pictureUrl = response.data.data ? response.data.data.link : '';
                this.setState({
                    pictureUrl,
                    pictureUploading: false
                });
            })
            .catch(() => {
                this.setState({
                    pictureUploading: false
                });
                this.props.alertError(this.props.translation.ACCOUNT.PROFILE_PICTURE.UPLOAD_FAIL);
            })
    };

    render() {
        const {username, email, pictureUrl, currentPassword, newPassword, confirmNewPassword, showPasswords} = this.state;
        const {user, translation} = this.props;
        const {PROFILE_PICTURE, USERNAME_EMAIL, PASSWORD} = translation.ACCOUNT;
        const currentEncryptedPassword = currentPassword ? encryptPassword(currentPassword) : '';
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                        <Form>
                            {user.oauth ? null :
                                <>
                                    <MyJumbotron header={PROFILE_PICTURE.PICTURE}>
                                        <Image
                                            thumbnail
                                            className='user-picture'
                                            style={this.state.pictureUploading ? {opacity: 0.4} : {}}
                                            src={pictureUrl ? pictureUrl : '/images/default-profile.jpg'}
                                        />
                                        <Form.Group controlId='pictureUrl' style={{marginBottom: 5}}>
                                            <Form.Control
                                                type='file'
                                                accept='image/*'
                                                onChange={(e) => this.onImageUpload(e.target.files)}
                                            />
                                            {
                                                this.state.pictureUploading && <Spinner />
                                            }
                                            <div className='or-wrapper'>
                                                <hr className='or-hr' />
                                                <span className='or-span'>{PROFILE_PICTURE.OR_USE_FROM}</span>
                                                <hr className='or-hr' />
                                            </div>
                                            <Form.Row>
                                                <Col xs={12} md={6}>
                                                    <Button
                                                        block
                                                        size='sm'
                                                        className='btn-google'
                                                        onClick={() => this.loadPictureFromApi('google')}
                                                    >
                                                        <i className='fab fa-google' style={{paddingRight: 8}} />
                                                        Google {PROFILE_PICTURE.PROFILE}
                                                    </Button>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Button
                                                        block
                                                        size='sm'
                                                        className='btn-facebook'
                                                        onClick={() => this.loadPictureFromApi('facebook')}
                                                    >
                                                        <i className='fab fa-facebook-f' style={{paddingRight: 8}} />
                                                        Facebook {PROFILE_PICTURE.PROFILE}
                                                    </Button>
                                                </Col>
                                            </Form.Row>
                                        </Form.Group>

                                        <div className='pt-1 d-inline-block'>
                                            <Button
                                                variant={user.pictureUrl === pictureUrl ? 'outline-success' : 'success'}
                                                size='sm'
                                                disabled={user.pictureUrl === pictureUrl}
                                                onClick={() => this.savePicture()}
                                            >
                                                {translation.COMMON.SAVE}
                                            </Button>
                                        </div>
                                    </MyJumbotron>


                                    <MyJumbotron header={USERNAME_EMAIL.USERNAME_AND_EMAIL}>
                                        <Form.Group controlId='username'>
                                            <Form.Label>{USERNAME_EMAIL.USERNAME}</Form.Label>
                                            <Form.Control
                                                name='username'
                                                placeholder={USERNAME_EMAIL.USERNAME}
                                                isInvalid={isUsernameInvalid(username) || this.suchUsernameExist(username)}
                                                value={username}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {isUsernameInvalid(username) && USERNAME_EMAIL.ERRORS.USERNAME_MIN_LENGTH}
                                                {this.suchUsernameExist(username) && USERNAME_EMAIL.ERRORS.USERNAME_EXIST}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId='email'>
                                            <Form.Label>{USERNAME_EMAIL.EMAIL}</Form.Label>
                                            <Form.Control
                                                name='email'
                                                type='email'
                                                placeholder={USERNAME_EMAIL.EMAIL}
                                                isInvalid={isEmailInvalid(email) || this.suchEmailExist(email)}
                                                value={email}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {isEmailInvalid(email) && USERNAME_EMAIL.ERRORS.EMAIL_INVALID}
                                                {this.suchEmailExist(email) && USERNAME_EMAIL.ERRORS.EMAIL_EXIST}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className='pt-1 d-inline-block'>
                                            <Button
                                                variant={this.isBasicFormInvalid() ? 'outline-success' : 'success'}
                                                size='sm'
                                                disabled={this.isBasicFormInvalid()}
                                                onClick={() => this.saveBasic()}
                                            >
                                                {translation.COMMON.SAVE}
                                            </Button>
                                        </div>
                                    </MyJumbotron>


                                    <MyJumbotron header={PASSWORD.PASSWORD}>
                                        <Form.Group controlId='current-password' className='mb-1'>
                                            <Form.Label>{PASSWORD.CURRENT_PASSWORD}</Form.Label>
                                            <Form.Control
                                                name='currentPassword'
                                                type={showPasswords ? 'text' : 'password'}
                                                placeholder={PASSWORD.CURRENT_PASSWORD}
                                                isInvalid={isConfirmPasswordInvalid(user.password, currentEncryptedPassword)}
                                                value={currentPassword}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {PASSWORD.ERRORS.CURRENT_PASSWORD_INVALID}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId='showPassword' style={{fontSize: '90%', color: 'grey'}}>
                                            <div className='cursor' onClick={() => this.setState({showPasswords: !showPasswords})}>
                                                <i className={`${showPasswords ? 'far fa-eye-slash' : 'far fa-eye'} pr-1`} />
                                                {showPasswords ? this.props.translation.AUTH.HIDE_PASSWORDS : this.props.translation.AUTH.SHOW_PASSWORDS}
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId='new-password'>
                                            <Form.Label>{PASSWORD.NEW_PASSWORD}</Form.Label>
                                            <Form.Control
                                                name='newPassword'
                                                type={showPasswords ? 'text' : 'password'}
                                                placeholder={PASSWORD.NEW_PASSWORD}
                                                isInvalid={isPasswordInvalid(newPassword)}
                                                value={newPassword}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {PASSWORD.ERRORS.NEW_PASSWORD_INVALID}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId='confirm-password'>
                                            <Form.Label>{PASSWORD.CONFIRM_NEW_PASSWORD}</Form.Label>
                                            <Form.Control
                                                name='confirmNewPassword'
                                                type={showPasswords ? 'text' : 'password'}
                                                placeholder={PASSWORD.CONFIRM_NEW_PASSWORD}
                                                isInvalid={isConfirmPasswordInvalid(newPassword, confirmNewPassword)}
                                                value={confirmNewPassword}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {PASSWORD.ERRORS.PASSWORDS_NOT_MATCH}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className='pt-1 d-inline-block'>
                                            <Button
                                                variant={this.isPasswordFormInvalid() ? 'outline-success' : 'success'}
                                                size='sm'
                                                disabled={this.isPasswordFormInvalid()}
                                                onClick={() => this.savePassword()}
                                            >
                                                {translation.COMMON.SAVE}
                                            </Button>
                                        </div>
                                    </MyJumbotron>
                                </>
                            }

                            <div className='text-center' style={{marginBottom: 10}}>
                                <Button
                                    variant='danger'
                                    size='sm'
                                    block
                                    className='mb-4'
                                    onClick={() => this.showDeleteConfirmation()}
                                >
                                    <i className='fas fa-trash' style={{marginRight: 5}} /> {translation.ACCOUNT.DELETE_PROFILE}
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
            </Container>
        )
    }

    isBasicFormInvalid = () => {
        const {user} = this.props;
        const {username, email} = this.state;
        return isUsernameInvalid(username) || this.suchUsernameExist(username) ||
            isEmailInvalid(email) || this.suchEmailExist(email) ||
            user.username === username && user.email === email;
    };

    suchUsernameExist = (username: string) => {
        if (!username) {
            return null;
        }
        const otherUsers = this.props.users.filter(e => !e.oauth && this.props.user._id !== e._id);
        return otherUsers.some(u => u.username === username);
    };

    suchEmailExist = (email: string) => {
        if (!email) {
            return null;
        }
        const otherUsers = this.props.users.filter(e => !e.oauth && this.props.user._id !== e._id);
        return otherUsers.some(u => u.email === email);
    };

    isPasswordFormInvalid = () => {
        const {user} = this.props;
        const {currentPassword, newPassword, confirmNewPassword} = this.state;
        if (!newPassword || !confirmNewPassword) {
            return true;
        }
        const currentEncryptedPassword = currentPassword ? encryptPassword(currentPassword) : '';
        return isConfirmPasswordInvalid(user.password, currentEncryptedPassword) ||
            isPasswordInvalid(newPassword) ||
            isConfirmPasswordInvalid(newPassword, confirmNewPassword) ||
            user.password === newPassword;
    };
}

export default connect(
    (state) => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    {
        editUser, deleteUser, setUser, alertError
    }
)(Profile)


type MyJumbotronProps = {
    header: string | React.Node,
    children: React.Node
}

const MyJumbotron = (props: MyJumbotronProps) => {
    const header = (
        <>
            <h5 className='text-center text-dark'>
                {props.header}
            </h5>
            <hr style={{margin: '0 0 10px 0'}} />
        </>
    );
    return (
        <Jumbotron className='my-jumbotron'>
            {header}
            {props.children}
        </Jumbotron>
    )
};