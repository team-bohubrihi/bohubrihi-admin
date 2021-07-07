import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {ListGroup, ListGroupItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faHome, faUniversity, faUserAlt, faTag, faBook} from '@fortawesome/free-solid-svg-icons';
import '../css/sidebar.css';

const Sidebar = () => {
  const [sidebar, setsidebar] = useState(false);
  const toggle = () => setsidebar(!sidebar);
  const location = useLocation();

  const singleLink = (to, icon, linkTxt) => (
    <ListGroupItem onClick={toggle} className={'border-dark border-left-0 border-right-0 bg-' + (location.pathname===to ? 'info' : 'transparent') }>
      <Link className='text-decoration-none text-uppercase h6 d-block text-white mt-1' to={to}>
        <FontAwesomeIcon className='mr-2' icon={icon}/>{linkTxt}
      </Link>
    </ListGroupItem>);


  return (<div className={'nav-menu position-fixed transition' + (sidebar ? ' opened' : '')}>
    <button className='border-0 rounded-right position-absolute p1-2 pt-2 text-white sidebartoggler' onClick={toggle}>
        <FontAwesomeIcon className='h3' icon={sidebar ? faAngleLeft : faAngleRight} />
    </button>

    <ListGroup className='mt-5 pt-4 rounded-0'>
      {singleLink('/', faHome, 'Home')}
      {singleLink('/courses', faUniversity, 'Courses')}
      {singleLink('#', faUserAlt, 'ADD 1')}
      {singleLink('#', faTag, 'ADD 2')}
      {singleLink('#', faBook, 'ADD 3')}
    </ListGroup>
  </div>);
};
export default Sidebar;