import React from "react";

const CourseQ = () => {
  return (
    <>
      <div class="comment">
        <div class="raise">
          <label for="quest" class="head">
            Ask a Question&ensp;
            <i class="fas fa-question-circle"></i>
          </label>
          <textarea
            id="quest"
            rows="4"
            placeholder="Post your questions and wait for reply"
          ></textarea>
          <div class="button">
            <button type="submit" class="confirm">
              Post
            </button>
            <button type="submit" class="cancel">
              Cancel
            </button>
          </div>
        </div>
        <div class="post">
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary>
              <p class="quest">Some question raised by the user</p>
            </summary>
            <p class="admin-answer">contains the anwers posted by the admin</p>
          </details>
          <details>
            <summary>
              <p class="quest">Some question raised by the user</p>
            </summary>
            <p class="admin-answer">contains the anwers posted by the admin</p>
          </details>
        </div>
      </div>
    </>
  );
};

export default CourseQ;
