// import { useContext } from "react";
// import AuthContext from "../../Context/auth-context";
import { db, firebase } from "../../Services/firebase";

const getFilterOptions = (filter) => {
  db.collection("category")
    .doc("categories")
    .get()
    .then((doc) => {
      console.log("categories", doc.data().catDetails);
      filter(doc.data().catDetails);
    })
    .catch((e) => console.log(e));
};

const getCourses = (courses, subcatId) => {
  db.collection("subCategories")
    .doc(subcatId)
    .collection("courses")
    // .limit(9)
    .get()
    .then((data) => {
      let fromCache = data.metadata.fromCache;
      let list = [];
      data.forEach((doc) => {
        // console.log(doc.data());
        list.push(doc.data());
      });
      courses(list, fromCache);
    })
    .catch((e) => console.log(e));
};

const addBookmark = (user, course) => {
  console.log("user in add bookmark", user);
  db.collection("students")
    .doc(user.id)
    .update({
      bookmarks: firebase.firestore.FieldValue.arrayUnion(course)
    })
    .then(() => console.log("successfully added bookmark"));
};

const removeBookmark = (user, course) => {
  db.collection("students")
    .doc(user.id)
    .update({
      bookmarks: firebase.firestore.FieldValue.arrayRemove(course)
    })
    .then(() => console.log("successfully removed bookmark"));
};

const buyCourse = (user, courseId, subcategoryId, setOngoingCourse) => {
  // example data, change after
  subcategoryId = subcategoryId.trim();
  let courseRef = db
    .collection("subCategories")
    .doc(subcategoryId)
    .collection("courses")
    .doc(courseId);

  // to add 30days to a current date
  // var date = new Date(); // Now
  // date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
  // console.log(date);

  // to add months to current date
  // var newDate = new Date(date.setMonth(date.getMonth()+8));

  let data = {
    id: courseId,
    courseRef: courseRef,
    courseBought: true,
    courseValid: true,
    courseBoughtTimestamp: new Date().getTime(),
    // courseEndTimestamp: '',
    // https://stackoverflow.com/questions/44827066/add-30-days-to-a-current-date-js
    isCourseCompleted: false,
    currentSectionTopic: {
      sectionId: "",
      topic: {
        topicId: "",
        currentTime: 0
      }
    },
    completedPercent: 0,
    reviewDet: {
      rating: -1,
      review: ""
    },
    quizAnswers: [], // based on sections
    courseDuration: 60
  };
  let docIds = user.ongoingDocIds;
  // console.log("docIds", docIds);
  // initially now it is docIds, in future make an for loop on docIds
  // and each docIds, put that in a promise and resolve it
  db.collection("students")
    .doc(user.id)
    .collection("ongoingCourses")
    .doc(docIds[docIds.length - 1])
    .update({
      courses: firebase.firestore.FieldValue.arrayUnion(data)
    })
    .then(() => {
      setOngoingCourse(data);
      // let orders = user.orders;
      // db.collection("students").doc(user.id).update({
      //   orders: firebase.firestore.FieldValue.arrayUnion(data)
      // }).then().catch();
    })
    .catch((e) => {
      // if 1mb limit error, then create new doc here
      // add the above data to that document
      console.log(e);
    });
};

export { getCourses, getFilterOptions, addBookmark, removeBookmark, buyCourse };
// AWS DB Code:
// import AWS from "../../Services/AWS";
// const docClient = new AWS.DynamoDB.DocumentClient();

// const getCourses = async (courses) => {
// Global Secondary Indexes (GSI) allow you to query
// efficiently over any field (attribute) in your DynamoDB
// table. GSIs can treat any table attribute as a key,
// even attributes not present in all items.
// var params = {
//   TableName: "Courses"
// };
// let datas = null;
// await docClient.scan(params, function (err, data) {
//   if (!err) {
//     console.log("from dynamo", data);
//     datas = data;
//     courses(datas);
//     // return datas;
//   } else {
//     console.log(err);
//   }
// });
// console.log("docCLient", docClient);
// return datas;
// };
