import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {authCheck} from '../redux/authActionCreators';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state=>state.auth.token);

    const dispatch = useDispatch();
    useEffect(() => {
        if(!token)dispatch(authCheck());
    }, [dispatch, token]);

    return <Route
        {...rest}
        render={({location, ...children}) =>(token ? <Component {...children} />: (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: location },
                }}/>
            ))
        }
    />;
};
export default PrivateRoute;