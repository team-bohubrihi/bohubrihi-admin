import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { userAuth } from '../../redux/authActionCreators';
import AuthForm from './AuthForm';

const Auth = () => {
    const location = useLocation();
    const history = useHistory();
    const loading = useSelector(({auth})=>auth.authLoading);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const isDisable = email === '' || pass === '';

    const handleLogin = (e) => {
        e.preventDefault();
        if (isDisable) return;
        dispatch(userAuth(email, pass))
        .then(()=>{
            //if(location.state.from.pathname.indexOf('new-course')>-1)history.push('/');
        })
        setPass('');
    };

    return <AuthForm
        formType="login"
        email={email}
        pass={pass}
        onChangeEmail={setEmail}
        onChangePass={setPass}
        handleSubmit={handleLogin}
        loading={loading}
        isDisable={isDisable}
        dispatch={dispatch}
    />;
};
export default Auth;