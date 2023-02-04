import React, { useContext, useEffect } from "react";
import AuthContext from "../../../Context/auth-context";
import CoursesContext from "../../../Context/courses-context";
import { removeBookmark } from "../../Courses/CoursesDB";

const CourseCard = (props) => {
  let course = props.course;
  let ctx = useContext(CoursesContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log("ctx course", ctx.course);
  }, []);

  const courseUpdate = (course) => {
    // console.log("coursecard", course, course.subcategoryId);
    ctx.setCourse(course);
    props.history.push(
      `/dashboard/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
    );
    // props.history.push("/");
  };

  const removeBookmarkItem = (course) => {
    let user = authCtx.user;
    let bookmark = user.bookmarks;
    let index = bookmark.findIndex((bm) => bm.id === course.id);
    bookmark.splice(index, 1);
    removeBookmark(user, course);
    authCtx.setUser({
      ...user,
      bookmarks: bookmark
    });
  };

  return (
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card">
        <div class="thumb">
          <img class="card-img" src="/images/s6.jpg" alt="Card" />
          <div class="fav" onClick={() => removeBookmarkItem(course)}>
            <span>
              <i
                class="far fa-minus-square"
                data-toggle="tooltip"
                data-placement="left"
                title="Remove"
              ></i>
            </span>
          </div>
          <div class="img_overlay">
            <div class="center">Preview Course</div>
          </div>
          {/* <a href="courses_single.html" class="stretched-link"></a> */}
          <div
            onClick={() => courseUpdate(props.course)}
            className="stretched-link"
          ></div>
        </div>
        <div class="card-body">
          <p>
            Author's Name
            <span>
              <a class="view_more" href="#">
                view more
              </a>
            </span>
          </p>
          <h3 class="card-title">{course.courseName}</h3>
          <p class="card-text">
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </p>
          <hr />
          <p class="card_footer">
            <a class="sdt" href="#courses_single.html">
              <i class="far fa-user"></i>121
            </a>
            <a class="price" href="#courses_single.html">
              <i class="fas fa-rupee-sign"></i>875.25
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
