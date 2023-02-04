import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AuthContext from "../../../Context/auth-context";
import CoursesContext from "../../../Context/courses-context";
import SingleCourseBought from "./SingleCourseBought";
import SingleCourseDetials from "./SingleCourseDetails";
import { getCourse } from "./singleCourseDB";
import Spinner from "../../../UI/Spinner/Spinner";
import Zoom from "../../../NewFeatureTest/Zoom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let subcategoryId = null;
const CourseDetails = (props) => {
  // if course bought - singleCourseBought
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const query = useQuery();
  const ctx = useContext(CoursesContext);
  const [course, setCourse] = useState(null);
  const [courseBought, setCourseBought] = useState(null);
  const [ongoingIndex, setOngoingIndex] = useState(-1);
  // if ctx.course is null, get the courseId and check in localDb, if it is not in localDB then get from the server
  // console.log(
  //   "singleCourse",
  //   params.courseId,
  //   ctx.course,
  //   query.get("subcategoryId")
  // );

  // check in local, whether the courseId is available or not
  // if it is not there, then
  // get sections, topics, materials, quiz data from server
  // and populate to store in indexedDB
  // if the courseId is in indexedDB, then get that data
  // and set section state

  // if course is not bought,
  // course is bought
  useEffect(() => {
    // if singlecourse page is refreshed or if it is from some other route
    subcategoryId = query.get("subcategoryId");
    if (ctx.course === null) {
      getCourse((course) => setCourse(course), params.courseId, subcategoryId);
    } else {
      setCourse(ctx.course);
    }
    // if the course is not bought
  }, []);

  useEffect(() => {
    // if the user is not signed in, then courseBought is false
    // console.log("authCtx", authCtx);
    // authCtx.user --- makes optimization
    // if (authCtx.user !== null && !authCtx.isLoggedIn) {
    // localStorage.getItem("userId") - to confirm, whether the user is not logged in
    if (localStorage.getItem("userId") === null && !authCtx.isLoggedIn) {
      // console.log("auth no login", localStorage.getItem("userId"));
      setCourseBought(false);
    } else if (authCtx.user !== null) {
      // if it is in ongoing courses, then it is bought else it is not
      // let courseId = ctx.course.id;
      let courseId = params.courseId;
      // console.log(
      //   "courseDetails----------------else",
      //   authCtx.user,
      //   authCtx.isLoggedIn
      // );
      let index = -1;
      if (
        authCtx.user !== null &&
        authCtx.user !== undefined &&
        authCtx.user.ongoingCourses !== undefined
      ) {
        index = authCtx.user.ongoingCourses.findIndex(
          (course) => course.id === courseId
        );
        if (index === -1) {
          // console.log("index----", index);
          setCourseBought(false);
        } else {
          setCourseBought(true);
          setOngoingIndex(index);
        }
      }

      // console.log("single details, courseBought", courseBought);
    }
  }, [authCtx, params.courseId]);

  let ui = null;
  if (courseBought === null) {
    // console.log("courseBought---null");
    ui = <Spinner />;
  } else if (courseBought !== null) {
    // console.log("courseBought---true/false", courseBought);
    ui = courseBought ? (
      course.types === "Live" ? (
        <Zoom />
      ) : (
        <SingleCourseBought
          ongoingIndex={ongoingIndex}
          authCtx={authCtx}
          course={course}
          subcategoryId={subcategoryId}
          courseId={params.courseId}
        />
      )
    ) : (
      <SingleCourseDetials
        course={course}
        subcategoryId={subcategoryId}
        courseId={params.courseId}
      />
    );
  }

  return ui;
};

export default CourseDetails;
