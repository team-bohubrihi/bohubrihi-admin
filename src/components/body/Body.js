import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import ManageCourse from '../courses/ManageCourse';
import NotFound404 from '../404/404';
import Header from '../header/Header';
import Home from './home/Home';

const Body = () => (<>
    <Header />
    <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/courses" component={Courses} />
        <PrivateRoute path="/course/:courseId" component={ManageCourse} />

        <Route path="/recover" component={Recover} />
        <Route path="/login" component={Auth} />
        <Route path='*' component={NotFound404} />
    </Switch>
</>);
export default Body;