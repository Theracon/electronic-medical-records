import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./PatientDashboard.module.css";
import * as userModeActionCreators from "../../../store/action-creators/userModes";
import Image from "../../../components/UserPhoto/userPhoto";

class PatientDashboard extends React.Component {
  componentDidMount() {
    this.props.onSwitchToPatientUserMode();
  }

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;
    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        {redirectToLogin}
        <div className={styles.PatientDashboard}>
          <span className={styles.ChatButton}>
            <i className="fas fa-comment-alt"></i>
          </span>
          <div className={styles.ProfileData}>
            <div>
              <Image />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToPatientUserMode: () =>
      dispatch(userModeActionCreators.switchToPatientUserMode()),
  };
};

export default connect(null, mapDispatchToProps)(PatientDashboard);
