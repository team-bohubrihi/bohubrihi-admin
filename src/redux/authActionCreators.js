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

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('bohubrihiToken');
    const email = localStorage.getItem('bohubrihiUsrEmail');
    const uId = localStorage.getItem('bohubrihiUId');

    if (!token || parseInt(localStorage.getItem('bohubrihiExpiresIn')) < Date.now() || !email || !uId) {
        dispatch(logout());
        return;
    }

    dispatch(usrLogin({email, token, uId}));
};

export const userAuth = (email, pass) => dispatch => {
    if(!email || !pass)return;
    const data = {
        email,
        password: pass,
        returnSecureToken: true,
    };

    dispatch(authLoading(true));
    return axios
        .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API}`, data)
        .then(res => {
            const { email, expiresIn, idToken, localId } = res.data;

            localStorage.setItem('bohubrihiUsrEmail', email);
            localStorage.setItem('bohubrihiExpiresIn', expiresIn * 1000 + Date.now());
            localStorage.setItem('bohubrihiToken', idToken);
            localStorage.setItem('bohubrihiUId', localId);
            dispatch(
                usrLogin({
                    email,
                    token: idToken,
                    uId: localId,
                })
            );
            dispatch(authLoading(false));
            return res.request.status;
        })
        .catch((res) => {
            dispatch(authLoading(false));
            return res.request.status;
        });
};
