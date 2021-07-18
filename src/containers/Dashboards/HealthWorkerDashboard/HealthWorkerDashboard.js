import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./HealthWorkerDashboard.module.css";
import * as authActionCreators from "../../../store/action-creators/authentication";
import * as userModeActionCreators from "../../../store/action-creators/userModes";
import * as patientsActionCreators from "../../../store/action-creators/patients";
import * as filterControlsActionCreators from "../../../store/action-creators/filterControls";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import FilterPatients from "../../../components/UI/FilterPatients/FilterPatients";
import Patients from "../../../components/Patients/Patients";
import Charts from "../../../components/UI/Charts/Charts";
import formatName from "../../../shared/utils/formatName";

class HWDashboard extends React.Component {
  state = {
    filterOptions: {
      age: "",
      gender: "",
      bmi: { from: "", to: "" },
    },

    searchForPatientName: "",

    patients: [],
  };

  componentWillMount() {
    this.setState({ patients: this.props.allPatients });
  }

  componentDidMount() {
    this.setState({
      patients: this.props.allPatients,
    });

    this.props.onSwitchToHWUserMode();
    this.props.onGetPatients();
  }

  onGetAllPatients = () => {
    this.props.onGetPatients();
    this.props.onHideFilterControls();
  };

  onGetPatientsByGender = (gender) => {
    this.props.onGetPatientsByGender(gender);
    this.props.onHideFilterControls();
  };

  onGetPatientsByAge = (ageFrom, ageTo) => {
    this.props.onGetPatientsByAge(ageFrom, ageTo);
    this.props.onHideFilterControls();
  };

  onGetPatientsByBMI = (bmiFrom, bmiTo) => {
    this.props.onGetPatientsByBMI(bmiFrom, bmiTo);
    this.props.onHideFilterControls();
  };

  onGetPatientsByName = (string) => {
    this.props.onGetPatientsByName(string);
  };

  onToggleFilterControls = () => {
    this.props.onToggleFilterControls();
  };

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;

    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
      this.props.onLogout();
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
        <Searchbar
          getPatientsByName={(string) => this.onGetPatientsByName(string)}
        />
        <FilterPatients
          showControls={this.props.showFilterControls}
          toggleControls={this.onToggleFilterControls}
          getAllPatients={this.onGetAllPatients}
          getPatientsByGender={(gender) => this.onGetPatientsByGender(gender)}
          getPatientsByAge={(ageFrom, ageTo) =>
            this.onGetPatientsByAge(ageFrom, ageTo)
          }
          getPatientsByBMI={(bmiFrom, bmiTo) =>
            this.onGetPatientsByBMI(bmiFrom, bmiTo)
          }
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
    showFilterControls: state.filterControls.showControls,
    patientsHeading: state.patients.patientsHeading,
    allPatients: state.patients.allPatients,
    malePatients: state.patients.malePatients,
    femalePatients: state.patients.femalePatients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToHWUserMode: () =>
      dispatch(userModeActionCreators.switchToHWUserMode()),

    onGetPatients: () => dispatch(patientsActionCreators.getPatients()),

    onGetPatientsByGender: (gender) =>
      dispatch(patientsActionCreators.getPatientsByGender(gender)),

    onGetPatientsByAge: (ageFrom, ageTo) => {
      dispatch(patientsActionCreators.getPatientsByAge(ageFrom, ageTo));
    },

    onGetPatientsByBMI: (bmiFrom, bmiTo) =>
      dispatch(patientsActionCreators.getPatientsByBMI(bmiFrom, bmiTo)),

    onToggleFilterControls: () =>
      dispatch(filterControlsActionCreators.toggleFilterControls()),

    onHideFilterControls: () =>
      dispatch(filterControlsActionCreators.hideFilterControls()),

    onGetPatientsByName: (string) =>
      dispatch(patientsActionCreators.getPatientsByName(string)),

    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HWDashboard);
