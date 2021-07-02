import React, {useState} from "react";
import { Link } from "react-router-dom";
import {ListGroup, ListGroupItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faHome, faUniversity, faUserAlt, faTag, faBook} from '@fortawesome/free-solid-svg-icons';
import '../css/sidebar.css';

const Sidebar = () => {
  const [sidebar, setsidebar] = useState(false);
  const toggle = () => setsidebar(!sidebar);

  const listItemClasses = 'bg-transparent border-dark border-left-0 border-right-0';
  const linkClasses = 'text-decoration-none text-uppercase h6 d-block text-white mt-1';

  return (<div className={'nav-menu position-fixed transition' + (sidebar ? ' opened' : '')}>

    <button className='border-0 rounded-right position-absolute p1-2 pt-2 text-white sidebartoggler' onClick={toggle}>
        <FontAwesomeIcon className='h3' icon={sidebar ? faAngleLeft : faAngleRight} />
    </button>

    <ListGroup className='mt-5 pt-4 rounded-0'>
      <ListGroupItem onClick={toggle} className={listItemClasses}>
        <Link className={linkClasses} to="/">
          <FontAwesomeIcon className='mr-2' icon={faHome}/>Home
        </Link>
      </ListGroupItem>

      <ListGroupItem onClick={toggle} className={listItemClasses}>
        <Link className={linkClasses} to="/courses">
          <FontAwesomeIcon className='mr-2' icon={faUniversity}/>Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem onClick={toggle} className={listItemClasses}>
        <Link className={linkClasses} to="/">
          <FontAwesomeIcon className='mr-2' icon={faUserAlt}/>ADD 1
        </Link>
      </ListGroupItem>

      <ListGroupItem onClick={toggle} className={listItemClasses}>
        <Link className={linkClasses} to="/">
          <FontAwesomeIcon className='mr-2' icon={faTag}/>ADD 2
        </Link>
      </ListGroupItem>

      <ListGroupItem onClick={toggle} className={listItemClasses}>
        <Link className={linkClasses} to="/">
          <FontAwesomeIcon className='mr-2' icon={faBook}/>ADD 3
        </Link>
      </ListGroupItem>
    </ListGroup>
  </div>);
};
export default Sidebar;