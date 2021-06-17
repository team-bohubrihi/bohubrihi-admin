import * as acTypes from './actionTypes';

// Action type dispatch pattern
export const acTypeDispatch = (type, data = null) => ({
    type,
    payload: data,
});

export const toggleAlert = (bool) => acTypeDispatch(acTypes.TOGGLE_ALERT, bool);
