/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { toggleAlert } from '../../redux/actionCreators';
import { userAuth } from '../../redux/authActionCreators';
import AuthForm from '../../UIs/AuthForm';

const mapStateToProps = (state) => ({
    loading: state.auth.authLoading,
    token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
    userAuth: (email, pass) => dispatch(userAuth(email, pass)),
    toggleAlert: (bool) => dispatch(toggleAlert(bool)),
});

const Auth = props => {
    const { token } = props;
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        if (token) {
            history.replace(from);
        }
    }, [history, location.state, token]);
    const { toggleAlert, userAuth, loading } = props;

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [alertMsg, setAlertMsg] = useState(null);
    const isDisable = email === '' || pass === '';

    const handleLogin = (e) => {
        e.preventDefault();
        if (isDisable) return;
        userAuth(email, pass).then((status) => {
            if (status === 400 || status === 0) {
                toggleAlert(true);
                setAlertMsg(status === 0 ? 'No Internet Conection!' : 'User Not Found!');
            }
        });
        setPass('');
    };

    return (
        <AuthForm
            formType="login"
            alertMsg={alertMsg}
            email={email}
            pass={pass}
            onChangeEmail={setEmail}
            onChangePass={setPass}
            handleSubmit={handleLogin}
            loading={loading}
            isDisable={isDisable}
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
