// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { register } from '../../redux/reducers/users';
import { getUsernameValidationState, getEmailValidationState, getPasswordValidationState, getConfirmPasswordValidationState } from '../../helpers/input-validation';

type Props = {
    register: Function
};

type State = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
};

class Login extends React.Component<void, Props, State> {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    isFormValid = () => {
        const {username, email, password, confirmPassword} = this.state;
        const validationStates = [
            getUsernameValidationState(username),
            getEmailValidationState(email),
            getPasswordValidationState(password),
            getConfirmPasswordValidationState(password, confirmPassword)
        ];
        return validationStates.every(e => e === 'success');
    };

    register = (e) => {
        e.preventDefault();
        const {username, email, password} = this.state;
        this.props.register(username, email, password);
    };

    render() {
        const {username, email, password, confirmPassword} = this.state;
        return (
            <Row style={{marginTop: 100}}>
                <Col mdOffset={3} md={6}>

                    <Row>
                        <Col xsOffset={2} xs={10}>
                            <h2 style={{marginBottom: 20}}>Registration</h2>
                        </Col>
                    </Row>

                    <Form horizontal onSubmit={this.register}>
                        <FormGroup controlId='formHorizontalUsername'  validationState={getUsernameValidationState(username)}>
                            <Col componentClass={ControlLabel} xs={2}>
                                Username
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='username'
                                    placeholder='Username'
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock style={style.helpBlock}>
                                    {getUsernameValidationState(username) === 'error' && 'Username should contain at least 3 characters'}
                                </HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='formHorizontalEmail' validationState={getEmailValidationState(email)}>
                            <Col componentClass={ControlLabel} xs={2}>
                                Email
                            </Col>
                            <Col xs={10}>
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
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='formHorizontalPassword' validationState={getPasswordValidationState(password)}>
                            <Col componentClass={ControlLabel} xs={2}>
                                Password
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock style={style.helpBlock}>
                                    {getPasswordValidationState(password) === 'error' && 'Password should contain at least 5 characters'}
                                </HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='formHorizontalPassword' validationState={getConfirmPasswordValidationState(password, confirmPassword)}>
                            <Col componentClass={ControlLabel} xs={2}>
                                Confirm password
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='confirmPassword'
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock style={style.helpBlock}>
                                    {getConfirmPasswordValidationState(password, confirmPassword) === 'error' && 'Passwords do not match'}
                                </HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xsOffset={2} xs={10}>
                                <Button
                                    type='submit'
                                    bsStyle='primary'
                                    disabled={!this.isFormValid()}
                                >
                                    Register
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const style = {
    helpBlock: {
        fontSize: 'medium',
        marginBottom: 0
    }
};

export default connect(
    () => ({}),
    {
        register
    }
)(Login)