import React from "react";
import { connect } from "react-redux";

import styles from "./HealthWorkerDashboard.module.css";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import FilterPatients from "../../../components/UI/FilterPatients/FilterPatients";
import Patients from "../../../components/Patients/Patients";
import Charts from "../../../components/UI/Charts/Charts";

class HWDashboard extends React.Component {
  state = {
    profileData: {
      name: "John",
      surname: "Doe",
    },
    patients: [
      {
        name: "Ade Jaiyeoluwa Jacob",
        age: 47,
        gender: "male",
        bmi: 22.6,
        height: 163,
        weight: 67,
      },
      {
        name: "Fola Aina Yakubu",
        age: 25,
        gender: "male",
        bmi: 25.4,
        height: 170,
        weight: 57,
      },
      {
        name: "Victor Smart Ade",
        age: 34,
        gender: "male",
        bmi: 21.7,
        height: 182,
        weight: 87,
      },
      {
        name: "Zainab Ishaq Abdullahi",
        age: 16,
        gender: "female",
        bmi: 23.1,
        height: 167,
        weight: 67,
      },
      {
        name: "Lilo Chukwuemeka Ebuka",
        age: 50,
        gender: "female",
        bmi: 25.2,
        height: 165,
        weight: 87,
      },
    ],
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

  render() {
    return (
      <React.Fragment>
        <div className={styles.Div}>
          <p>
            Welcome: Dr. {this.state.profileData.surname + ", "}
            {this.state.profileData.name.charAt(0)}.
          </p>
        </div>
        <Searchbar />
        <FilterPatients
          show={this.state.showFilterOptions}
          toggle={this.toggleFilterOptions}
        />
        <Patients patients={this.state.patients} />
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
  };
};

export default connect(mapStateToProps)(HWDashboard);
