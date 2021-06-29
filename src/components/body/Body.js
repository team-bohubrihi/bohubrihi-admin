import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import { useSelector } from 'react-redux';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import Courses from '../courses/Courses';
import ManageCourse from '../courses/ManageCourse';
import Header from '../header/Header';
import Home from './home/Home';
import Sidebar from '../../UIs/Sidebar';
import '../../css/sidebar.css'
const Body = () => {
    const [sidebar, setsidebar] = React.useState(false);
    const handlesidebar = () => setsidebar(!sidebar);
    const token = useSelector((state) => state.auth.token);
console.log(token)
let x=null;
if(token){
    x=(
        <Sidebar handlesidebar={handlesidebar}/>
    )
}
    return(
        <>
            <Header />
            <div className="row">
          {token?(
          <div className="col-sm-2">
          <div className='mysidebartoggler' onClick={handlesidebar}>
            <i className="fas fa-bars"></i>
          </div>
          <div className={sidebar ? "nav-menu active" : "nav-menu"}>
              <Sidebar handlesidebar={handlesidebar}/>
          </div>
        </div>

):null}

          <div className={token?"col-sm-10":"col-sm-12"}>
          <Switch>
                {/* {token?(
                <> */}
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
                <PrivateRoute path="/courses">
                    <Courses />
                </PrivateRoute>
                <PrivateRoute path="/course/:courseId">
                    <ManageCourse />
                </PrivateRoute>
                {/* </>
):(            
                <> */}
                <Route path="/login">
                    <Auth />
                </Route>
                <Route path="/recover">
                    <Recover />
                </Route>
                {/* </>
                )}
     */}
            </Switch>
          </div>
        </div>
           
        </>
    );
}
export default Body;
