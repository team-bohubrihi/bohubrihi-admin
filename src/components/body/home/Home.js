import React, {useEffect} from 'react';
import {titleChanger} from '../../../utils/helpers';

const Home = props=>{
    useEffect(()=>titleChanger('Home'));
    return <div>Home</div>
}
export default Home;