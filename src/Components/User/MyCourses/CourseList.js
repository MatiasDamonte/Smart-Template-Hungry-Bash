import React from "react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  return (
    <div class="course-list">
      <div class="list-header">
        <h4>Ongoing</h4>
        <ul class="list dropdown">
          <li class="dropdown-toggle" id="navbardrop" data-toggle="dropdown">
            <span>Sort By</span>
            <ul class="dropdown-menu">
              <li>
                <a class="list-item">Recent</a>
              </li>
              <li>
                <a class="list-item">Latest</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="courses">
        <CourseCard />
      </div>
      <div class="end">No More Courses</div>
    </div>
  );
};

export default CourseList;
