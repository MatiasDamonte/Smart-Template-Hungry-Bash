import React from "react";
import CourseCard from "./CourseCard";

const MyBookmarks = (props) => {
  let bookmarks = props.bookmarks;
  let bookmarkList = null;
  if (bookmarks.length === 0) {
    bookmarkList = <p>No Bookmarks!!!</p>;
  } else if (bookmarks.length > 0) {
    bookmarkList = bookmarks.map((bm, i) => {
      return <CourseCard course={bm} key={i} {...props} />;
    });
  } else {
    console.log("bookmarks else", props.bookmarks);
  }
  return (
    <div class="marked">
      <div class="list-header">
        <h4>Browse Your Favourites</h4>
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

      <div class="row p20">{bookmarkList}</div>

      <div class="end">No More Courses</div>
    </div>
  );
};

export default MyBookmarks;
