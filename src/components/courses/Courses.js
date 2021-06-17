import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Course from './Course';

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
        <div>
            <h1>Courses</h1>
            {data.map((course) => (
                <Course key={course.id} {...course} />
            ))}
        </div>
    );
};

export default Courses;
