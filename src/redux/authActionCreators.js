/* eslint-disable */
import axios from 'axios';
import { acTypeDispatch } from './actionCreators';
import * as authAcTypes from './authActionTypes';

const usrLogin = (data) => acTypeDispatch(authAcTypes.LOGIN, data);
const authLoading = (bool) => acTypeDispatch(authAcTypes.AUTH_LOADING, bool);

export const logout = () => (dispatch) => {
    localStorage.removeItem('bohubrihiToken');
    localStorage.removeItem('bohubrihiUsrEmail');
    localStorage.removeItem('bohubrihiUId');
    localStorage.removeItem('bohubrihiExpiresIn');
    dispatch(acTypeDispatch(authAcTypes.LOGOUT));
};

export const authCheck = () => (dispatch) => {
    dispatch(authLoading(true));
    const token = localStorage.getItem('bohubrihiToken');

    if (!token || parseInt(localStorage.getItem('bohubrihiExpiresIn')) < Date.now()) {
        dispatch(logout());
        dispatch(authLoading(false));
        return;
    }

    dispatch(
        usrLogin({
            email: localStorage.getItem('bohubrihiUsrEmail'),
            token,
            uId: localStorage.getItem('bohubrihiUId'),
        })
    );
    dispatch(authLoading(false));
};

export const userAuth = (email, pass) => (dispatch) => {
    const data = {
        email,
        password: pass,
        returnSecureToken: true,
    };

    dispatch(authLoading(true));
    return axios
        .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API}`,
            data
        )
        .then((res) => {
            const { data } = res;

            localStorage.setItem('bohubrihiUsrEmail', data.email);
            localStorage.setItem('bohubrihiExpiresIn', data.expiresIn * 1000 + Date.now());
            localStorage.setItem('bohubrihiToken', data.idToken);
            localStorage.setItem('bohubrihiUId', data.localId);
            dispatch(
                usrLogin({
                    email: data.email,
                    token: data.idToken,
                    uId: data.localId,
                })
            );
            dispatch(authLoading(false));
            return res.request.status;
        })
        .catch((err) => {
            dispatch(authLoading(false));
            return err.request.status;
        });
};
