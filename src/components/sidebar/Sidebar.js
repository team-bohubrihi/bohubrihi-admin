import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {ListGroup, ListGroupItem} from 'reactstrap';
import {titleChanger} from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faHome, faBook, faPlusSquare, faList, faTags} from '@fortawesome/free-solid-svg-icons';
import '../../css/sidebar.css';

const Sidebar = () => {
  const [sidebar, setsidebar] = useState(false);
  const toggle = () => setsidebar(!sidebar);
  const location = useLocation();

  const singleLink = (to, icon, linkTxt) => {
    let activeClass = 'transparent';
    if(location.pathname===to){
      activeClass = 'info';
      titleChanger(linkTxt);
    }

    return(<ListGroupItem onClick={toggle} className={'border-dark border-left-0 border-right-0 p-0 bg-' + activeClass }>
      <Link className='text-decoration-none text-uppercase h6 d-block p-3 text-white mt-1' to={to}>
        <FontAwesomeIcon className='mr-2' icon={icon}/>{linkTxt}
      </Link>
    </ListGroupItem>)
  }

  return (<div className={'nav-menu position-fixed transition' + (sidebar ? ' opened' : '')}>
    <button className='border-0 rounded-right position-absolute p-2 pt-3 text-white sidebartoggler' onClick={toggle}>
        <FontAwesomeIcon className='h3' icon={sidebar ? faAngleLeft : faAngleRight} />
    </button>

    <ListGroup className='mt-5 pt-4 rounded-0'>
      {singleLink('/', faHome, 'Home')}
      {singleLink('/courses', faBook, 'Courses')}
      {singleLink('/new-course/landing-page', faPlusSquare, 'New Course')}
      {singleLink('/category', faList, 'Categories')}
      {singleLink('/feature', faTags, 'Features')}
    </ListGroup>
  </div>);
};
export default Sidebar;