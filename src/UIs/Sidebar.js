import React from "react";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <ul className="nav-menu-items" onClick={props.handlesidebar}>
      <li className="navbar-toggle">
        <Link to="#" className="menu-bars">
          <i className="fas fa-times"></i>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/">
        <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/courses">
        <i className="fas fa-university"></i>
          <span>Courses</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/">
        <i className="fas fa-user-alt"></i>
          <span>ADD 1</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/">
        <i className="fas fa-tag"></i>
          <span>ADD 2</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/">
        <i className="fas fa-book"></i>
          <span>ADD 3</span>
        </Link>
      </li>

    </ul>
  );
};

export default Sidebar;
