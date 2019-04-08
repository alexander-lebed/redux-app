// @flow
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { encryptPassword } from '../../utils';
import { login } from '../../redux/reducers/authentication';
import { alertError } from '../../redux/reducers/alerts';
import type { Translation } from '../../types';

type Props = {
    history: Object,
    translation: Translation,
    login: Function,
    alertError: Function
};

type State = {
    email: string,
    password: string,
    showPassword: boolean
};

class Login extends React.Component<Props, State> {

    state = {
        email: '',
        password: '',
        showPassword: false
    };

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    login = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const encryptedPassword = encryptPassword(password);
        const isLoggedIn = await this.props.login({email, password: encryptedPassword, oauth: ''});
        if (isLoggedIn) {
            this.props.history.push('/');
        } else {
            this.props.alertError(this.props.translation.AUTH.INCORRECT_CREDENTIALS);
        }
    };

    signUp = async (e) => {
        e.preventDefault();
        this.props.history.push('/register');
    };

    oAuthLogin = async (service) => {
        const isLoggedIn = await this.props.login({oauth: service});
        if (isLoggedIn) {
            this.props.history.push('/');
        } else {
            this.props.alertError(this.props.translation.AUTH.OAUTH_ERROR(service));
        }
    };

    render() {
        const {email, password, showPassword} = this.state;
        const {translation} = this.props;
        return (
            <Container className='auth-container'>
                <Row>
                    <Col lg={{span: 6, offset: 3}}>
                        <h3 style={{marginBottom: 20}}>
                            {translation.ACCOUNT.LOG_IN}
                        </h3>
                        <Form onSubmit={this.login}>
                            <Form.Group controlId='formHorizontalEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId='formHorizontalPassword' className='mb-1'>
                                <Form.Label>{this.props.translation.AUTH.PASSWORD}</Form.Label>
                                <Form.Control
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId='showPassword' style={{fontSize: '90%', color: 'grey'}}>
                                <div className='cursor' onClick={() => this.setState({showPassword: !showPassword})}>
                                    <i className={`${showPassword ? 'far fa-eye-slash' : 'far fa-eye'} pr-1`} />
                                    {showPassword ? this.props.translation.AUTH.HIDE_PASSWORD : this.props.translation.AUTH.SHOW_PASSWORD}
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <Button
                                    type='submit'
                                    variant='success'
                                    className='btn-xs-block'
                                >
                                    {translation.ACCOUNT.LOG_IN}
                                </Button>
                                {' '}
                                <Button
                                    variant='dark'
                                    className='btn-xs-block'
                                    onClick={this.signUp}
                                >
                                    {translation.ACCOUNT.SIGN_UP}
                                </Button>
                            </Form.Group>

                            <Form.Group>
                                <div className='or-wrapper'>
                                    <hr className='or-hr' />
                                    <span className='or-span'>{translation.COMMON.OR}</span>
                                    <hr className='or-hr' />
                                </div>
                                <Form.Row>
                                    <Col xs={12} md={6}>
                                        <Button
                                            block
                                            className='btn-google'
                                            onClick={() => this.oAuthLogin('google')}
                                        >
                                            <i className='fab fa-google' style={{paddingRight: 8}} />
                                            {translation.ACCOUNT.SIGN_UP_WITH} Google
                                        </Button>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Button
                                            block
                                            className='btn-facebook'
                                            onClick={() => this.oAuthLogin('facebook')}
                                        >
                                            <i className='fab fa-facebook-f' style={{paddingRight: 8}} />
                                            {translation.ACCOUNT.SIGN_UP_WITH} Facebook
                                        </Button>
                                    </Col>
                                </Form.Row>
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
    { login, alertError }
)(Login)