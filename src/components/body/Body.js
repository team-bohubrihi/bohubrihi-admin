import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import { useSelector } from 'react-redux';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import NewCourse from '../newCourse/NewCourse';
import NotFound404 from '../404/404';
import ManageCourse from '../courses/ManageCourse';
import Header from '../header/Header';
import Home from '../home/Home';
import Category from '../category/Category';
import Feature from '../feature/Feature';
import Sidebar from '../sidebar/Sidebar';
import AlertMsg from '../../utils/AlertMsg';

const Body = () => {
    const {token, isOpen} = useSelector((state) => ({
        token: state.auth.token,
        isOpen: state.utility.showAlert
    }));

    return(<>
        {token ? <><Header/><Sidebar/></> : null}
        <AlertMsg/>

        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/courses" component={Courses} />
            <PrivateRoute path="/course/:courseId" component={ManageCourse} />
            <PrivateRoute path="/new-course" component={NewCourse} />
            <PrivateRoute path="/category" component={Category} />
            <PrivateRoute path="/feature" component={Feature} />

            <Route path="/recover" component={Recover} />
            <Route path="/login" component={Auth} />
            <Route path='*' component={NotFound404} />
        </Switch>
    </>);
}
export default Body;