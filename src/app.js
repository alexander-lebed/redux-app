// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './helpers/history';
import Startup from './components/Startup';
import PrivateRoute from './components/PrivateRoute';
import configureStore from './redux/configureStore';
import NavigationBar from './components/NavigationBar';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Conversations from './components/Messages/Conversations';
import Conversation from './components/Messages/Conversation';
import People from './components/People/People';
import TodoList from './components/Todo/TodoList';
import WeatherList from './components/Weather/WeatherList';
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
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Registration} />
                            <PrivateRoute exact path="/conversations" component={Conversations} />
                            <PrivateRoute path="/conversation" component={Conversation} />
                            <PrivateRoute exact path="/people" component={People} />
                            <PrivateRoute exact path="/" component={TodoList} />
                            <PrivateRoute exact path="/todo" component={TodoList} />
                            <PrivateRoute path="/weather" component={WeatherList} />
                        </Switch>
                    </div>
                </Router>
            </Startup>
        </Provider>,
        document.getElementById('app')
    );
}

init();
