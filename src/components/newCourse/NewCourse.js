import React, {useState, useEffect} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Card, CardHeader, CardTitle, CardBody, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import NewCourseRoute from './newCourseRoute/NewCourseRoute';
import { titleChanger } from '../../utils/helpers';
import '../../css/newCourse.css';

const NewCourse = () => {
    //Handles responsive NewCourse navbar
    const [isOpen, setIsOpen] = useState(false);
    const [resNavClass, setResNavClass] = useState('');
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const isSm = windowSize<768;

    const navToggler = isSm ? <Button color='primary' onClick={()=>setIsOpen(!isOpen)} className='position-absolute courseNavbarBtn px-2 pt-1'>{isOpen ? '-' : '+'}</Button> : null;

    window.onresize = ()=>setWindowSize(window.innerWidth);
    useEffect(()=>setResNavClass(isSm ? 'position-absolute newCourseNavbar transition' : ''), [windowSize]);

    const location = useLocation();
    const path = location.pathname;
    const history = useHistory();
    const id = useSelector(state=>state.courseManage.newCourse.id);

    useEffect(()=>{
        if(!id && path!=='/new-course/landing-page')history.push('/');
    }, []);

    const link = (to, label) => {
        let active = '';
        to='/new-course/'+to;
        if(path===to){
            titleChanger(label);
            active = 'bg-light activeCourseTab';
        }

        return(<ListGroupItem className={'p-0 border-right-0 ' + active}>
            <Link className='d-block py-3 px-2 text-decoration-none text-primary' to={to}>{label}</Link>
        </ListGroupItem>)
    }

    return (<div className='px-md-3 py-1 m-auto maxElementWidth'>
        <Card className='border-secondary'>
            <CardHeader className='pb-0 text-white bg-secondary'>
                <CardTitle tag='h4'>Add New Course</CardTitle>
            </CardHeader>

            <CardBody className='p-1'>
                <Row className='m-0 position-relative'>
                    <Col className={'p-0 '+resNavClass + (isOpen ? ' newCourseNavbarOpen' : '')} xl='2' lg='2' md='2'>
                        {navToggler}
                        <ListGroup className='mt-md-5 rounded-0'>
                            {link('landing-page', 'Landing Page')}
                            {link('course-contents', 'Contents')}
                            {link('syllabus', 'Syllabus')}
                            {link('pricing', 'Pricing')}
                            {link('instructor', 'Instructor')}
                        </ListGroup>
                    </Col>

                    <Col className='p-1 p-md-3 border rounded bg-light routeWrap' xl='10' lg='10' md='10' sm='12' xs='12'>
                        <NewCourseRoute/>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>)
}
export default NewCourse;