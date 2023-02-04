import React from "react";

const MyOrder = () => {
  return (
    <div class="order">
      <div class="list-header">
        <h4>My Orders</h4>
        <ul class="list dropdown">
          <li class="dropdown-toggle" id="navbardrop" data-toggle="dropdown">
            <span>Sort By</span>
            <ul class="dropdown-menu">
              <li>
                <a class="list-item">Course Name</a>
              </li>
              <li>
                <a class="list-item">Category</a>
              </li>
              <li>
                <a class="list-item">Purchase Date</a>
              </li>
              <li>
                <a class="list-item">Total Amount</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="order-details">
        <table class="table table-bordered">
          <thead>
            <tr>
              <td>Course Name</td>
              <td>Cateogry</td>
              <td>Purchase Date</td>
              <td>Status</td>
              <td>Total</td>
              <td>Action</td>
            </tr>
          </thead>
          <tr>
            <td>
              Title of the Course Title of the Course Title of the Course Title
              of the Course
            </td>
            <td>Cateogry</td>
            <td>02/11/98</td>
            <td>Completed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>259
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
          <tr>
            <td>Title of the Course</td>
            <td>Cateogry</td>
            <td>26/06/99</td>
            <td>Failed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>79
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
          <tr>
            <td>
              Title of the Course Title of the Course Title of the Course Title
              of the Course
            </td>
            <td>Cateogry</td>
            <td>02/11/98</td>
            <td>Completed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>259
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
          <tr>
            <td>Title of the Course</td>
            <td>Cateogry</td>
            <td>26/06/99</td>
            <td>Failed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>79
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
          <tr>
            <td>
              Title of the Course Title of the Course Title of the Course Title
              of the Course
            </td>
            <td>Cateogry</td>
            <td>02/11/98</td>
            <td>Completed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>259
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
          <tr>
            <td>Title of the Course</td>
            <td>Cateogry</td>
            <td>26/06/99</td>
            <td>Failed</td>
            <td>
              <i class="fas fa-rupee-sign"></i>79
            </td>
            <td>
              <a href="#" class="bill">
                Print Receipt
              </a>
            </td>
          </tr>
        </table>
      </div>
      .<div class="end">No More Orders</div>
    </div>
  );
};

export default MyOrder;
