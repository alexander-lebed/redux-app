// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap';
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
    password: string
};

class Login extends React.Component<Props, State> {

    state = {
        email: '',
        password: ''
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

    oAuthLogin = async (service) => {
        const isLoggedIn = await this.props.login({oauth: service});
        if (isLoggedIn) {
            this.props.history.push('/');
        } else {
            this.props.alertError(this.props.translation.AUTH.OAUTH_ERROR(service));
        }
    };

    render() {
        const {email, password} = this.state;
        const {translation} = this.props;
        return (
            <Row style={{marginTop: 100, marginLeft: 0, marginRight: 0}}>
                <Col smOffset={3} sm={6}>

                    <Row>
                        <Col xsOffset={3} smOffset={2}  xs={9} sm={10}>
                            <h3 style={{marginBottom: 20}}>{translation.ACCOUNT.LOG_IN}</h3>
                        </Col>
                    </Row>

                    <Form horizontal onSubmit={this.login}>
                        <FormGroup controlId='formHorizontalEmail'>
                            <Col componentClass={ControlLabel} xs={3} sm={2}>
                                Email
                            </Col>
                            <Col xs={9} sm={10}>
                                <FormControl
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='formHorizontalPassword'>
                            <Col componentClass={ControlLabel} xs={3} sm={2}>
                                {this.props.translation.AUTH.PASSWORD}
                            </Col>
                            <Col xs={9} sm={10}>
                                <FormControl
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xsOffset={3} smOffset={2} xs={9} sm={10}>
                                <ButtonToolbar>
                                    <Button
                                        type='submit'
                                        bsStyle='primary'
                                        className='btn-xs-block'
                                    >
                                        {translation.ACCOUNT.LOG_IN}
                                    </Button>
                                    <Button
                                        href='/register'
                                        className='btn-xs-block'
                                    >
                                        {translation.ACCOUNT.SIGN_UP}
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>

                    <FormGroup style={{marginBottom: 0}}>
                        <Col xsOffset={3} smOffset={2} xs={9} sm={10}>
                            <ControlLabel>{translation.ACCOUNT.LOG_IN_WITH_OAUTH}</ControlLabel>
                            <ButtonToolbar>
                                <Button
                                    style={{backgroundColor: '#DD4B39'}}
                                    className='btn-social'
                                    onClick={() => this.oAuthLogin('google')}
                                >
                                    <i className="fa fa-google-plus pr-1" />
                                </Button>
                                <Button
                                    style={{backgroundColor: '#3B5998'}}
                                    className='btn-social'
                                    onClick={() => this.oAuthLogin('facebook')}
                                >
                                    <i className="fa fa-facebook pr-1" />
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

export default connect(
    (state) => ({
        translation: state.translation
    }),
    { login, alertError }
)(Login)