import React from 'react';
import {Switch} from 'react-router-dom';
import CourseLandingPage from './routeComponents/landingPage/CourseLandingPage';
import Contents from './routeComponents/contents/Contents';
import Syllabus from './routeComponents/syllabus/Syllabus';
import Pricing from './routeComponents/pricing/Pricing';
import Instructor from './routeComponents/instructor/Instructor';
import Publishing from './routeComponents/publish/Publish';
import PrivateRoute from '../../../hoc/PrivateRoute';

const NewCourseRoutes = () => (<Switch>
    <PrivateRoute path='/new-course/landing-page' component={CourseLandingPage} />

    <PrivateRoute path='/new-course/course-contents' component={Contents} />

    <PrivateRoute path='/new-course/syllabus' component={Syllabus} />

    <PrivateRoute path='/new-course/pricing' component={Pricing} />

    <PrivateRoute path='/new-course/instructor' component={Instructor} />

    <PrivateRoute path='/new-course/publishing' component={Publishing} />
</Switch>);

export default NewCourseRoutes;