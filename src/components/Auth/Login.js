// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
import { login } from '../../redux/reducers/authentication';
import { success, error } from "../../redux/reducers/alerts";
import history from "../../helpers/history";

type Props = {
    login: Function,
    success: Function,
    error: Function
};

type State = {
    email: string,
    password: string
};

class Login extends React.Component<void, Props, State> {

    state = {
        email: '',
        password: ''
    };

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    login = () => {
        const {email, password} = this.state;
        this.props.login(email, password).then(isLoggedIn => {
            if (isLoggedIn) {
                history.push('/');
            } else {
                this.props.error('Email or password is incorrect');
            }
        })
    };

    render() {
        const {email, password} = this.state;
        return (
            <Row style={{marginTop: 100}}>
                <Col mdOffset={3} md={6}>

                    <Row>
                        <Col xsOffset={2} xs={10}>
                            <h2>Login</h2>
                        </Col>
                    </Row>

                    <Form horizontal onSubmit={this.login}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} xs={2}>
                                Email
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='email'
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} xs={2}>
                                Password
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='password'
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xsOffset={2} xs={10}>
                                <ButtonToolbar>
                                    <Button
                                        type="submit"
                                        bsStyle='primary'
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        bsStyle='link'
                                        href='/register'
                                    >
                                        Register
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default connect(
    () => ({}),
    {
        login, success, error
    }
)(Login)