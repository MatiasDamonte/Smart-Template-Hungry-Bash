import React, { useContext } from "react";
import InstitutionInfo from "./InstitutionInfo";
import CarouselView from "../../../Reusable/CarouselView";
import InstitutionContext from "../../../Context/institution-context";

const SingleInstitutionDetails = () => {
  const ctx = useContext(InstitutionContext);
  // console.log("ctx inst", ctx);

  return (
    <>
      <section
        className="navbar_sect"
        style={{ backgroundImage: `url(${ctx.institute.logoUrl})` }}
      >
        <div className="institution-single">
          <div className="container-fluid">
            <div className="inner_container">
              <h1 id="iname">{ctx.institute.instituteName}</h1>
              <p>
                <a href="index.html">Home</a>&ensp;/&ensp;Institution Profile
              </p>
            </div>
          </div>
        </div>
      </section>
      <InstitutionInfo ctx={ctx} />
      <section className="rltd_crs">{/* <CarouselView /> */}</section>
    </>
  );
};

export default SingleInstitutionDetails;
