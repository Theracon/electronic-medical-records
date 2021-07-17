import React from "react";
import { connect } from "react-redux";
import { Pie, Doughnut } from "react-chartjs-2";

import styles from "./Charts.module.css";

class Charts extends React.Component {
  patientDataByGender = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [
          +this.props.malePatients.length,
          +this.props.femalePatients.length,
        ],
      },
    ],
  };

  patientDataByAge = {
    labels: ["Neonates", "Children(1-17Y)", "Adults(18-64Y)", "Elderly(65+Y)"],
    datasets: [
      {
        label: "Age",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
        data: [
          +this.props.neonates.length,
          +this.props.children.length,
          +this.props.adults.length,
          +this.props.elderly.length,
        ],
      },
    ],
  };

  render() {
    return (
      <div className={styles.Charts}>
        <h3 className="display-6 lead">Patients By Gender (All)</h3>
        <Pie
          data={this.patientDataByGender}
          options={{
            title: {
              display: true,
              text: "Patients disaggregated by gender",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
        <div style={{ margin: "50px 0" }}></div>
        <h3 className="lead display-6">Patients By Age (All)</h3>
        <Doughnut
          data={this.patientDataByAge}
          options={{
            title: {
              display: true,
              text: "Patients disaggregated by age",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    malePatients: state.patients.malePatients,
    femalePatients: state.patients.femalePatients,
    neonates: state.patients.neonates,
    children: state.patients.children,
    adults: state.patients.adults,
    elderly: state.patients.elderly,
  };
};

export default connect(mapStateToProps)(Charts);
