import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import ManageCourse from '../courses/ManageCourse';
import Header from '../header/Header';
import Home from './home/Home';
import {authCheck} from '../../redux/authActionCreators';
import {useSelector, useDispatch} from 'react-redux';

const Body = () => {
    const token = useSelector(state=>state.auth.token);

    const dispatch = useDispatch();
    useEffect(() => {
        if(!token)dispatch(authCheck());
    }, [dispatch, token]);


    return(<>
        {token ? <Header /> : null}
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/courses" component={Courses} />
            <PrivateRoute path="/course/:courseId" component={ManageCourse} />
            <Route path="/login" component={Auth} />
            <Route path="/recover" component={Recover} />
        </Switch>
    </>)
}
export default Body;
