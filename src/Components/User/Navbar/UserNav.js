import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import AuthContext from "../../../Context/auth-context";
import "./UserNav.css";

const Overlay = (props) => {
  // const history = useHistory();
  const authCtx = useContext(AuthContext);

  return (
    <div className="overlay">
      <div className="header">
        <img className="img-fluid" src="/images/4.jpg" alt="userprofile" />
        <p>
          <span className="usern" id="username">
            {/* {props.userDetail.name} */}
          </span>
          <br />
          <small id="usermail">{/* {props.userDetail.email} */}</small>
        </p>
      </div>
      <ul className="list">
        <li className="list-item">
          <Link className="list-link" to="/userDashboard/myProfile">
            My Profile
          </Link>
          <i className="far fa-id-badge"></i>
        </li>
        <li className="list-item">
          <Link className="list-link" to="/userDashboard/mycourses">
            My Courses
          </Link>
          <i className="fas fa-tv"></i>
        </li>
        <li className="list-item">
          <Link className="list-link" to="/userDashboard/myorder">
            Purchase History
          </Link>
          <i className="fas fa-history"></i>
        </li>
        {/* <li className="list-item">
          <Link className="list-link" to="/userDashboard/myProfile">
            Help
          </Link>
          <i className="far fa-question-circle"></i>
        </li> */}
        <li className="list-item">
          <button
            type="button"
            className="list-link"
            style={{ background: "transparent" }}
            onClick={authCtx.logout}
          >
            Logout
          </button>
          <i className="fas fa-sign-out-alt"></i>
        </li>
      </ul>
    </div>
  );
};

