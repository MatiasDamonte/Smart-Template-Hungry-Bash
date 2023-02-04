// import { get } from "jquery";
import React, { useEffect, useState } from "react";
import NavigationTabs from "../../../UI/NavigationTabs/NavigationTabs";
import SectionPanel from "../../../UI/SectionPanel/SectionPanel";
import VideoPlayer from "../../../UI/VideoPlayer/VideoPlayer";
import {
  getSectionsTopics,
  setCourseCompleted,
  setLatestSectionTopicDB
} from "./singleCourseDB";

const SingleCourseBought = (props) => {
  const [sectionTopics, setSectionTopics] = useState(null);
  const [topic, setTopic] = useState({
    id: "",
    video: "",
    videoLength: "",
    sectionName: "",
    topicName: "",
    topicDesc: "",
    captions: [],
    materials: []
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [ongoingCourse, setOngoingCourse] = useState(null);
  const [currentSectionTopic, setCurrentSectionTopic] = useState(null);
  const [latestSectionTopic, setLatestSectionTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);
  const [caption, setCaption] = useState(null);

  // when this component unmounts, this useEffect will run
  useEffect(() => {
    return () => {
      let lat = JSON.parse(localStorage.getItem("latestSectionTopic"));
      // console.log("latest", lat);

      let ongoingIndex = props.ongoingIndex;
      let ongoingCourse = props.authCtx.user.ongoingCourses[ongoingIndex];
      let curTime = ongoingCourse.currentSectionTopic.topic.currentTime;
      // console.log("currentTime", curTime);
      if (lat.topic.currentTime !== curTime) {
        setLatestSectionTopicDB(lat, props.authCtx, props.course);
      }
      // when this unmounts then clear that in localStorage.
      localStorage.removeItem("latestSectionTopic");
    };
  }, []);

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    return (ev.returnValue = "Are you sure you want to close?");
  });

  // window.addEventListener("beforeunload", (ev) => {
  //   ev.preventDefault();
  //   // reloading
  //   // if (sessionStorage.getItem("userId") !== null) {
  //   //   console.log("page reloaded!!!");
  //   // } else {
  //   return (ev.returnValue = "Are you sure you want to close?");
  //   // ev.returnValue = "Are";
  //   // }
  // });

  useEffect(() => {
    console.log("latestSectionTopic", latestSectionTopic, currentTime);
    if (latestSectionTopic !== null) {
      let data = {
        sectionId: latestSectionTopic.section.id,
        topic: {
          topicId: latestSectionTopic.topic.id,
          currentTime: currentTime
        }
      };
      localStorage.setItem("latestSectionTopic", JSON.stringify(data));
    }
  }, [latestSectionTopic, currentTime]);

  // window.addEventListener("beforeunload", function (e) {
  //   console.log("unload operation");
  // });

  useEffect(() => {
    // console.log(
    //   "courseBought",
    //   props.course,
    //   props.courseId,
    //   props.subcategoryId
    // );
    let sectionIds = props.course.sections;
    getSectionsTopics((sectionTopics) => {
      // console.log("courseBought-SectionTopics", sectionTopics);
      sectionTopics.sort((a, b) => {
        let nameA = a.section.sectionName.toLowerCase();
        let nameB = b.section.sectionName.toLowerCase();
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setSectionTopics(sectionTopics);
      let ongoingIndex = props.ongoingIndex;
      let ongoingCourse = props.authCtx.user.ongoingCourses[ongoingIndex];
      setOngoingCourse(ongoingCourse);
      if (ongoingCourse.currentSectionTopic.sectionId === "") {
        // if currentSection === '', setFirst topic
        console.log(
          "no current section id, that means this course bought now only"
        );
        let currentSecTop = {
          section: sectionTopics[0].section,
          topic: sectionTopics[0].topics[0]
        };
        // console.log("currentSecTOP", currentSecTop);
        // it will happen only once, when initially the course is bought
        setLatestSectionTopic(currentSecTop);
        setCurrentSectionTopic(currentSecTop);
        setTopic(sectionTopics[0].topics[0]);
        setCurrentTime(ongoingCourse.currentSectionTopic.topic.currentTime);
        // setVideoPlayTime(ongoingCourse.currentSectionTopic.topic.currentTime);
      } else {
        // get last played section & topic from db and set that topic & highlight that topic with some css
        let sectionTopIndex = sectionTopics.findIndex(
          (sec) =>
            sec.section.id === ongoingCourse.currentSectionTopic.sectionId
        );
        let topicIndex = sectionTopics[sectionTopIndex].topics.findIndex(
          (top) => top.id === ongoingCourse.currentSectionTopic.topic.topicId
        );
        let section = sectionTopics[sectionTopIndex].section;
        let topic = sectionTopics[sectionTopIndex].topics[topicIndex];

        let currentSecTop = {
          section: section,
          topic: topic
        };

        setLatestSectionTopic(currentSecTop);
        setCurrentSectionTopic(currentSecTop);
        setTopic(topic);
        setCurrentTime(ongoingCourse.currentSectionTopic.topic.currentTime);
        // setVideoPlayTime(ongoingCourse.currentSectionTopic.topic.currentTime);
        // console.log(
        //   "last played section & topic",
        //   sectionTop.section.id,
        //   topic.id
        // );
      }
      // sectionTopics
    }, sectionIds);
  }, []);

  const courseCompleted = () => {
    alert("course completed!!!");
    // set isCompleted to true in db & context
    // console.log("authCtx", props.authCtx, props.course, ongoingCourse);
    // show quiz if in last section also, handle that
    // optimization - if its already completed, no need to set again in db
    if (!ongoingCourse.isCourseCompleted) {
      console.log("setCourseCompleted");
      setCourseCompleted(props.authCtx, ongoingCourse);
      // setting ongoingCourse will help in optimization
      setOngoingCourse({
        ...ongoingCourse,
        isCourseCompleted: true
      });
    } else {
      console.log("setCourseCompleted - no db");
    }
  };

  const getNextTopic = () => {
    // console.log("sectionTopic", sectionTopics);
    let currentSectionIndex = sectionTopics.findIndex(
      (secTop) => secTop.section.id === currentSectionTopic.section.id
    );
    let section = sectionTopics[currentSectionIndex];
    let currentTopicIndex = section.topics.findIndex(
      (top) => top.id === currentSectionTopic.topic.id
    );
    if (
      currentSectionIndex < sectionTopics.length - 1 &&
      currentTopicIndex < section.topics.length - 1
    ) {
      // same section, topic index < lenth, play/set next index topic
      let currentSecTop = {
        section: section.section,
        topic: section.topics[currentTopicIndex + 1]
      };
      // set currentsectiontopic, only if it is a new video
      // if it is greater that currentSectionTopic index then only set state
      let latestSectionIndex = sectionTopics.findIndex(
        (secTop) => secTop.section.id === latestSectionTopic.section.id
      );
      if (latestSectionIndex === currentSectionIndex) {
        let latestTopicIndex = section.topics.findIndex(
          (top) => top.id === latestSectionTopic.topic.id
        );
        if (currentTopicIndex + 1 > latestTopicIndex) {
          setLatestSectionTopic(currentSecTop);
          setCurrentTime(0);
        }
      }
      // if it is less than that, dont set
      setCurrentSectionTopic(currentSecTop);
      setTopic(section.topics[currentTopicIndex + 1]);
      setCurrentTime(0);
    } else if (
      currentSectionIndex < sectionTopics.length - 1 &&
      currentTopicIndex === section.topics.length - 1
    ) {
      // end of the section, if lenth same, move to next section and play first topic
      // section = sectionTopics[currentSectionIndex];
      let currentSecTop = {
        section: section.section,
        topic: section.topics[currentTopicIndex]
      };
      console.log("next section first topic", section);
      if (section.section.quiz.length === 0) {
        // if no quiz, automatically play next
        section = sectionTopics[currentSectionIndex + 1];
        currentSecTop = {
          section: section.section,
          topic: section.topics[0]
        };
        ///
        let latestSectionIndex = sectionTopics.findIndex(
          (secTop) => secTop.section.id === latestSectionTopic.section.id
        );
        if (latestSectionIndex === currentSectionIndex) {
          let latestTopicIndex = section.topics.findIndex(
            (top) => top.id === latestSectionTopic.topic.id
          );
          if (currentTopicIndex + 1 > latestTopicIndex) {
            setLatestSectionTopic(currentSecTop);
          }
        }
        // console.log("currentSecTOP", currentSecTop);
        setCurrentSectionTopic(currentSecTop);
        setTopic(section.topics[0]);
        setCurrentTime(0);
      } else {
        setShowQuiz(currentSecTop);
        alert("complete the quiz , to move to next video");
      }
    } else if (currentSectionIndex === sectionTopics.length - 1) {
      console.log("last section----");
      if (currentTopicIndex === section.topics.length - 1) {
        if (section.section.quiz.length === 0) {
          console.log("section.section", section.section);
          // no quiz
          courseCompleted();
          // end of all sections or last section & last topic, topic index === lenth, course completed
        } else {
          // quiz is there
          let currentSecTop = {
            section: section.section,
            topic: section.topics[currentTopicIndex]
          };
          setShowQuiz(currentSecTop);
          alert("complete the quiz , to complete the course");
        }
      } else {
        // last section, before last topic
        let currentSecTop = {
          section: section.section,
          topic: section.topics[currentTopicIndex + 1]
        };
        console.log("curSecTop", currentSecTop);
        // if (section.section.quiz.length === 0) {
        // set currentsectiontopic, only if it is a new video
        // if it is greater that currentSectionTopic index then only set state
        let latestSectionIndex = sectionTopics.findIndex(
          (secTop) => secTop.section.id === latestSectionTopic.section.id
        );
        if (latestSectionIndex === currentSectionIndex) {
          let latestTopicIndex = section.topics.findIndex(
            (top) => top.id === latestSectionTopic.topic.id
          );
          if (currentTopicIndex + 1 > latestTopicIndex) {
            setLatestSectionTopic(currentSecTop);
            setCurrentTime(0);
          }
        }
        // if it is less than that, dont set
        setCurrentSectionTopic(currentSecTop);
        setTopic(section.topics[currentTopicIndex + 1]);
        setCurrentTime(0);
        // } else {
        //   setShowQuiz(currentSecTop);
        //   alert("complete the quiz , to complete the course");
        // }
      }
    }
    // console.log("currentTopicIndex", currentTopicIndex);
  };

  let UI = null;
  if (sectionTopics === null) {
    UI = <p>Loading!!!</p>;
  } else {
    UI = (
      <>
        <div className="col-sm-8 col-md-9 col-lg-9 col-xl-9">
          <VideoPlayer
            topic={topic}
            sections={sectionTopics}
            caption={caption}
            ongoingCourse={ongoingCourse}
            getNextTopic={getNextTopic}
            latestSecTop={latestSectionTopic}
            currentSecTop={currentSectionTopic}
            setCurrentTime={(time) => setCurrentTime(time)}
            // setVideoMetadata={(data) => setTopic(data)}
          />
          <NavigationTabs
            topic={topic}
            course={props.course}
            authCtx={props.authCtx}
            latestSectionTopic={latestSectionTopic}
            currentSectionTopic={currentSectionTopic}
            showQuiz={showQuiz}
            sectionTopics={sectionTopics}
            setLatestSectionTopic={(data) => {
              console.log("from navigation tab latestSection", data);
              setLatestSectionTopic(data);
            }}
            setCurrentSectionTopic={(data) => setCurrentSectionTopic(data)}
            setTopic={(data) => {
              console.log("setTOpic----", data);
              setTopic(data);
            }}
            setCurrentTime={(data) => setCurrentTime(data)}
            setCaption={(caption) => setCaption(caption)}
            ongoingCourse={ongoingCourse}
            courseCompleted={courseCompleted}
          />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3 col-xl-3 p0">
          <SectionPanel
            topic={topic}
            latestSectionTopic={latestSectionTopic}
            currentSectionTopic={currentSectionTopic}
            currentSec={currentTime}
            ongoingCourse={ongoingCourse}
            sections={sectionTopics}
            setTopic={(topic) => setTopic(topic)}
            setCurrentSectionTopic={(curr) => setCurrentSectionTopic(curr)}
            setCurrentTime={(time) => setCurrentTime(time)}
            setShowQuiz={(showquiz) => setShowQuiz(showquiz)}
          />
        </div>
      </>
    );
  }

  return (
    <section className="crs-bought" style={{ backgroundColor: "#fff" }}>
      <div className="cover-nav"></div>
      <div className="container-fluid ">
        <div className="row m-0 video">{UI}</div>
      </div>
    </section>
  );
};

export default SingleCourseBought;
