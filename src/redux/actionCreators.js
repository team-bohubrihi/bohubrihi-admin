import * as acTypes from './actionTypes';
import axios from 'axios';

// Action type dispatch pattern
export const acTypeDispatch = (type, payload = null) => ({type, payload});

export const toggleAlert = (bool) => acTypeDispatch(acTypes.TOGGLE_ALERT, bool);
const getNewCourseId = id => acTypeDispatch(acTypes.NEW_COURSE_ID, id);
const getCategories = cats => acTypeDispatch(acTypes.GET_CATEGORIES, cats);
const getFeatures = features => acTypeDispatch(acTypes.GET_FEATURES, features);

export const createCourseDraft = () => dispatch => {
    axios.post('https://admin-app-8e444-default-rtdb.firebaseio.com/courses.json', {status: 0})
    .then(res=>dispatch(getNewCourseId(res.data.name)))
}

export const updateCourseData = (data, id, type='draft') => dispatch => {
    axios.patch(`https://admin-app-8e444-default-rtdb.firebaseio.com/courses/${id}.json`, data)
}

export const loadCategories = () => dispatch => {
    axios.get('https://admin-app-8e444-default-rtdb.firebaseio.com/categories.json')
    .then(res=>dispatch(getCategories(res.data)))
}

export const loadFeatures = () => dispatch => {
    axios.get('https://admin-app-8e444-default-rtdb.firebaseio.com/features.json')
    .then(res=>dispatch(getFeatures(res.data)))
    .catch(err=>console.log(err))
}

export const addCourseFeature = data => dispatch => axios.post('https://admin-app-8e444-default-rtdb.firebaseio.com/features.json', data)
.then(res=>res.data.name);

