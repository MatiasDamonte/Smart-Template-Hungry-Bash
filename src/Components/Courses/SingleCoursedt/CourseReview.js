import React from "react";
const CourseReview = (props) => {
  return (
    <>
      <h3>Students Feedback</h3>
      <div className="row">
        {/* <!--------------------Progress Bar---------------------------------> */}
        <div className="col-sm-8 col-md-8 col-lg-9">
          <ul className="progressbar">
            <li>Stars 5</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: "90%" }}></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 4</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: "65%" }}></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 3</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: "10%" }}></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 2</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: "5%" }}></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 1</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: "4%" }}></div>
            </div>
          </ul>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-3">
          <p className="rating_value">4.5</p>
          <p className="rating">
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </p>
          <p className="ft">Course Rating</p>
        </div>
      </div>
    </>
  );
};
export default CourseReview;
