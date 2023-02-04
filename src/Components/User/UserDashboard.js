import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import MyProfile from "./MyProfile/MyProfile";
import MyCourses from "./MyCourses/MyCourses";
import MyBookmarks from "./MyBookmarks/MyBookmarks";
import MyCart from "./MyCart/MyCart";
import MyOrder from "./MyOrder/MyOrder";
import MySettings from "./MySettings/MySettings";
import UserFooter from "./UserFooter/UserFooter";
import { Route, Switch } from "react-router-dom";
import MyCertificate from "./MyCertificates/MyCertificate";
import UserNav from "./Navbar/UserNav";
import Navbar from "../Navbar/Navbar";
import AuthContext from "../../Context/auth-context";
// import { auth } from "../../Services/firebase";
import { CoursesContextProvider } from "../../Context/courses-context";

const UserDashboard = (props) => {
  const authCtx = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    console.log("userDashboard-authCtx_user", authCtx.user, props.history);
    if (authCtx.user !== null) {
      setBookmarks(authCtx.user.bookmarks);
    }
  }, [authCtx.user, props.history]);

  let userDashboard = null;
  if (bookmarks === null) {
    userDashboard = <p>Loading!!!</p>;
  } else if (bookmarks !== null) {
    userDashboard = <MyBookmarks bookmarks={bookmarks} {...props} />;
  }

  return (
    <>
      <UserNav {...props} />
      <section style={{ backgroundColor: "#f9fafc;" }}>
        <CoursesContextProvider>
          <div class="container-fluid mt60">
            <div class="row m-0">
              <Sidebar {...props} />
              <div class="col-md-9 col-lg-10 col-xl-10 scrollbar">
                <Header />
                <Switch>
                  <Route path={`${props.match.url}/myProfile`}>
                    <MyProfile {...props} />
                  </Route>
                  <Route path={`${props.match.url}/mycourses`}>
                    <MyCourses />
                  </Route>
                  <Route path={`${props.match.url}/mybookmarks`}>
                    {userDashboard}
                  </Route>
                  <Route path={`${props.match.url}/mycart`}>
                    <MyCart {...props} />
                  </Route>
                  <Route path={`${props.match.url}/myorder`}>
                    <MyOrder {...props} />
                  </Route>
                  <Route path={`${props.match.url}/mysettings`}>
                    <MySettings {...props} />
                  </Route>
                  <Route path={`${props.match.url}/myCertificates`}>
                    <MyCertificate {...props} />
                  </Route>
                </Switch>
                <UserFooter />
              </div>
            </div>
          </div>
        </CoursesContextProvider>
      </section>
    </>
  );
};

export default UserDashboard;
