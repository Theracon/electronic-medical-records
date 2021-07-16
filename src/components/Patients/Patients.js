import React from "react";

import styles from "./Patients.module.css";
import Patient from "./patient/Patient";

const patients = (props) => {
  const patients = props.patients.map((patient) => {
    return (
      <Patient
        key={patient.name}
        name={patient.name}
        age={patient.age}
        gender={patient.gender}
        bmi={patient.bmi}
        height={patient.height}
        weight={patient.weight}
      />
    );
  });
  return <div className={styles.Patients}>{patients}</div>;
};

export default patients;
