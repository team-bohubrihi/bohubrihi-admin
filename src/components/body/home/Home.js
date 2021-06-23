import { useEffect } from 'react';
import { titleChanger } from '../../../utils/helpers';
// import Courses from '../../courses/Courses';
import CourseUploadPanelForm from '../../../UIs/CourseUploadPanelForm';

const Home = () => {
    useEffect(() => titleChanger('Home'));
    return <CourseUploadPanelForm/>;
};
export default Home;