import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddSection from './AddSection';
import Section from './Section';

function Sections({ courseId }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            const res = await axios.get(
                `https://bohubrihi-backend-default-rtdb.firebaseio.com/sections.json?orderBy="courseId"&equalTo="${courseId}"`
            );

            const array = Object.keys(res.data).map((d, i) => {
                const obj = Object.values(res.data)[i];
                obj.id = d;
                return obj;
            });
            array.sort((a, b) => a.sec_no - b.sec_no);
            setData(array);
        }
        getData();
    }, [courseId]);

    return (
        <div>
            <h1>Sections Page</h1>
            <AddSection courseId={courseId} secNo={data.length + 1} />
            {data.map((section) => (
                <Section key={section.id} {...section} />
            ))}
        </div>
    );
}

export default Sections;
