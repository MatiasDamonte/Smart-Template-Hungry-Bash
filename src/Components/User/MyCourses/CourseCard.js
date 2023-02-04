import React from "react";

const CourseCard = () => {
  return (
    <div class="add">
      <div class="row m-0">
        <div class="col-sm-4 col-md-3 p-0">
          <div class="thumb">
            <img class="img-fluid" src="/images/s12.jpg" />
            <div class="overlay">
              <form action="user-courseview.html" method="get">
                <button type="submit" class="btn">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-8 col-md-9">
          <h4>Category</h4>
          <p class="completed">
            <span class="percent">45</span>%&ensp;Completed
          </p>
          <p class="title">Title of the Course Goes Here</p>
          <p class="about">
            Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro
            detracto disputando reformidans at, ex vel suas eripuit. Vel alii
            zril maiorum ex, mea id sale eirmod epicurei. Sit te possit
            senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret
            per. Te qui doming doctus referrentur, usu debet tamquam et.
          </p>
          <div class="footer">
            <p>
              <i class="far fa-user"></i>
              <small class="value">154</small>
            </p>
            <p>
              <i class="far fa-comment-alt"></i>
              <small class="value">25</small>
            </p>
            <p>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <small class="value">(5)</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
