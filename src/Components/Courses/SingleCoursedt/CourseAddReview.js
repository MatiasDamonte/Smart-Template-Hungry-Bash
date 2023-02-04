import React, { useState, useEffect } from "react";
import CourseReview from "./CourseReview";
import Rating from "../../../UI/Ratings/Rating";
import UserReview from "../../../UI/SingleUserReview/UserReview";
import { addReview } from "./singleCourseDB";

// import StudentFeedbackList from "./StudentFeedback";

const CourseAddReview = (props) => {
  const [reviewDet, setReviewDet] = useState({
    rating: -1,
    reviewTitle: "",
    reviewContent: "",
    uploadedDT: ""
  });
  // if false, no need to show the user review, only show the
  // form, else true, then show user review, no form,
  // then in useEffect, need to check if the review is already given
  const [review, setReview] = useState(false);

  useEffect(() => {
    // console.log("ongoingCourse", props.ongoingCourse);
    if (props.ongoingCourse !== null) {
      let reviewDet = props.ongoingCourse.reviewDet;
      if (reviewDet !== null && reviewDet !== undefined && reviewDet !== "") {
        setReview(reviewDet);
        console.log("rev", reviewDet);
      }
    }
  }, [props.ongoingCourse]);

  const onChangeHandler = (e) => {
    // console.log("addReview", e.target.value);
    setReviewDet((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("reviewDet", reviewDet);
    // set to db
    addReview(
      props.authCtx,
      props.ongoingCourse,
      props.course,
      reviewDet,
      (reviewDet) => {
        // console.log("addReview-callback", reviewDet);
        setReview({
          ...reviewDet
        });
      }
    );

    // reset the state
    setReviewDet((prev) => {
      return {
        rating: -1,
        reviewTitle: "",
        reviewContent: ""
      };
    });
  };

  let ui = null;
  if (review === false) {
  }
  return (
    <>
      <div class="user_review">
        <CourseReview />
        {/* <StudentFeedbackList /> */}
      </div>
      {props.ongoingCourse !== null && props.ongoingCourse.isCourseCompleted && (
        <>
          {review === false ? (
            <div class="review-box">
              <h3>Add Reviews & Rate</h3>
              <p>
                What is it like to Course?&emsp;&emsp;
                <Rating
                  onClickHandler={(rating) =>
                    setReviewDet((prev) => {
                      return {
                        ...prev,
                        rating: rating
                      };
                    })
                  }
                />
              </p>
              <form class="form-group" method="post" onSubmit={onSubmitHandler}>
                <label for="title" style={{ cursor: "pointer" }}>
                  Review Title
                </label>
                <br />
                <input
                  class="text_box"
                  type="text"
                  id="title"
                  name="reviewTitle"
                  value={reviewDet.reviewTitle}
                  onChange={onChangeHandler}
                />
                <br />
                <label for="content" style={{ cursor: "pointer" }}>
                  Review Content
                </label>
                <br />
                <textarea
                  class="text_box ht148"
                  type="text"
                  name="reviewContent"
                  value={reviewDet.reviewContent}
                  onChange={onChangeHandler}
                  id="content"
                ></textarea>
                <br />
                <button type="submit" class="review_btn">
                  Submit Review&ensp;&#8594;
                </button>
              </form>
            </div>
          ) : (
            <UserReview review={review} onChangeHandler={onChangeHandler} />
          )}
        </>
      )}
    </>
  );
};

export default CourseAddReview;
