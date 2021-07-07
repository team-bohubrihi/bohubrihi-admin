import React from 'react';

const Categories = ({cats}) => {
    const mapCategories = [];
    for(let cat in cats)mapCategories.push(<option key={cat} value={cat}>{cats[cat]['name']}</option>);

    return <>
        <option>--Category--</option>
        {cats ? mapCategories : <option>Loading...</option>}
    </>;
}
export default Categories;