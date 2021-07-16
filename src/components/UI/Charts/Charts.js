import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

import styles from "./Charts.module.css";

class Charts extends React.Component {
  render() {
    return (
      <div className={styles.Charts}>
        <h3>Patients By Gender</h3>
        <Pie
          data={this.props.patientDataByGender}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />

        <br />
        <br />
        <br />

        <h3>Patients By Age</h3>
        <Doughnut
          data={this.props.patientDataByAge}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
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

export default Charts;
