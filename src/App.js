// @flow
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Startup from './components/Startup';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import Alerts from './components/Alerts';
import Spinner from './components/common/Spinner';
import './app.scss';


// class DynamicImport extends React.Component<{load: Function}, {component: any}> {
//     state = {
//         component: null
//     };
//     componentDidMount() {
//         this.props.load().then(mod => this.setState({component: mod.default}));
//     }
//     render() {
//         const Component = this.state.component;
//         return this.state.component === null ? <Spinner /> : <Component {...this.props} />
//     }
// }

const getComponent = (componentPath: string) => {
    const Component = React.lazy(() => import('' + componentPath));
    // return (props) => <DynamicImport load={() => import('' + componentPath)} {...props} />
    return (props) => (
        <Suspense fallback={<Spinner />}>
            <Component {...props} />
        </Suspense>
    );
};

const Login = getComponent('./components/Auth/Login');
const Registration = getComponent('./components/Auth/Registration');
const Conversations = getComponent('./components/Messages/Conversations');
const Conversation = getComponent('./components/Messages/Conversation');
const CreateConversation = getComponent('./components/Messages/CreateConversation');
const People = getComponent('./components/People/People');
const Profile = getComponent('./components/Profile/Profile');
const CV = getComponent('./components/CV/CV');
const PageNotFound = getComponent('./components/PageNotFound');

const App = () => (
    <Startup>
        <Router>
            <div>
                <Alerts />
                <NavigationBar />
                <div className="main-content">
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
);

export default App;