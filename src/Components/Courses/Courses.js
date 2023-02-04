import React, { useState, useEffect } from "react";

import CoursesFilter from "./CoursesFilter";
import CourseCard from "../../Reusable/CourseCard";
import Spinner from "../../UI/Spinner/Spinner";
import { getCourses, getFilterOptions } from "./CoursesDB";
import ReactPaginate from "react-paginate";

const Courses = (props) => {
  const [courses, setCourses] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    getFilterOptions((filter) => {
      setFilterOptions(filter);
      // get subcategoryId to get the courses for that subcategory
      let subcatId = filter[0].subcategoryList[0].subCategoryId;
      // console.log(subcatId);
      getCourses((courses, fromCache) => {
        setCourses(courses);
      }, subcatId);
    });
  }, []);

  // window.addEventListener("beforeunload", function (e) {
  //   // alert("unload operation");
  //   e.preventDefault();
  //   e.returnValue = "";
  // });

  const getFilteredCourses = (
    cat,
    subcat,
    subcategoryId,
    price,
    language,
    rating
  ) => {
    // console.log("getFilteredCourses", subcategoryId);
    // optimize later - indexedDB
    getCourses((courses, fromCache) => {
      if (
        price !== undefined &&
        language !== undefined &&
        rating !== undefined
      ) {
        if (price === "free") {
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice === 0 &&
                c.lang === language &&
                c.rating >= rating
              );
            })
          );
        } else if (price === "paid") {
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice !== 0 &&
                c.lang === language &&
                c.rating >= rating
              );
            })
          );
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice >= parseInt(range[0]) &&
                c.publish.discountedPrice <= parseInt(range[1]) &&
                c.lang === language &&
                c.rating >= rating
              );
            })
          );
        } else {
          // greater than 2500
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice > parseInt(price) &&
                c.lang === language &&
                c.rating >= rating
              );
            })
          );
        }
      } else if (
        price !== undefined &&
        language !== undefined &&
        rating === undefined
      ) {
        if (price === "free") {
          setCourses(
            courses.filter((c) => {
              return c.publish.discountedPrice === 0 && c.lang === language;
            })
          );
        } else if (price === "paid") {
          setCourses(
            courses.filter((c) => {
              return c.publish.discountedPrice !== 0 && c.lang === language;
            })
          );
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice >= parseInt(range[0]) &&
                c.publish.discountedPrice <= parseInt(range[1]) &&
                c.lang === language
              );
            })
          );
        } else {
          // greater than 2500
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice > parseInt(price) &&
                c.lang === language
              );
            })
          );
        }
      } else if (
        price !== undefined &&
        language === undefined &&
        rating === undefined
      ) {
        if (price === "free") {
          setCourses(courses.filter((c) => c.publish.discountedPrice === 0));
        } else if (price === "paid") {
          setCourses(courses.filter((c) => c.publish.discountedPrice !== 0));
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          setCourses(
            courses.filter((c) => {
              return (
                c.publish.discountedPrice >= parseInt(range[0]) &&
                c.publish.discountedPrice <= parseInt(range[1])
              );
            })
          );
        } else {
          // greater than 2500
          setCourses(
            courses.filter((c) => c.publish.discountedPrice > parseInt(price))
          );
        }
      } else if (
        price === undefined &&
        language !== undefined &&
        rating !== undefined
      ) {
        // lang,rating
        setCourses(
          courses.filter((c) => {
            return c.lang === language && c.rating >= rating;
          })
        );
      } else if (
        price === undefined &&
        language === undefined &&
        rating !== undefined
      ) {
        // rating
        setCourses(
          courses.filter((c) => {
            return c.rating >= rating;
          })
        );
      } else if (
        price === undefined &&
        language !== undefined &&
        rating === undefined
      ) {
        // language
        setCourses(
          courses.filter((c) => {
            return c.lang === language;
          })
        );
      } else {
        // no price, lang, rating
        setCourses(courses);
      }
    }, subcategoryId);
  };

  const getLiveOnline = (courses) => {
    console.log(".....cou", courses);

    if (document.getElementById("liveonline").value === "live") {
      setCourses(
        courses.filter((c) => {
          return c.types === "Live";
        })
      );
    } else if (document.getElementById("liveonline").value === "online") {
      setCourses(
        courses.filter((c) => {
          return c.types === "Online";
        })
      );
    } else {
      setCourses(courses);
    }
  };

  let coursesLists = null;
  if (courses === null) {
    coursesLists = <Spinner />;
  } else if (courses.length === 0) {
    coursesLists = <h1>No courses!!!</h1>;
  } else {
    coursesLists = courses.map((course, i) => (
      <CourseCard course={course} key={i} {...props} />
    ));
  }

  return (
    <>
      {/* courses banner image */}
      <section
        className="navbar_sect"
        style={{ backgroundImage: "url(/images/bg4.jpg)" }}
      >
        <div className="courses_section">
          <div className="container-fluid">
            <div className="inner_container">
              <h1>COURSES</h1>
              <p>
                <a href="index.html">Home</a>&ensp;/&ensp;Courses
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sect3_courses">
        <div className="container-fluid p-0">
          <div className="row" style={{ margin: "0" }}>
            <CoursesFilter
              filter={filterOptions}
              getFilteredCourses={getFilteredCourses}
            />
            <div className="col-md-8 col-lg-9 col-xl-9 course-grid">
              <p className="row_head">
                <span className="noi">
                  85&ensp;<i>Results&emsp;</i>1,145&ensp;<i>Video Tutorials</i>
                </span>

                <select
                  id="liveonline"
                  className="liveOnline"
                  onChange={getLiveOnline()}
                >
                  <option value="all">All</option>
                  <option value="live">Live</option>
                  <option value="online">Online</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Courses"
                  style={{ width: "30%" }}
                />
                <button
                  className="form-control-feedback"
                  type="submit"
                  value="search"
                >
                  <i className="fa fa-search"></i>
                </button>
              </p>
              <div className="row">{coursesLists}</div>
              <div className="mbp_pagination">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#a"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      <span>
                        <i className="fas fa-arrow-left"></i>
                      </span>
                      &ensp;Prev
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#a">
                      1
                    </a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a className="page-link" href="#s">
                      2 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#9d">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#d">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#ds">
                      14
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#asd">
                      <span>
                        Next&ensp;<i className="fas fa-arrow-right"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Courses;
