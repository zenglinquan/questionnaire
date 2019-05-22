import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Home from './pages/Home';
import Main from './pages/Main';
import Survey from './pages/Survey';
import Appearance from './pages/Appearance';
import Logic from './pages/Logic';
import Login from './pages/Login';
import './css/all.less'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/login" component={Login} />
        <Route path='/' component={Main}>
            <Route path="" component={Survey} />
            <Route path="/survey" component={Survey} />
            <Route path="/publish" component={Main} />
            <Route path="/appearance" component={Appearance} />
            <Route path="/logic" component={Logic} />
        </Route>

    </Router>
), document.getElementById('app'));