import React from "react";

const ChangePassword = () => {
  return (
    <div class="settings">
      <div class="list-header">
        <h4>Change Password</h4>
      </div>
      <div class="change-password">
        <form class="form" action="#" method="post">
          <div class="row">
            <div class="col-lg-6">
              <label for="oldpass">Old Password</label>
              <input type="password" class="form-control" id="oldpass" />

              <label for="newpass">New Password</label>
              <input type="password" class="form-control" id="newpass" />

              <label for="confirmpass">Confirm Password</label>
              <input type="password" class="form-control" id="confirmpass" />
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

export default ChangePassword;
