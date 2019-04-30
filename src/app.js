// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
import 'font-awesome/css/font-awesome.min.css';
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
import Profile from './components/Profile/Profile';
import CV from './components/CV/CV';
import PageNotFound from './components/PageNotFound';
import Alerts from './components/Alerts';
import './app.scss';


async function init() {
    const store = await configureStore();
    const app = document.getElementById('app');
    if (app) {
        render(
            <Provider store={store}>
                {/*<ThemeSwitcher themePath='themes' storeThemeKey='ui-theme' themes={['light', 'dark', 'paper']}>*/}
                <Startup>
                    <Router>
                        <div>
                            <Alerts />
                            <NavigationBar />
                            <div className='main-content'>
                                <Switch>
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Registration} />
                                    <PrivateRoute exact path="/" component={Conversations} />
                                    <PrivateRoute exact path="/conversations" component={Conversations} />
                                    <PrivateRoute path="/conversation" component={Conversation} />
                                    <PrivateRoute path="/create-conversation" component={CreateConversation} />
                                    <PrivateRoute exact path="/people" component={People} />
                                    <PrivateRoute path="/profile" component={Profile} />
                                    <PrivateRoute path="/cv" component={CV} />
                                    <Route exact path="/redirect" component={Spinner} />
                                    <Route component={PageNotFound} />
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </Startup>
                {/*</ThemeSwitcher>*/}
            </Provider>,
            app
        );
    }
}

init();
