import { Route, Switch, Redirect } from "react-router";
import Signin from "./Components/Signin/Signin";
import StudentsSignup from "./Components/Signup/StudentsSignup";
import InstitutionSignup from "./Components/Signup/InstitutionSignup";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/User/UserDashboard";

import "./styles.css";
// import SingleCourseBought from "./Components/Courses/SingleCoursedt/SingleCourseBought";

const RedirectHome = () => {
  return <Redirect to="/dashboard/home" />;
};

const App = (props) => {
  return (
    <div className="App">
      {/* <SingleCourseBought /> */}
      <Switch>
        {/* <AuthContextProvider> - if i add this here, it affects the switch and only moves to login */}
        <Route path="/userdashboard" component={UserDashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/StudentsSignup" component={StudentsSignup} />
        <Route path="/InstitutionSignup" component={InstitutionSignup} />
        <Route path="/login" component={Signin} />
        <Route path="/" component={RedirectHome} />
        {/* </AuthContextProvider> */}
      </Switch>
    </div>
    // </AuthContextProvider>
  );
};

export default App;
