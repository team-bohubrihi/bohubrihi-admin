/* eslint-disable camelcase */
import React from 'react';

function Section(props) {
    const { name, sec_no } = props;

    return (
        <div>
            <h2>
                {sec_no} | {name}
            </h2>
        </div>
    );
}

export default Section;
