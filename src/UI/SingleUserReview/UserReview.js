import React from "react";

const UserReview = (props) => {
  return (
    <div className="user-rev">
      <h4>Your Review</h4>
      <div className="row ">
        <p className="date">
          Updated on&ensp;<span>14/09/2022</span>
        </p>
        <p className="controls">
          <span className="edit">
            <i class="fas fa-pen"></i>
          </span>
          <span className="delete">
            <i class="far fa-trash-alt"></i>
          </span>
        </p>
      </div>
      <p className="review">
        {props.review.reviewTitle}&ensp;-&ensp;{props.review.reviewContent}
      </p>
    </div>
  );
};

export default UserReview;
