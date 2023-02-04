import React from "react";
import InstitutionCard from "./InstitutionCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CarouselView = () => {
  // if ($.isFunction("owlCarousel")) {
  const options = {
    loop: false,
    stagePadding: 15,
    margin: 10,
    nav: true,
    navText: [
      '<span className="uk-margin-small-right uk-icon"><i class="fas fa-chevron-left"></i></span>',
      '<span className="uk-margin-small-left uk-icon"><i class="fas fa-chevron-right"></i></span>'
    ],
    responsive: {
      0: {
        items: 1
      },
      640: {
        items: 2
      },
      960: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
  // }

  return (
    <>
      <div className="container-fluid sect2">
        <h3 className="heading">
          <b>Popular Institutes</b>
        </h3>
        <div className="uk-section">
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
            <InstitutionCard />
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};

export default CarouselView;
