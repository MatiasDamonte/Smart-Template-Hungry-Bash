import React, { useEffect, useState } from "react";
import $ from "jquery";
import { getSections } from "./singleCourseDB";

const CourseContent = (props) => {
  // $(document).ready(function () {
  //   var coll = document.getElementsByClassName("collapsible");
  //   var i;

  //   for (i = 0; i < coll.length; i++) {
  //     coll[i].addEventListener("click", function () {
  //       this.classList.toggle("active");
  //       var content = this.nextElementSibling;
  //       if (content.style.display === "block") {
  //         content.style.display = "none";
  //       } else {
  //         content.style.display = "block";
  //       }
  //       if (content.style.maxHeight) {
  //         content.style.maxHeight = null;
  //       } else {
  //         content.style.maxHeight = content.scrollHeight + "px";
  //       }
  //     });
  //   }
  // });

  const [sections, setSections] = useState(null);

  useEffect(() => {
    let sectionIds = props.course.sections;
    getSections((sections) => {
      // console.log("sections--", sections, sections.length);
      sections.sort((a, b) => {
        let nameA = a.sectionName.toLowerCase();
        let nameB = b.sectionName.toLowerCase();
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      let sum = 0;
      sections.forEach((sec) => {
        sum += sec.noOfTopics;
      });
      console.log("sorted--- from db", sections);
      props.setNoOfLectures(sum);
      setSections(sections);
    }, sectionIds);
  }, [props, props.course.sections]);

  let sec = null;
  if (sections === null) {
    sec = <p>Loading...</p>;
  } else {
    // let sum = 0;
    // sections.forEach((sec) => {
    //   sum += sec.noOfTopics;
    // });
    sec = (
      <>
        <div className="course_contents">
          <p className="title">
            Course Content
            <span className="vds_no">
              {props.noOfLectures}&nbsp;Lectures&emsp;Duration&nbsp;02:11:30
            </span>
          </p>
          {sections.map((section, i) => {
            return (
              <div className="panel" key={i}>
                <details>
                  {/* <!------------Panel----------------------------> */}
                  <summary className="fas panel-title collapsible">
                    {section.sectionName}
                  </summary>
                  {/* <!------------Panel Body-------------------> */}
                  {/* {console.log("topicNames", section.topicNames)} */}
                  <div className="panel-body">
                    {section.topicNames.map((topicName, i) => {
                      return (
                        <div className="vedio-details" key={i}>
                          <img
                            className="logo"
                            src="/images/p1.png"
                            alt="logo"
                          />
                          <span className="vedio-title">
                            {/* 1. Introduction to the Course */}
                            {topicName}
                          </span>
                          <span className="flt_rt">
                            Preview<span className="vedio-length">02:53</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return sec;
};
// export addSection ;
export default CourseContent;

//  {/* <!------------Panel----------------------------> */}
//  <div className="panel">
//  <button type="button" className="fas panel-title collapsible">
//    Brief
//  </button>
//  {/* <!------------Panel Body-------------------> */}
//  <div className="panel-body">
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        2. Your first design challenge{" "}
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">12:53</span>
//      </span>
//    </div>
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        3. How to solve the previous exercise{" "}
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">24:01</span>
//      </span>
//    </div>
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        4. Find out why smart objects are amazing{" "}
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">30:02</span>
//      </span>
//    </div>
//  </div>
// </div>
// {/* <!------------Panel----------------------------> */}
// <div className="panel">
//  <button type="button" className="fas panel-title collapsible">
//    The Conclusion
//  </button>
//  {/* <!------------Panel Body-------------------> */}
//  <div className="panel-body">
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        5. Title of the vedio given from institution side
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">02:53</span>
//      </span>
//    </div>
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        6. Title of the vedio given from institution side
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">02:53</span>
//      </span>
//    </div>
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        7. Title of the vedio given from institution side
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">02:53</span>
//      </span>
//    </div>
//    <div className="vedio-details">
//      <img className="logo" src="/images/p1.png" />
//      <span className="vedio-title">
//        8. Title of the vedio given from institution side
//      </span>
//      <span className="flt_rt">
//        Preview<span className="vedio-length">02:53</span>
//      </span>
//    </div>
//  </div>
//  {/* <!------------/ Panel Body /--------------------> */}
// </div>
// {/* <!------------/ Panel /---------------------------> */}
