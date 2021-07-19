import React from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Course = ({ id, courseName }) => {
    const linkClass = 'btn py-0 mr-1 btn-outline-';

    return (
        <ListGroupItem className='px-2 pt-2 pb-0 bg-light'>
            <img className='float-sm-left rounded mr-3' src='/defaultCourseImg.jpg'/>

            <div className='float-sm-left '>
                <Link className='h4 d-block text-decoration-none' to={`/course/${id}`}>{courseName}</Link>

                <a href='/' className={linkClass+'primary'}>View</a>
                <Link to='/edit' className={linkClass+'info'}>Edit</Link>
                <Link to='#' className={linkClass+'danger'}>Delete</Link>
                <p className='mt-1'>Published: <strong>19th December, 2021</strong></p>
            </div>
        </ListGroupItem>
    );
}
export default Course;