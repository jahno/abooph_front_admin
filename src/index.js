import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';

import PrivateRoute from './components/private-route';
import PublicRoute from './components/public-route';

import { ScrollContext } from 'react-router-scroll-4';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

// Global components
import { Provider } from 'react-redux';
import store from './redux/store';

//Pages
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/auth/login';
import PasswordForgotten from './components/pages/auth/password-forgotten';
import PasswordReset from './components/pages/auth/password-reset';
import Admin from './components/pages/admin';
import Dressmaker from './components/pages/dressmaker';
import Steed from './components/pages/steed';
import Article from './components/pages/article';
import Order from './components/pages/order';
import Profile from './components/pages/profile';

import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

function Root() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <ScrollContext>
                    <Switch>
                        {/* public */}
                        <Route exact path={`/login`} component={Login} />
                        <PublicRoute exact path={`/mot-de-passe-oublie`} component={PasswordForgotten} />
                        <PublicRoute exact path={`/nouveau-mot-de-passe/:token`} component={PasswordReset} />

                        {/* private */}
                        <PrivateRoute exact path={`/`} component={Dashboard} />
                        <PrivateRoute path={`/admins`} component={Admin} />
                        
                        <PrivateRoute path={`/couturiers`} component={Dressmaker} />
                        <PrivateRoute path={`/coursiers`} component={Steed} />
                        <PrivateRoute path={`/profil`} component={Profile} />

                        <PrivateRoute path={`/articles`} component={Article} />

                        <PrivateRoute path={`/commandes`} component={Order} />

                        <Redirect to={`/`} />
                    </Switch>
                </ScrollContext>
            </Router>

            <ToastContainer/>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));