const Navbar = (props) => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
          $(".fixed-top").css("background-color", "#fff");
          $("#navigation").css("box-shadow", "0px 0px 30px rgb(0 0 0 / 10%)");
          $(".navbar_img").css(
            "background-image",
            "url(/images/logo_black.png)"
          );
          $(".navbar-brand").css(
            "border-right",
            "1px solid rgba(0, 0, 0, 0.2)"
          );
          $(".nav-link").css("color", "#000");
          $("#usericon").css("color", "#000");
        } else {
          $(".fixed-top").css("background-color", "");
          $("#navigation").css("box-shadow", "");
          $(".navbar_img").css("background-image", "");
          $(".navbar-brand").css("border-right", "");
          $(".nav-link").css("color", "");
          $("#usericon").css("color", "");
        }
        if ($(window).scrollTop() > 100) {
          $(".nav-link").hover(
            function () {
              $(this).css("color", "#2441e7");
            },
            function () {
              $(this).css("color", "#000");
            }
          );
        } else {
          $(".nav-link").hover(
            function () {
              $(this).css("color", "");
            },
            function () {
              $(this).css("color", "");
            }
          );
        }
      });

      // Mobile Device
      // $("nav.navbar div.collapse ul.navbar-nav li.dropdown").hover(
      //   function () {
      //     $(this).find(".dropdown-menu").slideToggle(300);
      //   },
      //   function () {
      //     $(this).find(".dropdown-menu").slideToggle(100);
      //   }
      // );
    });
  }
  // const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isOverlay, setIsOverlay] = useState(false);

  // console.log(props.userDetails.name, "navbar");
  // let user = JSON.parse(localStorage.getItem("userDetail"));

  // useEffect(() => {
  //   // user.current = JSON.parse(localStorage.getItem("userDetail"));
  //   console.log("Navbar", props.userDetail);
  //   console.log("Navbar", user);
  // }, []);

  useEffect(() => {
    console.log("navbar", authCtx.isLoggedIn, authCtx.user);
    authCtx.setHistory(props.history);
    // to set the history and to be used in authContext logout
  }, []);

  const overlayHandler = () => {
    console.log("overlay");
    setIsOverlay((prevState) => {
      console.log("prev", prevState);
      console.log("prev-opp", !prevState);
      return !prevState;
    });
  };

  // const pushHandler = (path) => {
  //   history.push(path);
  // };

  return (
    <div className="user">
      <nav
        className="user navbar navbar-expand-md navbar-dark fixed-top"
        id="navigation"
      >
        <a className="navbar-brand" href="#l">
          <div className="navbar_img"></div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/home")}
                style={{ paddingLeft: "0px" }}
              >
                Home
              </div> */}
              <Link
                action="push"
                className="nav-link"
                to={`/dashboard/home`}
                style={{ paddingLeft: "0px" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              {/* <Link
                className="nav-link dropdown-toggle"
                id="navbardrop"
                data-toggle="dropdown"
              >
                Courses
              </Link> */}
              <a
                className="nav-link dropdown-toggle"
                href="#courses"
                id="navbardrop"
                data-toggle="dropdown"
              >
                Courses
              </a>
              {/* <!-- Dropdown Menu--> */}
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="courses.html">
                    FREE COURSES<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Course 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Course 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Course 3
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Course 4
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="courses">
                    IAS<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item1.1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item1.2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item1.3
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item1.4
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        View More
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="courses.html">
                    IES<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item2
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="courses.html">
                    NEET
                    <i
                      className="fas fa-chevron-right"
                      style={{ float: "right" }}
                    ></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item3
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item3
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="courses.html">
                    GATE
                    <i
                      className="fas fa-chevron-right"
                      style={{ textalign: "right" }}
                    ></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item4
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item4
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="courses.html">
                        Sub Item4
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  {/* <a
                    className="dropdown-item"
                    href={`${props.match.url}/courses`}
                    style={{ paddingLeft: "0px" }}
                  >
                    View All
                  </a> */}
                  {/* <div
                    className="dropdown-item"
                    onClick={() => pushHandler("/dashboard/courses")}
                    style={{ paddingLeft: "0px" }}
                  >
                    View All
                  </div> */}
                  <Link
                    action="push"
                    className="dropdown-item"
                    to={`/dashboard/courses`}
                    style={{ paddingLeft: "0px" }}
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                // id="navigationitem2"
                href="#institution"
                id="navbardrop"
                data-toggle="dropdown"
              >
                Institutes
              </a>
              {/* <!-- Dropdown Menu--> */}
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="institution.html">
                    IAS<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#institution.html">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#institution.html">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="institution.html">
                    IES<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="institution.html">
                        Sub Item2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="institution.html">
                        Sub Item2
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="institution.html">
                    NEET
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="institution.html">
                    GATE
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="institution.html">
                    RRB
                  </a>
                </li>
                <li>
                  {/* <a
                    className="dropdown-item"
                    href={`${props.match.url}/institution`}
                  >
                    View All
                  </a> */}
                  {/* <div
                    className="dropdown-item"
                    onClick={() => pushHandler("/dashboard/institution")}
                    style={{ paddingLeft: "0px" }}
                  >
                    View All
                  </div> */}
                  <Link
                    action="push"
                    className="dropdown-item"
                    to={`/dashboard/institution`}
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Dropdown --> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#exam"
                // id="navbardrop"
                data-toggle="dropdown"
              >
                Exams
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#I">
                    IAS<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#s">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#s">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#l">
                    IES<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#l">
                    NEET<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#l">
                    GATE<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#l">
                    RRB<i className="fas fa-chevron-right"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#l">
                        Sub Item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  {/* <div
                    className="dropdown-item"
                    onClick={() => pushHandler("/dashboard/exams")}
                    style={{ paddingLeft: "0px" }}
                  >
                    View All
                  </div> */}
                  <Link
                    action="push"
                    className="dropdown-item"
                    to="/dashboard/exams"
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/aboutus")}
                style={{ paddingLeft: "0px" }}
              >
                Aboutus
              </div> */}
              <Link
                action="push"
                className="nav-link"
                to={`/dashboard/aboutus`}
              >
                Aboutus
              </Link>
            </li>
            <li className="nav-item">
              {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/contactus")}
                style={{ paddingLeft: "0px" }}
              >
                Contact
              </div> */}
              <Link
                action="push"
                className="nav-link"
                to={`/dashboard/contactus`}
              >
                Contact
              </Link>
            </li>
            {authCtx.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link"
                    style={{ background: "transparent", border: "none" }}
                    onClick={authCtx.logout}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="View Cart !"
                    to="/userDashboard/mybookmarks"
                  >
                    <i className="fas fa-heart"></i>
                  </Link>
                </li>
                <li className="prfl_img">
                  <button
                    type="button"
                    className="btn"
                    onClick={overlayHandler}
                    // onClick={() => {
                    //   // take it after, just for testing
                    //   props.history.push("/userDashboard/myProfile");
                    //   console.log("overlay");
                    //   setIsOverlay((prevState) => !prevState);
                    // }}
                  >
                    <img
                      className="img-fluid"
                      src="/images/4.jpg"
                      alt="userprofile"
                    />
                  </button>
                  {isOverlay === true ? (
                    <Overlay
                      logout={props.logout}
                      userDetail={props.userDetail}
                    />
                  ) : null}
                </li>
              </>
            ) : (
              <li className="nav-item">
                <i className="far fa-user" id="usericon"></i>
                <Link action="push" className="nav-link" to={`/login`}>
                  Login&nbsp;/&nbsp;Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(Navbar);
