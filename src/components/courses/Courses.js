import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Course from './Course';
import { Link } from 'react-router-dom';
import {Card, CardHeader, CardTitle, CardBody, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const Courses = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            const res = await axios.get(
                'https://bohubrihi-backend-default-rtdb.firebaseio.com/courses.json'
            );

            const array = Object.keys(res.data).map((d, i) => {
                const obj = Object.values(res.data)[i];
                obj.id = d;
                return obj;
            });

            setData(array);
        }

        getData();
    }, []);

    return (
        <div className='p-1 p-sm-2'>
        <Card>
            <CardHeader>
                <CardTitle tag='h3'>
                    Courses

                    <Link title='Add a new course' to='/new-course/landing-page' className='float-right'>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardBody className='p-2'>
                <ListGroup>
                    {data.map((course) => (
                            <Course key={course.id} {...course} />
                    ))}
                </ListGroup>
            </CardBody>
        </Card>
        </div>
    );
};

export default Courses;
