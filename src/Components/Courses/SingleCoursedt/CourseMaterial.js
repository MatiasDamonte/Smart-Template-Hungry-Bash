import React from "react";

const CourseMaterial = (props) => {
  return (
    <>
    <div class="material">
      <div class="row">
        <img class="img-fluid" src="/images/pdf.png" alt="pdf"/>
        <p class="file-name">File Name</p>
        <a href="#ld" download>
          <i class="fas fa-file-download"></i>
        </a>
      </div>
      <div class="row">
        <img class="img-fluid" src="/images/word.png" alt="pdf"/>
        <p class="file-name">File Name</p>
        <a href="#ld" download>
          <i class="fas fa-file-download"></i>
        </a>
      </div>
    </div>
    </>
  );
}

export default CourseMaterial