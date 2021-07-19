import * as acTypes from './actionTypes';
import axios from 'axios';

// Action type dispatch pattern
export const acTypeDispatch = (type, payload = null) => ({type, payload});

export const toggleAlert = (isOpen, type='', msg='', callback=null) => acTypeDispatch(acTypes.TOGGLE_ALERT, {isOpen, type, msg, callback});
const getNewCourse = data => acTypeDispatch(acTypes.NEW_COURSE, data);
const getCategories = cats => acTypeDispatch(acTypes.GET_CATEGORIES, cats);
const getFeatures = features => acTypeDispatch(acTypes.GET_FEATURES, features);

export const createCourseDraft = () => dispatch => {
    const newCourse = {
        cat: '',
        desc: '',
        difficulty: '',
        discount: '',
        duration: '',
        features: [],
        language: '',
        price: '',
        totalPrice: 'Free',
        status: '',
        subtitle: '',
        syllabusDesc: '',
        title: ''
    }
    axios.post('https://admin-app-8e444-default-rtdb.firebaseio.com/courses.json', newCourse)
    .then(res=>dispatch(getNewCourse({id: res.data.name})))
}

export const updateCourseData = (data, id, name='desc', feature=null, features, type='draft') => dispatch => {
    const target = data.target;
    let value = data.converted;
    let newData = {};

    if(target && !feature){
        name = target.name;
        value = target.value;
        if((target.type==='number' && value<0) || (name==='discount' && value>100))return;
        if(name==='discount'){
            newData.totalPrice = target.totalPrice;
        }else if(name==='price'){
            newData.totalPrice = target.value;
            if(target.value==='' || target.value===0){
                newData.discount='';
                newData.totalPrice = 'Free';
            }
        }
        
    }
    if(feature){
        value = [...features];
        target.checked ? value = [...value, feature] : value.splice(value.indexOf(feature), 1);
    }

    newData[name]=value;
    axios.patch(`https://admin-app-8e444-default-rtdb.firebaseio.com/courses/${id}.json`, newData);
    let raw = data.raw;//raw data of desc and syllabusDes fields
    if(raw)newData[name]=raw;//Stores the editor's data in reducer
    dispatch(getNewCourse(newData));
}

export const loadCategories = () => dispatch => {
    axios.get('https://admin-app-8e444-default-rtdb.firebaseio.com/categories.json')
    .then(res=>dispatch(getCategories(res.data)))
}

export const loadFeatures = () => dispatch => {
    return axios.get('https://admin-app-8e444-default-rtdb.firebaseio.com/features.json')
    .then(res=>dispatch(getFeatures(res.data)))
    .catch(err=>console.log(err))
}

export const addCourseFeature = data => dispatch => axios.post('https://admin-app-8e444-default-rtdb.firebaseio.com/features.json', data)
.then(res=>{
    dispatch(toggleAlert(true, 'success', 'Successfully uploaded and added as this course feature.'));
    return res.data.name
});