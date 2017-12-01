// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import { login } from '../../redux/reducers/authentication';

type Props = {
    login: Function
};

type State = {
    username: string,
    password: string
};

class Login extends React.Component<void, Props, State> {

    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: ''
        }
    }

    handleChange = (event: Object) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    login = (username, password) => {
        this.props.login(username, password)
    };

    render() {
        const {username, password} = this.state;
        return (
            <Row style={{marginTop: 100}}>
                <Col lgOffset={3} lg={6}>
                    <Form horizontal>
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
                                <Checkbox>Remember me</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xsOffset={2} xs={10}>
                                <Button
                                    bsStyle='primary'
                                    onClick={() => this.login(username, password)}
                                >
                                    Log in
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
        login
    }
)(Login)