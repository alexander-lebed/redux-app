// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import history from './helpers/history';
import Startup from './components/Startup';
import PrivateRoute from './components/PrivateRoute';
import configureStore from './redux/configureStore';
import NavigationBar from './components/NavigationBar';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import TodoList from './components/Todo/TodoList';
import WeatherList from './components/Weather/WeatherList';
import Info from './components/Info';
import Alerts from './components/Alerts';


async function init() {
    const store = await configureStore();
    render(
        <Provider store={store}>
            <Startup>
                <Router history={history}>
                    <div>
                        <Alerts />
                        <NavigationBar />
                        <Row>
                            <Col xs={2}>
                                <Info />
                            </Col>
                            <Col xs={10}>
                                <Switch>
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Registration} />
                                    <PrivateRoute exact path="/" component={TodoList} />
                                    <PrivateRoute exact path="/todo" component={TodoList} />
                                    <PrivateRoute path="/weather" component={WeatherList} />
                                </Switch>
                            </Col>
                        </Row>
                    </div>
                </Router>
            </Startup>
        </Provider>,
        document.getElementById('app')
    );
}

init();
