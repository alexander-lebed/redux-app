// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { register } from '../../redux/reducers/users';

type Props = {
    register: Function
};

type State = {
    username: string,
    email: string,
    password: string
};

// todo: input 'Confirm Password'
class Login extends React.Component<void, Props, State> {

    state = {
        username: '',
        email: '',
        password: ''
    };

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    register = () => {
        const {username, email, password} = this.state;
        this.props.register(username, email, password);
    };

    render() {
        const {username, email, password} = this.state;
        return (
            <Row style={{marginTop: 100}}>
                <Col mdOffset={3} md={6}>

                    <Row>
                        <Col xsOffset={2} xs={10}>
                            <h2>Registration</h2>
                        </Col>
                    </Row>

                    <Form horizontal onSubmit={this.register}>
                        <FormGroup controlId="formHorizontalUsername">
                            <Col componentClass={ControlLabel} xs={2}>
                                Username
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    name='username'
                                    placeholder="Username"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

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
                                <Button
                                    type="submit"
                                    bsStyle='primary'
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

export default connect(
    () => ({}),
    {
        register
    }
)(Login)