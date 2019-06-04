// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import configureStore from './redux/configureStore';
import Startup from './components/Startup';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import Alerts from './components/Alerts';
import Spinner from './components/common/Spinner';
import './app.scss';


class DynamicImport extends React.Component<{load: Function}, {component: any}> {
    state = {
        component: null
    };
    componentDidMount() {
        this.props.load().then(mod => this.setState({component: mod.default}));
    }
    render() {
        const Component = this.state.component;
        return this.state.component === null ? <Spinner /> : <Component {...this.props} />
    }
}

const getComponent = (componentPath: string) => {
    return (props) => <DynamicImport load={() => import('' + componentPath)} {...props} />
};

async function init() {
    const store = await configureStore();
    const app = document.getElementById('app');
    const Login = getComponent('./components/Auth/Login');
    const Registration = getComponent('./components/Auth/Registration');
    const Conversations = getComponent('./components/Messages/Conversations');
    const Conversation = getComponent('./components/Messages/Conversation');
    const CreateConversation = getComponent('./components/Messages/CreateConversation');
    const People = getComponent('./components/People/People');
    const Profile = getComponent('./components/Profile/Profile');
    const CV = getComponent('./components/CV/CV');
    const PageNotFound = getComponent('./components/PageNotFound');
    if (app) {
        render(
            <Provider store={store}>
                <Startup>
                    <Router>
                        <div>
                            <Alerts />
                            <NavigationBar />
                            <div className='main-content'>
                                <Switch>
                                    <Route exact path='/login' component={Login} />
                                    <Route exact path='/register' component={Registration} />
                                    <PrivateRoute exact path='/' component={Conversations} />
                                    <PrivateRoute exact path='/conversations' component={Conversations} />
                                    <PrivateRoute path='/conversation' component={Conversation} />
                                    <PrivateRoute path='/create-conversation' component={CreateConversation} />
                                    <PrivateRoute exact path='/people' component={People} />
                                    <PrivateRoute path='/profile' component={Profile} />
                                    <PrivateRoute path='/cv' component={CV} />
                                    <Route exact path='/redirect' component={Spinner} />
                                    <Route component={PageNotFound} />
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </Startup>
            </Provider>,
            app
        );
    }
}

init();
