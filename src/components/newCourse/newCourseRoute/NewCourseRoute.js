import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CourseLandingPage from './routeComponents/landingPage/CourseLandingPage';
import Contents from './routeComponents/contents/Contents';
import Syllabus from './routeComponents/syllabus/Syllabus';
import Pricing from './routeComponents/pricing/Pricing';
import Instructor from './routeComponents/instructor/Instructor';
import PrivateRoute from '../../../hoc/PrivateRoute';

const NewCourseRoute = () => (<Switch>
    <Route path='/new-course/landing-page' component={CourseLandingPage} />

    <PrivateRoute path='/new-course/course-contents' component={Contents} />

    <PrivateRoute path='/new-course/syllabus' component={Syllabus} />

    <PrivateRoute path='/new-course/pricing' component={Pricing} />

    <PrivateRoute path='/new-course/instructor' component={Instructor} />

</Switch>);

export default NewCourseRoute;