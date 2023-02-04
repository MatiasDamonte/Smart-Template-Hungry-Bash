import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { addBookmark, removeBookmark } from "../Components/Courses/CoursesDB";
import AuthContext from "../Context/auth-context";
import CoursesContext from "../Context/courses-context";
// import { Link } from "react-router-dom";
const CourseCard = (props) => {
  const ctx = useContext(CoursesContext);
  const authCtx = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    console.log("updated bookmarks", authCtx.user);
    if (authCtx.user !== null) {
      let bookmarks = authCtx.user.bookmarks;
      let index = bookmarks.findIndex((course) => {
        return course.id === props.course.id;
      });
      if (index === -1) {
        setIsBookmarked(false);
      } else {
        setIsBookmarked(true);
      }
    }
  }, []);

  const courseUpdate = (course) => {
    // console.log("coursecard", course, course.subcategoryId);
    ctx.setCourse(course);
    props.history.push(
      `${props.match.url}/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
    );
  };

  const bookmarkCourse = (course) => {
    if (authCtx.isLoggedIn) {
      // logged in, add to db & ctx and show that in UI
      // update to ctx
      let user = authCtx.user;
      let bookmark = user.bookmarks;
      let index = bookmark.findIndex((bm) => bm.id === course.id);
      if (index === -1) {
        bookmark.push(course);
        setIsBookmarked(true);
        addBookmark(user, course);
      } else {
        bookmark.splice(index, 1);
        setIsBookmarked(false);
        removeBookmark(user, course);
      }
      authCtx.setUser({
        ...user,
        bookmarks: bookmark
      });
    } else {
      // not logged in, push to login page
      // and send this course too, so if he login
      // this should be added to db

      // let json = JSON.stringify(course);
      // console.log("json-not logged in", json);
      // props.history.push(`/login?bookmark=${json}`);
      // from login, it should moved to the
      // console.log('',props.history);
      props.history.push(`/login`);
      // for now, he can login and then he can bookmark
    }
  };

  return (
    <>
      {/* <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 filter"> */}
      {/* <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4"> */}
      <div className="item col-sm-6 col-md-6 col-lg-4 col-xl-4">
        <div className="card">
          <div className="thumb">
            <img
              className="card-img"
              src={props.course.coverImg}
              alt={props.course.CName}
            />
            <div className="fav">
              <span>
                <i
                  onClick={() => bookmarkCourse(props.course)}
                  className={
                    isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"
                  }
                ></i>
              </span>
            </div>
            <div className="img_overlay">
              <div className="days">
                <div className="pill">30 Days</div>
                <div className="pill">60 Days</div>
                <div className="pill">90 Days</div>
              </div>
              <div className="center">
                <span>Preview Course</span>
              </div>
            </div>
            {/* <a href="#c" className="stretched-link"></a> */}
            {/* <Link
              to={`${props.match.url}/courses/${props.course.CrsId}`}
              className="stretched-link"
            ></Link> */}
            <div
              onClick={() => courseUpdate(props.course)}
              className="stretched-link"
            ></div>
          </div>
          <div className="card-body">
            <p>
              Faculty: {props.course.faculties.join()}
              <span>
                <a className="view_more" href="#courses">
                  {props.course.category}
                </a>
              </span>
            </p>
            <h3 className="card-title">{props.course.courseName}</h3>
            <p className="card-text">
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </p>
            <hr />
            <p className="card_footer">
              <a className="sdt" href="#n">
                <i className="far fa-user"></i>
                {props.course.noOfStudents}
              </a>
              <a className="price" href="#d">
                <i className="fas fa-rupee-sign"></i>
                {props.course.publish.originalPrice === 0
                  ? "Free"
                  : props.course.publish.originalPrice}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(CourseCard);
