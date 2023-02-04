import React, { useEffect, useState } from "react";
import { getReviews } from "./singleCourseDB";
import RatingStar from "./RatingStar";

const StudentFeedbackList = (props) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getReviews(
      (revs) => {
        console.log("reviews", revs);
        setReviews(revs);
      },
      props.subcategoryId,
      props.courseId
    );
  }, [props.subcategoryId, props.courseId]);

  let reviewsList = null;
  if (reviews === null) {
    reviewsList = <p>Loading...</p>;
  } else {
    reviewsList = reviews.map((review, i) => {
      return (
        <div className="review-card" key={i}>
          <div className="row">
            <div className="col-sm-1 col-md-1">
              <img className="img" src="/images/1.jpg" alt="" />
            </div>
            <div className="col-sm-11 col-md-11">
              <p className="r-name">
                {review.username}
                {/* {review.rating} */}
                <RatingStar rating={review.rating} />
              </p>
              <p className="r-date">
                {new Date(parseInt(review.uploadedDT)).toLocaleDateString()}
              </p>
              <p className="r-para">{review.review}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="review">
        <h3>Review</h3>
        {reviewsList}
        {/* <!--------------------/ /------------------------> */}
        <form action="courses.html" method="get">
          <button type="submit" className="review_btn">
            View More Review
          </button>
        </form>
      </div>
    </>
  );
};
export default StudentFeedbackList;
