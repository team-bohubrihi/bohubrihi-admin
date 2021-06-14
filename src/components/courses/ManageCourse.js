import React from 'react';
import { Redirect, Switch, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import Sections from './sections/Sections';

function ManageCourse() {
    const { courseId } = useParams();

    const { url } = useRouteMatch();

    return (
        <div>
            <ul>
                <Link to={`${url}/section`}>Sections</Link>
                <br />
                <Link to={`${url}/section`}>Pricing</Link>
                <br />
                <Link to={`${url}/section`}>Course Landing page</Link>
            </ul>
            <Switch>
                <PrivateRoute path={`${url}/section`}>
                    <Sections courseId={courseId} />
                </PrivateRoute>
                <PrivateRoute path={`${url}`}>
                    <Redirect to={`${url}/section`} />
                </PrivateRoute>
            </Switch>
        </div>
    );
}

export default ManageCourse;
