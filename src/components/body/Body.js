import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import { useSelector } from 'react-redux';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import NotFound404 from '../404/404';
import ManageCourse from '../courses/ManageCourse';
import Header from '../header/Header';
import Home from './home/Home';
import Sidebar from '../../UIs/Sidebar';
import '../../css/sidebar.css'
const Body = () => {
    const [sidebar, setsidebar] = React.useState(false);
    const handlesidebar = () => setsidebar(!sidebar);
    const token = useSelector((state) => state.auth.token);

    return(
        <>
        <Header />
        <div className="row">
          {token ? (
            <div className="col-sm-2">
                <div className='mysidebartoggler' onClick={handlesidebar}>
                    <i className="fas fa-bars"></i>
                </div>
                <div className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <Sidebar handlesidebar={handlesidebar}/>
                </div>
            </div>):null}

          <div className={token?"col-sm-10":"col-sm-12"}>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/courses" component={Courses} />
                <PrivateRoute path="/course/:courseId" component={ManageCourse} />

                <Route path="/recover" component={Recover} />
                <Route path="/login" component={Auth} />
                <Route path='*' component={NotFound404} />
            </Switch>
          </div>
        </div>
        </>
    );
}
export default Body;
