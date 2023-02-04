import React from "react";
import CarouselImages from "../../UI/Home/CarouselImages";
import Category from "../../UI/Home/Category";
import Registration from "../../UI/Home/Registration";
import TopCourses from "../../UI/Home/TopCourses";
// import Application from "../../UI/Home/Application";
import Testimonal from "../../UI/Home/Testimonal";

const Home = (props) => {
  return (
    <>
      <CarouselImages />
      <Category {...props} />
      <Registration />
      <TopCourses />
      {/* <Application /> */}
      <Testimonal />
    </>
  );
};
export default Home;
