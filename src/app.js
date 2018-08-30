// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
import history from './helpers/history';
import Startup from './components/Startup';
import PrivateRoute from './components/PrivateRoute';
import configureStore from './redux/configureStore';
import Spinner from './components/common/Spinner';
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

const themes = ['light', 'dark', 'paper'];

async function init() {
    const store = await configureStore();
    const app = document.getElementById('app');
    if (app) {
        render(
            <Provider store={store}>
                <ThemeSwitcher themePath='/themes' storeThemeKey='ui-theme' themes={themes}>
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
                                    <PrivateRoute path="/conversation" component={Conversation} />
                                    <PrivateRoute path="/create-conversation" component={CreateConversation} />
                                    <PrivateRoute exact path="/people" component={People} />
                                    <PrivateRoute path="/weather" component={WeatherList} />
                                    <PrivateRoute path="/profile" component={Profile} />
                                    <Route exact path="/redirect" component={Spinner} />
                                </Switch>
                            </div>
                        </Router>
                    </Startup>
                </ThemeSwitcher>
            </Provider>,
            app
        );
    }
}

init();
