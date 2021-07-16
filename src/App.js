import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./App.module.css";
import * as actionCreators from "./store/action-creators/authentication";
import Navbar from "./components/UI/Navigation/navbar";
import Homepage from "./components/Homepage/Homepage";
import Signup from "./containers/Authentication/Signup";
import Login from "./containers/Authentication/Login";
import Logout from "./containers/Authentication/Logout";
import HealthWorkerProfile from "./components/Profiles/Forms/HealthWorkerProfile";
import PatientProfile from "./components/Profiles/Forms/PatientProfile";
import HWDashboard from "./containers/Dashboards/HealthWorkerDashboard/HealthWorkerDashboard";
import PatientDashboard from "./containers/Dashboards/PatientDashboard/PatientDashboard";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Spinner from "./components/UI/Spinner/Spinner";

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    this.props.onAutoLogin(token, userId);
  }

  render() {
    let loadingUI = null;
    if (this.props.authLoading || this.props.profileLoading) {
      loadingUI = (
        <React.Fragment>
          <Backdrop />
          <Spinner />
        </React.Fragment>
      );
    }

    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/hw-create-profile" component={HealthWorkerProfile} />
        <Route path="/patient-create-profile" component={PatientProfile} />
        <Route path="/hw-dashboard" component={HWDashboard} />
        <Route path="/patient-dashboard" component={PatientDashboard} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    );

    return (
      <div className={styles.App}>
        <Navbar />
        {loadingUI}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authLoading: state.auth.loading,
    profileLoading: state.profile.loading,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: (token, userId) =>
      dispatch(actionCreators.authenticationSuccessful(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
