import React from "react";
import CourseCard from "../../Reusable/CourseCard";

const TopCourses = (props) => {
  return (
    <section className="course_sect">
      <div className="container-fluid">
        <h3>Browse Our Top Courses</h3>
        <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
        <div className="course_filter_tab">
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="filter-button">All</button>
            </li>
            <li className="list-inline-item">
              <button className="filter-button">IAS</button>
            </li>
            <li className="list-inline-item">
              <button className="filter-button">IES</button>
            </li>
            <li className="list-inline-item">
              <button className="filter-button">GATE</button>
            </li>
            <li className="list-inline-item">
              <button className="filter-button">NEET</button>
            </li>
            <li className="list-inline-item">
              <button className="filter-button">RRB</button>
            </li>
          </ul>
        </div>
        <div className="content row">{/* <CourseCard /> */}</div>
      </div>
    </section>
  );
};

export default TopCourses;
