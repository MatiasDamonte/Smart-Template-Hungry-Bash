import React, { useContext, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Switch, useHistory } from "react-router-dom";

import Home from "./Home/Home";
import Courses from "./Courses/Courses";
import Institution from "./Institution/Institution";
import Exams from "./Exams/Exams";
import Aboutus from "./Aboutus/Aboutus";
import Contactus from "./Contact/Contactus";
import Footer from "./Footer/Footer";
import Scroller from "../UI/Scroller";
import SingleCourseDetails from "./Courses/SingleCoursedt/SingleCourseDetails";
import SingleInstitutionDetails from "./Institution/InstitutionSingle/SingleInstitutionDetails";
import { CoursesContextProvider } from "../Context/courses-context";
import { InstitutionContextProvider } from "../Context/institution-context";
import CourseDetails from "./Courses/SingleCoursedt/CourseDetails";
import $ from "jquery";

import IdleTimeoutModal from "../UI/IdleTimeOutModal";
import IdleTimerContainer from "../Helpers/IdleTimerContainer";
import { auth, db } from "../Services/firebase";
import AuthContext from "../Context/auth-context";

const Dashboard = (props) => {
  // console.log("dashboard", props.history);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isTimedout, setIsTimedout] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    // sessionStorage.setItem("check", "good");
    // authCtx.logout();
    // localStorage.removeItem("userId");
    // history.replace("/logout");
    return (ev.returnValue = "Are you sure you want to close?");
  });

  // $(function () {
  //   $(window).bind("beforeunload", function () {
  //     setTimeout(function () {
  //       let userId = null;
  //       try {
  //         userId = authCtx.user.id;
  //       } catch (err) {
  //         console.log("err", err);
  //       }
  //       setTimeout(function () {
  //         // $(document.body).css("background-color", "red");
  //         // console.log("userId", userId);
  //         if (userId !== null) {
  //           console.log("not null");
  //           // localStorage.setItem("userId", userId);
  //         }
  //         // history.replace("/login");
  //       }, 1000);
  //     }, 1);
  //     // authCtx.logout();
  //     // localStorage.removeItem("userId");
  //     return "are you sure";
  //   });
  // });

  const handleClose = () => {
    setShowTimeoutModal(false);
    setIsTimedout(false);
  };

  const timeoutModalHandler = () => {
    setShowTimeoutModal(true);
  };

  const logoutHandler = () => {
    setShowTimeoutModal(false);
    authCtx.setUser(null);
    db.collection("students")
      .doc(authCtx.user.id)
      .update({
        isLoggedIn: false
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            localStorage.removeItem("userId");
            // Sign-out successful.
            console.log("signed out successfully...");
            // alert("signed out");
            props.history.replace("/login");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {/* {console.log(localStorage.getItem("userId"))} */}
      {localStorage.getItem("userId") !== null && (
        <>
          <IdleTimeoutModal
            showModal={showTimeoutModal}
            handleClose={handleClose}
            handleLogout={logoutHandler}
          />
          <IdleTimerContainer
            handleLogout={logoutHandler}
            timeout={isTimedout}
            timeoutModal={timeoutModalHandler}
            timedoutHandler={(bool) => {
              setIsTimedout(bool);
            }}
          />
        </>
      )}

      <Navbar {...props} />
      {/* <p>Navbar</p> */}
      <InstitutionContextProvider>
        <CoursesContextProvider>
          <Switch>
            <Route path={`/dashboard/home`}>
              <Home {...props} />
            </Route>
            <Route path={`/dashboard/courses/:courseId`}>
              {/* <SingleCourseDetails /> */}
              <CourseDetails />
            </Route>
            <Route path={`/dashboard/courses`}>
              <Courses {...props} />
            </Route>
            <Route path={`/dashboard/institution/:institutionId`}>
              <SingleInstitutionDetails />
            </Route>
            <Route path={`/dashboard/institution`}>
              <Institution {...props} />
            </Route>
            <Route path={`/dashboard/exams`}>
              <Exams {...props} />
            </Route>
            <Route path={`/dashboard/aboutus`}>
              <Aboutus {...props} />
            </Route>
            <Route path={`/dashboard/contactus`}>
              <Contactus {...props} />
            </Route>
          </Switch>
        </CoursesContextProvider>
      </InstitutionContextProvider>
      <Footer />
      <Scroller />
    </>
  );
};

export default Dashboard;
