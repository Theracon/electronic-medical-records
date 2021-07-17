import React from "react";

import styles from "./Patients.module.css";
import Patient from "./patient/Patient";
import Spinner from "../UI/Spinner/Spinner";

const patients = (props) => {
  let patients = [];

  if (props.patients) {
    patients = props.patients.map((patient) => {
      return (
        <Patient
          key={patient.id}
          name={patient.name}
          surname={patient.surname}
          age={patient.age}
          gender={patient.gender}
          bmi={patient.bmi.toFixed(2)}
          height={patient.height}
          weight={patient.weight}
          image={patient.image}
        />
      );
    });
  }
  if (!props.patients) {
    return (
      <div className={styles.Patients}>
        <h3 className="display-6 lead" style={{ marginTop: "2rem" }}>
          All Patients
        </h3>
        <Spinner style={{ position: "absolute" }} />
      </div>
    );
  } else {
    return (
      <div className={styles.Patients}>
        <h3 className="display-6 lead">All Patients</h3>
        {patients}
      </div>
    );
  }
};

export default patients;
