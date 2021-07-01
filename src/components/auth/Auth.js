import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAlert } from '../../redux/actionCreators';
import { userAuth } from '../../redux/authActionCreators';
import AuthForm from './AuthForm';

const Auth = () => {
    const loading = useSelector(({auth})=>auth.authLoading);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [alertMsg, setAlertMsg] = useState(null);
    const isDisable = email === '' || pass === '';

    const handleLogin = (e) => {
        e.preventDefault();
        if (isDisable) return;
        dispatch(userAuth(email, pass)).then((status) => {
            if (status === 400 || status === 0) {
                dispatch(toggleAlert(true));
                setAlertMsg(status === 0 ? 'No Internet Conection!' : 'User Not Found!');
            }
        });
        setPass('');
    };

    return <AuthForm
        formType="login"
        alertMsg={alertMsg}
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