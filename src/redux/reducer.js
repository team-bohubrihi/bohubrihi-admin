import { combineReducers } from 'redux';
import * as acTypes from './actionTypes';
import * as authAcTypes from './authActionTypes';

const initialState = {
    email: null,
    token: '',
    uId: null,
    authLoading: false,
    showAlert: false,
};

// This reducer is used for authentication.
const authReducer = (state = initialState, action) => {
    let result;
    switch (action.type) {
        case authAcTypes.LOGIN:
            result = action.payload;
            return {
                ...state,
                email: result.email,
                token: result.token,
                uId: result.uId,
            };

        case authAcTypes.LOGOUT:
            return initialState;

        case authAcTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            };

        default:
            return state;
    }
};

// this reducer handles the utility(like loading, alerts appearance except auth's) of the app
const utilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case acTypes.TOGGLE_ALERT:
            return {
                ...state,
                showAlert: action.payload,
            };

        default:
            return state;
    }
};

// Combining all the reducers
const reducer = combineReducers({
    auth: authReducer,
    utility: utilityReducer,
});
export default reducer;
