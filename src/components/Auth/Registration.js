// @flow
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { register } from '../../redux/reducers/users';
import { isUsernameInvalid, isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid } from '../../helpers/inputValidation';
import type { Translation } from '../../types'

type Props = {
    translation: Translation,
    register: Function
};

type State = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    showPassword: boolean
};

class Login extends React.Component<Props, State> {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    };

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    isFormInvalid = () => {
        const {username, email, password, confirmPassword} = this.state;
        return !username || !email || !password || !confirmPassword ||
            isUsernameInvalid(username) ||
            isEmailInvalid(email) ||
            isPasswordInvalid(password) ||
            isConfirmPasswordInvalid(password, confirmPassword);
    };

    register = (e) => {
        e.preventDefault();
        const {username, email, password} = this.state;
        this.props.register(username, email, password);
    };

    render() {
        const {username, email, password, confirmPassword, showPassword} = this.state;
        const {translation} = this.props;
        return (
            <Container className='auth-container'>
                <Row>
                    <Col lg={{span: 6, offset: 3}}>
                        <h3 style={{marginBottom: 20}}>
                            {translation.ACCOUNT.SIGN_UP}
                        </h3>
                        <Form onSubmit={this.register}>
                            <Form.Group controlId='username'>
                                <Form.Label>{translation.ACCOUNT.USERNAME_EMAIL.USERNAME}</Form.Label>
                                <Form.Control
                                    name='username'
                                    placeholder='Username'
                                    required
                                    isInvalid={isUsernameInvalid(username)}
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {translation.ACCOUNT.USERNAME_EMAIL.ERRORS.USERNAME_MIN_LENGTH}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>{translation.ACCOUNT.USERNAME_EMAIL.EMAIL}</Form.Label>
                                <Form.Control
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    isInvalid={isEmailInvalid(email)}
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {translation.ACCOUNT.USERNAME_EMAIL.ERRORS.EMAIL_INVALID}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='password' className='mb-1'>
                                <Form.Label>{translation.AUTH.PASSWORD}</Form.Label>
                                <Form.Control
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    isInvalid={isPasswordInvalid(password)}
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {translation.ACCOUNT.PASSWORD.ERRORS.NEW_PASSWORD_INVALID}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId='showPassword' style={{fontSize: '90%', color: 'grey'}}>
                                <div className='cursor' onClick={() => this.setState({showPassword: !showPassword})}>
                                    <i className={`${showPassword ? 'far fa-eye-slash' : 'far fa-eye'} pr-1`} />
                                    {showPassword ? this.props.translation.AUTH.HIDE_PASSWORD : this.props.translation.AUTH.SHOW_PASSWORD}
                                </div>
                            </Form.Group>

                            <Form.Group controlId='confirm-password'>
                                <Form.Label>{translation.AUTH.CONFIRM_PASSWORD}</Form.Label>
                                <Form.Control
                                    name='confirmPassword'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm password'
                                    isInvalid={isConfirmPasswordInvalid(password, confirmPassword)}
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {translation.ACCOUNT.PASSWORD.ERRORS.PASSWORDS_NOT_MATCH}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Button
                                    type='submit'
                                    variant='success'
                                    disabled={this.isFormInvalid()}
                                >
                                    {translation.ACCOUNT.SIGN_UP}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        translation: state.translation
    }),
    { register }
)(Login)