import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./HealthWorkerDashboard.module.css";
import * as userModeActionCreators from "../../../store/action-creators/userModes";
import * as patientsActionCreators from "../../../store/action-creators/patients";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import FilterPatients from "../../../components/UI/FilterPatients/FilterPatients";
import Patients from "../../../components/Patients/Patients";
import Charts from "../../../components/UI/Charts/Charts";
import formatName from "../../../shared/utils/formatName";

class HWDashboard extends React.Component {
  state = {
    showFilterOptions: false,

    filterOptions: {
      age: "",
      gender: "",
      bmi: { from: "", to: "" },
    },

    searchForPatientName: "",
  };

  toggleFilterOptions = () => {
    this.setState((state) => ({
      showFilterOptions: !state.showFilterOptions,
    }));
  };

  componentDidMount() {
    this.setState({
      patients: this.props.allPatients,
    });

    this.props.onSwitchToHWUserMode();
    this.props.onGetPatients();
  }

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;

    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
    }

    const surname = localStorage.getItem("surname");
    const name = localStorage.getItem("name");
    const displayName = formatName(surname, name);

    return (
      <React.Fragment>
        {redirectToLogin}
        <div className={styles.DisplayDiv}>
          <p className={styles.DisplayName}>
            Hello, <span>Dr. {displayName}.</span>
          </p>
        </div>
        <Searchbar />
        <FilterPatients
          show={this.state.showFilterOptions}
          toggle={this.toggleFilterOptions}
        />
        <Patients patients={this.props.allPatients} />
        <Charts />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.patients.loading,
    allPatients: state.patients.allPatients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToHWUserMode: () =>
      dispatch(userModeActionCreators.switchToHWUserMode()),
    onGetPatients: () => dispatch(patientsActionCreators.getPatients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HWDashboard);
