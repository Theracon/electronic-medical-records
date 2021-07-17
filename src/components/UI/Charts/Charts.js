import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

import styles from "./Charts.module.css";

class Charts extends React.Component {
  render() {
    return (
      <div className={styles.Charts}>
        <h3 className="display-6 lead">Patients By Gender (All)</h3>
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
        <br />
        <br />
        <br />

        <h3 className="lead display-6">Patients By Age (All)</h3>
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
