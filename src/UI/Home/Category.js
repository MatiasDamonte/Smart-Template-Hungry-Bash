import React from "react";
import { Link } from "react-router-dom";
// import CategoryCard from "../../Reusable/CategoryCard";

const Category = (props) => {
  return (
    <section className="crs_sect" id="ourcourse">
      <div className="container-fluid">
        <h3>Via Categories Courses</h3>
        <p className="crs_title">
          Cum doctus civibus efficiantur in imperdiet deterruisset.
        </p>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t1.jpg" alt="IAS" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>IAS</b>
              </p>
              <p>Over 200+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t2.jpg" alt="IES" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>IES</b>
              </p>
              <p>Over 800+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t3.jpg" alt="GATE" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>GATE</b>
              </p>
              <p>Over 400+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t4.jpg" alt="CSIR" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>CSIR UGC NET</b>
              </p>
              <p>Over 150+ courses</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t5.jpg" alt="IIT-JEE" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>IIT-JEE</b>
              </p>
              <p>Over 300+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t6.jpg" alt="NEET" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>NEET</b>
              </p>
              <p>Over 50+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t7.jpg" alt="LAW" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>LAW</b>
              </p>
              <p>Over 200+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t9.jpg" alt="RRB" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>RRB</b>
              </p>
              <p>Over 300+ courses</p>
            </div>
          </div>
        </div>
        {/* <form action="courses.html" method="get"> */}
        <Link className="crs_btn" to={`${props.match.url}/courses`}>
          View All Courses
        </Link>
        {/* </form> */}
      </div>
    </section>
  );
};

export default Category;
