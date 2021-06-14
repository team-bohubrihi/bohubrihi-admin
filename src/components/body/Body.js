import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import ManageCourse from '../courses/ManageCourse';
import Header from '../header/Header';
import Home from './home/Home';

const Body = () => (
    <>
        <Header />
        <Switch>
            <PrivateRoute exact path="/">
                <Home />
            </PrivateRoute>
            <PrivateRoute path="/courses">
                <Courses />
            </PrivateRoute>
            <PrivateRoute path="/course/:courseId">
                <ManageCourse />
            </PrivateRoute>
            <Route path="/login">
                <Auth />
            </Route>
            <Route path="/recover">
                <Recover />
            </Route>
        </Switch>
    </>
);
export default Body;
