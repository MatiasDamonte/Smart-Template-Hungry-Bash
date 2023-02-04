import React from "react";

const PersonalDetails = () => {
  return (
    <div class="settings">
      <div class="list-header">
        <h4>Personal Details</h4>
      </div>
      <div class="personal-details">
        <form class="form" action="#" method="post">
          <div class="row m-0">
            <div class="col-sm-4 col-md-4 col-lg-3 p-0">
              <div class="upload-img">
                <input
                  type="file"
                  name="prfl_img"
                  id="img"
                  accept=".gif, .jpg, .png"
                />
                <label for="img" id="uploadButton">
                  <span>Browse</span>
                </label>
              </div>
            </div>

            <div class="col-sm-8 col-md-8 col-lg-9 p-0">
              <div class="wrap">
                <div class="col-lg-6">
                  <label for="fname">First Name *</label>
                  <input type="text" class="form-control" id="fname" />
                </div>
                <div class="col-lg-6">
                  <label for="lname">Last Name</label>
                  <input type="text" class="form-control" id="lname" />
                </div>
              </div>
              <div class="wrap">
                <div class="col-lg-6">
                  <label for="mno">Mobile No *</label>
                  <input type="text" class="form-control" id="mno" />
                </div>
                <div class="col-lg-6">
                  <label for="mail">Email *</label>
                  <input type="text" class="form-control" id="mail" />
                </div>
              </div>
            </div>
          </div>
          <div class="settings-btn">
            <button type="submit" class="btn">
              Save<i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
