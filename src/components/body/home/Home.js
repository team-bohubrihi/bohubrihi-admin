import { useEffect } from 'react';
import { titleChanger } from '../../../utils/helpers';
// import Courses from '../../courses/Courses';

const Home = () => {
    useEffect(() => titleChanger('Home'));
    return <div>Home</div>;
    // return <Courses />;
};
export default Home;
