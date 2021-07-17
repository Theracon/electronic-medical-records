import React from "react";
import { connect } from "react-redux";

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
    profileData: {
      name: "John",
      surname: "Doe",
    },
    filterOptions: {
      name: "",
      age: "",
      gender: "",
      bmi: { from: "", to: "" },
    },
    showFilterOptions: false,
    patientDataByGender: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Gender",
          backgroundColor: ["#B21F00", "#C9DE00"],
          hoverBackgroundColor: ["#501800", "#4B5000"],
          data: [65, 59],
        },
      ],
    },
    patientDataByAge: {
      labels: ["Neonates", "1-17 Years", "18-64 Years", "65+ Years"],
      datasets: [
        {
          label: "Age",
          backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
          hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
          data: [65, 59, 80, 81],
        },
      ],
    },
  };

  toggleFilterOptions = () => {
    this.setState((state) => ({
      showFilterOptions: !state.showFilterOptions,
    }));
  };

  componentDidMount() {
    this.props.onSwitchToHWUserMode();
    this.props.onGetPatients();
    this.setState({
      patients: this.props.allPatients,
    });
  }

  render() {
    const surname = localStorage.getItem("surname");
    const name = localStorage.getItem("name");
    const displayName = formatName(surname, name);

    return (
      <React.Fragment>
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
        <Charts
          patientDataByGender={this.state.patientDataByGender}
          patientDataByAge={this.state.patientDataByAge}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    patientsLoading: state.patients.loading,
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
