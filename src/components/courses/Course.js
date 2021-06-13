import React from 'react';
import { Link } from 'react-router-dom';

function Course(props) {
    const { id, courseName } = props;

    return (
        <div>
            <h1>
                <Link to={`/course/${id}`}>{courseName} </Link>
            </h1>
        </div>
    );
}

export default Course;
