import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import localforage from "localforage";

import CourseOverview from "./CourseOverview";
import CourseContent from "./CourseContent";
// import StudentFeedbackList from "./StudentFeedback";
// import StudentFeedbackForm from "./StudentFeedbackForm";
// import CourseReview from "./CourseReview";
import CoursePriceBox from "./CoursePriceBox";
import CourseFeatures from "./CourseFeatures";
import CourseHeading from "./CourseHeading";
// import CarouselView from "../../../Reusable/CarouselView";
import "../../../styles.css";
// import CoursesContext from "../../../Context/courses-context";
import Spinner from "../../../UI/Spinner/Spinner";
// import { getCourse } from "./singleCourseDB";

// A custom hook that builds on useLocation to parse
// the query string for you.
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// let subcategoryId = null;
const SingleCourseDetials = (props) => {
  const [noOfLectures, setNoOfLectures] = useState(0);

  // check in local, whether the courseId is available or not
  // if it is not there, then
  // get sections, topics, materials, quiz data from server
  // and populate to store in indexedDB
  // if the courseId is in indexedDB, then get that data
  // and set section state

  let courseView = null;
  if (props.course === null) {
    courseView = <Spinner />;
  } else {
    courseView = (
      <>
        <CourseHeading course={props.course} />
        <div className="crs_sl">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8 col-lg-8 col-xl-9">
                <div className="demo_video">
                  <video controls>
                    {/* <source src="vedio/sample-mp4-file.mp4" type="video/mp4" /> */}
                    <source src={props.course.introVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <CourseOverview course={props.course} />
                <CourseContent
                  course={props.course}
                  noOfLectures={noOfLectures}
                  setNoOfLectures={(num) => setNoOfLectures(num)}
                  // courseId={params.courseId}
                  // subcategoryId={subcategoryId}
                />
                {/* <div className="course_review">
                  <CourseReview />
                  <StudentFeedbackList
                    subcategoryId={props.subcategoryId}
                    courseId={props.courseId}
                  />
                </div> */}
                {/* <StudentFeedbackForm /> */}
              </div>
              <div className="col-sm-4 col-lg-4 col-xl-3">
                <CoursePriceBox
                  course={props.course}
                  subcategoryId={props.subcategoryId}
                />
                <CourseFeatures
                  course={props.course}
                  noOfLectures={noOfLectures}
                />
              </div>
            </div>
          </div>
        </div>
        <section className="rltd_crs">{/* <CarouselView /> */}</section>
      </>
    );
  }

  return courseView;
};
export default SingleCourseDetials;
