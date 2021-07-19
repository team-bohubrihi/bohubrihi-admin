/* eslint-disable */
import axios from 'axios';
import { acTypeDispatch, toggleAlert } from './actionCreators';
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

// In case token is expired
const authTimeout = expTime => dispatch => {
    setTimeout(()=>dispatch(toggleAlert(true, 'danger', 'Your token is expired, logging you out.', ()=>dispatch(logout()))), expTime-Date.now());
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('bohubrihiToken');
    const email = localStorage.getItem('bohubrihiUsrEmail');
    const uId = localStorage.getItem('bohubrihiUId');
    const expTime = parseInt(localStorage.getItem('bohubrihiExpiresIn'));

    if (!token || expTime < Date.now() || !email || !uId) {
        dispatch(logout());
        return;
    }

    dispatch(usrLogin({email, token, uId}));
    dispatch(authTimeout(expTime));
};

export const userAuth = (email, pass) => dispatch => {
    if(!email || !pass)return;
    const data = {
        email,
        password: pass,
        returnSecureToken: true,
    };

    dispatch(authLoading(true));
    return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API}`, data)
    .then(res => {
        const { email, expiresIn, idToken, localId } = res.data;
        const expTime = expiresIn * 1000 + Date.now();

        localStorage.setItem('bohubrihiUsrEmail', email);
        localStorage.setItem('bohubrihiExpiresIn', expTime);
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
        dispatch(authTimeout(expTime));
    })
    .catch(({request}) => {
        dispatch(authLoading(false));
        dispatch(toggleAlert(true, 'danger', request.status === 0 ? 'No Internet Conection' : 'User Not Found'));
    });
};
