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
import CreateConversation from './components/Messages/CreateConversation';
import People from './components/People/People';
import WeatherList from './components/Weather/WeatherList';
import Profile from './components/Profile/Profile';
import Alerts from './components/Alerts';


async function init() {
    const store = await configureStore();
    const app = document.getElementById('app');
    if (app) {
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
                                <PrivateRoute exact path="/" component={Conversations} />
                                <PrivateRoute exact path="/conversations" component={Conversations} />
                                <PrivateRoute path="/conversation" component={Conversation} /> {/* query: convId or userId */}
                                <PrivateRoute path="/create-conversation" component={CreateConversation} />
                                <PrivateRoute exact path="/people" component={People} />
                                <PrivateRoute path="/weather" component={WeatherList} />
                                <PrivateRoute path="/profile" component={Profile} />
                            </Switch>
                        </div>
                    </Router>
                </Startup>
            </Provider>,
            app
        );
    }
}

init();
